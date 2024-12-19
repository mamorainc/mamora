import { Router } from "express";
import prisma from "../db";
import { Keypair, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.status(200).json({
    message: "Success",
  });
});

userRouter.post("/signin", async (req, res) => {
  const body = req.body;

  var userData: {
    id: string;
    email: string;
    public_key: string;
    private_key?: string;
    created_at: Date;
    updated_at: Date;
  } | null = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!userData) {
    const newKeyPair = Keypair.generate();
    const pubkey = new PublicKey(newKeyPair.publicKey);
    const privateKey = bs58.encode(newKeyPair.secretKey);


    userData = await prisma.user.create({
      data: {
        email: body.email,
        private_key: privateKey,
        public_key: pubkey.toString(),
      },
      select: {
        email: true,
        id: true,
        public_key: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  res.status(200).json({
    message: "Success",
    data: userData,
  });
});

export default userRouter;
