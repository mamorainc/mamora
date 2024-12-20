import { genSalt, hash } from 'bcrypt';
import prisma from '../db';
import { Keypair, PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';
import { Request } from 'express';
import jwt from 'jsonwebtoken';



type UserData = {
  id: string;
  email: string;
  public_key: string;
  private_key?: string;
  created_at: Date;
  updated_at: Date;
  is_verified: boolean;
} | null;

const signUpService = async (
  req: Request
): Promise<{ status: number; message: string; data: any }> => {
  const { username, email, password } = req.body;

  let userData: UserData = await prisma.user.findFirst({
    where: { OR: [{ email: email }, { username: username }] },
  });

  if (userData) {
    return { status: 411, message: 'Error: User is already exist', data: [] };
  }

  const newKeyPair = Keypair.generate();
  const pubkey = new PublicKey(newKeyPair.publicKey);
  const privateKey = bs58.encode(newKeyPair.secretKey);

  const hashPassword = await hash(privateKey,10);

  userData = await prisma.user.create({
    data: {
      username: username,
      password:hashPassword,
      email: email,
      private_key: privateKey,
      public_key: pubkey.toString(),
    },
    select: {
      id: true,
      username: true,
      email: true,
      public_key: true,
      created_at: true,
      updated_at: true,
      is_verified: true,
    },
  });

  const secreateKey = process.env.JWT_SECRET;
  const data = { id: userData.id, email: userData.email };

  if (!secreateKey) {
    return {
      data: [],
      message: 'Security token is required',
      status: 401,
    };
  }

  const token = jwt.sign(data, secreateKey);

  return {
    status: 200,
    message: 'Successfull User Created',
    data: {
      token: token,
      userData: userData,
    },
  };
};

export { signUpService };
