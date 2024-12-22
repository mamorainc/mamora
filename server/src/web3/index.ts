import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
  VersionedTransaction,
} from '@solana/web3.js';
import bs58 from 'bs58';

// import { Wallet } from '@project-serum/anchor';
import axios from 'axios';

enum Network {
  DEV,
  MAIN,
}
enum Status {
  Success,
  Failure,
}

const createResponse = (status: Status, data: any = {}, error?: string) => ({
  status,
  error,
  data,
});

const getConnection = (network: Network): Connection => {
  const url =
    network === Network.MAIN
      ? clusterApiUrl('mainnet-beta')
      : clusterApiUrl('devnet');
  return new Connection(url, 'confirmed');
};



const getBalance = async (
  network: Network,
  pk: string
): Promise<{ status: Status; error?: string; data: { balance?: number } }> => {
  try {
    if (!network) {
      return createResponse(Status.Failure, {}, 'Network is not defined');
    }

    if (!PublicKey.isOnCurve(pk)) {
      return createResponse(Status.Failure, {}, 'Invalid public key format.');
    }

    const connection = getConnection(network);
    const balance = await connection.getBalance(new PublicKey(pk));
    return createResponse(Status.Success, {
      balance: balance / LAMPORTS_PER_SOL,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    return createResponse(Status.Failure, {}, errorMsg);
  }
};

const sendSol = async (
  network: Network,
  fromSecretKey: string,
  to: string,
  amount: string
): Promise<{ status: Status; error?: string; data: { txHash?: string } }> => {
  try {
    if (!network) {
      return createResponse(Status.Failure, {}, 'Network is not defined');
    }

    const userKey = Keypair.fromSecretKey(bs58.decode(fromSecretKey));
    const connection = getConnection(network);
    const amountLamports = Number(amount) * LAMPORTS_PER_SOL;

    const balance = await connection.getBalance(userKey.publicKey);
    const feeEstimate = 5000; // 0.000005 SOL fee buffer

    // const feeEstimate = await connection.getFeeForMessage(
    //   new Transaction()
    //     .add(
    //       SystemProgram.transfer({
    //         fromPubkey: userKey.publicKey,
    //         toPubkey: new PublicKey(to),
    //         lamports: amountLamports,
    //       })
    //     )
    //     .compileMessage()
    // );

    if (amountLamports + feeEstimate < balance) {
      return createResponse(Status.Failure, {}, 'Insufficient balance.');
    }

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: userKey.publicKey,
        toPubkey: new PublicKey(to),
        lamports: amountLamports,
      })
    );

    const txSignature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [userKey]
    );
    return createResponse(Status.Success, { txHash: txSignature });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    return createResponse(Status.Failure, {}, errorMsg);
  }
};

const swapToken = async (
  network: Network,
  fromSecretKey: string,
  amount: string,
  fromTokenAddr: string,
  toTokenAddr: string,
  slippageBps = 50
): Promise<{ status: Status; error?: string; data: { txHash?: string } }> => {
  try {
    if (!network) {
      return createResponse(Status.Failure, {}, 'Network is not defined');
    }

    const wallet = Keypair.fromSecretKey(bs58.decode(fromSecretKey));
    const connection = getConnection(network);

    const quoteResponse = await axios.get('https://quote-api.jup.ag/v6/quote', {
      params: {
        inputMint: fromTokenAddr,
        outputMint: toTokenAddr,
        amount,
        slippageBps,
      },
    });

    const quoteData = quoteResponse.data;
    if (!quoteData) {
      return createResponse(Status.Failure, {}, 'Failed to fetch quote data.');
    }

    const { swapTransaction } = await axios
      .post('https://quote-api.jup.ag/v6/swap', {
        quoteResponse: quoteData,
        userPublicKey: wallet.publicKey.toString(),
        wrapAndUnwrapSol: true,
      })
      .then((res) => res.data);

    if (!swapTransaction) {
      return createResponse(
        Status.Failure,
        {},
        'Failed to create swap transaction.'
      );
    }

    const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
    let transaction = VersionedTransaction.deserialize(swapTransactionBuf);

    const latestBlockhash = await connection.getLatestBlockhash();
    transaction.message.recentBlockhash = latestBlockhash.blockhash;
    transaction.sign([wallet]);

    const txid = await connection.sendRawTransaction(transaction.serialize(), {
      skipPreflight: true,
      maxRetries: 2,
    });
    await connection.confirmTransaction({
      blockhash: latestBlockhash.blockhash,
      lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      signature: txid,
    });

    return createResponse(Status.Success, { txHash: txid });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    return createResponse(Status.Failure, {}, errorMsg);
  }
};

export { getBalance, sendSol, swapToken };
