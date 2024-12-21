import { Router } from 'express';
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

const actionRouter = Router();

actionRouter.post('/send', async (req, res) => {
  const body = req.body;

  const userData = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!userData) {
    res.status(404).json({
      status: 404,
      message: 'User not found',
    });
    return;
  }

  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const pk = userData?.private_key;

  const amountLamports = Number(body.amount) * LAMPORTS_PER_SOL;

  const balance = await getBalance(userData?.public_key);
  const transactionFee = 5000; // 0.000005 SOL fee buffer

  if (amountLamports > balance + transactionFee) {
    res.status(411).json({
      status: 411,
      message: `Insufficient balance.`,
    });
    return;
  }

  const userKey = Keypair.fromSecretKey(bs58.decode(userData.private_key));

  // const amountToSend = amountLamports - transactionFee;

  let transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: new PublicKey(userData.public_key),
      toPubkey: new PublicKey(body.address),
      lamports: amountLamports,
    })
  );

  const txSignature = await sendAndConfirmTransaction(connection, transaction, [
    userKey,
  ]);

  res.status(200).json({
    status: 200,
    message: `Transaction successful! View it on Solana Explorer: https://explorer.solana.com/tx/${txSignature}?cluster=devnet`,
  });
});

actionRouter.get('/balance', async (req, res) => {
  const { address } = req.body;

  const balance = await getBalance(address);

  res.status(200).json({
    status: 200,
    message: `Balance of ${address} is ${balance}`,
  });
});

const getBalance = async (pk: String) => {
  const connect = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const balance = await connect.getBalance(new PublicKey(pk));
  return balance;
};

export default actionRouter;
