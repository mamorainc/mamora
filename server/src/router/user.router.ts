import { Router } from 'express';
import prisma from '../db';
import { Keypair, PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';

const userRouter = Router();

userRouter.get('/', (req, res) => {
  res.status(200).json({
    message: 'Success',
  });
});

userRouter.post('/signup',async (req, res) => {

  const {username,email,password} = req.body;

  let userDate = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: email,
        },
        {
          username: username,
        }
      ]
    }
  })


  if(userDate){
    res.status(411).send({
      status:411,
      message:"User is already there"
    })
  }

  // userData = await prisma.user.create({
  //   data: {
  //     username: username,
  //     email: email,
  //     private_key: privateKey,
  //     public_key: pubkey.toString(),
  //   },
  //   select: {
  //     username: true,
  //     email: true,
  //     id: true,
  //     public_key: true,
  //     created_at: true,
  //     updated_at: true,
  //   },
  // });

})

userRouter.post('/signin', async (req, res) => {
  const { email, username } = req.body;

  var userData: {
    id: string;
    email: string;
    public_key: string;
    private_key?: string;
    created_at: Date;
    updated_at: Date;
  } | null = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!userData) {
    const newKeyPair = Keypair.generate();
    const pubkey = new PublicKey(newKeyPair.publicKey);
    const privateKey = bs58.encode(newKeyPair.secretKey);


  }

  res.status(200).json({
    message: 'Success',
    data: userData,
  });
});

export default userRouter;
