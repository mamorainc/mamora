import prisma from '../db';
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';

import bs58 from 'bs58';
import { Request, Response } from 'express';
import { connection } from '../utils';

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

// TODO: by name
const sendSol = async (req: Request): Promise<ServiceResponse> => {
  const { amount, address } = req.body;

  const userData = await prisma.user.findUnique({
    where: {
      id: req.userId,
    },
  });

  if (!userData) {
    return createResponse(404, 'User not found');
  }

  const amountLamports = Number(amount) * LAMPORTS_PER_SOL;
  const balance = await getBalance(userData?.public_key);
  const transactionFee = 5000; // 0.000005 SOL fee buffer

  if (amountLamports > balance + transactionFee) {
    return createResponse(411, 'Insufficient balance.');
  }

  const userKey = Keypair.fromSecretKey(bs58.decode(userData.private_key));

  let transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: new PublicKey(userData.public_key),
      toPubkey: new PublicKey(address),
      lamports: amountLamports,
    })
  );

  const txSignature = await sendAndConfirmTransaction(connection, transaction, [
    userKey,
  ]);

  return createResponse(
    200,
    `Transaction successful! View it on Solana Explorer: https://explorer.solana.com/tx/${txSignature}?cluster=devnet`
  );
};

const userBalance = async (req: Request): Promise<ServiceResponse> => {
  const { address } = req.body;
  const balance = await getBalance(address);
  return createResponse(200, `Balance of ${address} is ${balance}`);
};

const swapService = async (req: Request): Promise<ServiceResponse> => {

  const { address,amount, } = req.body;

  const balance = await getBalance(address);
  return createResponse(200, `Balance of ${address} is ${balance}`);
};

const getBalance = async (pk: String) => {
  const balance = await connection.getBalance(new PublicKey(pk));
  return balance;
};

export { sendSol, userBalance, swapService };
