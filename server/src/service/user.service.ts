import { Keypair, PublicKey } from '@solana/web3.js';
import { compare, hash } from 'bcrypt';
import bs58 from 'bs58';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../db';
import Moralis from 'moralis';
// import { createResponse, ServiceResponse } from './call.service';

const SOL_TOKEN_ADDRESS = 'So11111111111111111111111111111111111111112';
const DEFAULT_CHAIN = 'devnet';

type ServiceResponse = {
  status: number;
  message: string;
  data: any;
};

const createResponse = (
  status: number,
  message: string,
  data: any = []
): ServiceResponse => ({ status, message, data });

const generateToken = (payload: object): string => {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    throw new Error('Security token is required');
  }
  return jwt.sign(payload, secretKey);
};

const signUpService = async (req: Request): Promise<ServiceResponse> => {
  const { username, email, password } = req.body;

  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });

  if (existingUser) {
    return createResponse(409, 'Error: User already exists');
  }

  const newKeyPair = Keypair.generate();
  const publicKey = new PublicKey(newKeyPair.publicKey);
  const privateKey = bs58.encode(newKeyPair.secretKey);

  const hashedPassword = await hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      private_key: privateKey,
      public_key: publicKey.toString(),
    },
    select: {
      id: true,
      username: true,
      email: true,
      is_verified: true,
      public_key: true,
      created_at: true,
      updated_at: true,
    },
  });

  const token = generateToken({ id: user.id, email: user.email });

  return createResponse(201, 'User created successfully', { token, user });
};

const signInService = async (req: Request): Promise<ServiceResponse> => {
  const { email, password } = req.body;
  const user = await prisma.user.findFirst({
    where: { email },
  });
  if (!user) {
    return createResponse(404, 'Error: User not found');
  }
  const isValidPassword = await compare(password, user.password);
  if (!isValidPassword) {
    return createResponse(401, 'Error: Invalid password');
  }
  const token = generateToken({ id: user.id, email: user.email });
  const { password: _, private_key, ...userWithoutPassword } = user;
  return createResponse(200, 'User signed in successfully', {
    token,
    user: userWithoutPassword,
  });
};

const getUserDetails = async (req: Request): Promise<ServiceResponse> => {
  const id = req.userId;

  const user = await prisma.user.findFirst({
    where: { id },
  });
  if (!user) {
    return createResponse(404, 'Error: User not found');
  }
  const { password: _, private_key, ...userData } = user;
  return createResponse(200, 'User Data', {
    user: userData,
  });
};

// const getWalletData = async (
//   req: Request & { query: { wallet?: string; chain?: string } }
// ): Promise<ServiceResponse> => {
//   const wallet = req.query.wallet;
//   const chain = req.query.chain || 'devnet';

//   try {
//     if (wallet) {
//       if (!PublicKey.isOnCurve(wallet)) {
//         return createResponse(411, 'Error: Invalid public key format.');
//       }

//       const response = await Moralis.SolApi.account.getPortfolio({
//         network: chain.toString(),
//         address: wallet,
//       });

//       const priceData = await Moralis.SolApi.token.getTokenPrice({
//         network: 'mainnet',
//         address: 'So11111111111111111111111111111111111111112',
//       });

//       const usdPrice = priceData?.raw.usdPrice || 0;

//       const data = {
//         ...response.raw,
//         usdPrice: usdPrice,
//       };

//       return createResponse(200, 'User Wallet Data', data);
//     } else {
//       const user = await prisma.user.findFirst({
//         where: { id: req.userId },
//       });
//       if (!user) {
//         return createResponse(404, 'Error: User not found');
//       }

//       const priceData = await Moralis.SolApi.token.getTokenPrice({
//         network: 'mainnet',
//         address: 'So11111111111111111111111111111111111111112',
//       });

//       const usdPrice = priceData?.raw.usdPrice || 0;

//       const response = await Moralis.SolApi.account.getPortfolio({
//         network: chain.toString(),
//         address: user.public_key,
//       });

//       const data = {
//         ...response.raw,
//         usdPrice: usdPrice,
//       };

//       return createResponse(200, 'User Wallet Data', data);
//     }
//   } catch (error) {
//     console.log(error);

//     return createResponse(
//       400,
//       'Error: network must be one of the following values: mainnet'
//     );
//   }
// };

const fetchUsdPrice = async (): Promise<number> => {
  try {
    const priceData = await Moralis.SolApi.token.getTokenPrice({
      network: 'mainnet',
      address: SOL_TOKEN_ADDRESS,
    });
    return priceData?.raw.usdPrice || 0;
  } catch (error) {
    console.error('Error fetching SOL token price:', error);
    return 0;
  }
};

const getWalletPortfolio = async (address: string, network: string) => {
  try {
    return await Moralis.SolApi.account.getPortfolio({ network, address });
  } catch (error) {
    console.error(`Error fetching portfolio for address ${address}:`, error);
    throw new Error('Failed to fetch portfolio data.');
  }
};

const getWalletData = async (
  req: Request & { query: { wallet?: string; chain?: string } }
): Promise<ServiceResponse> => {
  const { wallet, chain = DEFAULT_CHAIN } = req.query;

  try {
    const address = wallet
      ? wallet
      : await (async () => {
          const user = await prisma.user.findFirst({
            where: { id: req.userId },
          });
          if (!user) throw new Error('User not found');
          return user.public_key;
        })();

    if (!PublicKey.isOnCurve(address)) {
      return createResponse(411, 'Error: Invalid public key format.');
    }

    const [portfolioResponse, usdPrice] = await Promise.all([
      getWalletPortfolio(address, chain),
      fetchUsdPrice(),
    ]);

    const data = {
      ...portfolioResponse.raw,
      usdPrice,
    };

    return createResponse(200, 'User Wallet Data', data);
  } catch (error: unknown) {
    // console.error('Error in getWalletData:', error.message || error);
    return createResponse(
      400,
     'An error occurred while fetching wallet data.'
    );
  }
};

export { getUserDetails, signInService, signUpService, getWalletData };
