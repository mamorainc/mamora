import { compare, genSalt, hash } from 'bcrypt';
import prisma from '../db';
import { Keypair, PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
// import { createResponse, ServiceResponse } from './call.service';

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

export { signUpService, signInService, getUserDetails };
