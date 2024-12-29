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
import Moralis from 'moralis';
import { connection } from '../utils';
import { getAccount, NATIVE_MINT } from '@solana/spl-token';

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
    if (network != Network.DEV && network != Network.MAIN) {
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
    if (network != Network.DEV && network != Network.MAIN) {
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

    if (amountLamports + feeEstimate > balance) {
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
  lamportMultiplier: number,
  slippageBps = 50
): Promise<{ status: Status; error?: string; data: { txHash?: string } }> => {
  try {
    if (network != Network.DEV && network != Network.MAIN) {
      return createResponse(Status.Failure, {}, 'Network is not defined');
    }

    const wallet = Keypair.fromSecretKey(bs58.decode(fromSecretKey));
    const connection = getConnection(network);

    const lamportAmount = Number(amount) * lamportMultiplier;

    const tokenBalance = await getTokenBalance(
      wallet.publicKey,
      new PublicKey(fromTokenAddr)
    );

    if (Number(tokenBalance) < Number(amount)) {
      return createResponse(Status.Failure, {}, 'Insufficient token balance.');
    }

    const quoteResponse = await axios.get('https://quote-api.jup.ag/v6/quote', {
      params: {
        inputMint: fromTokenAddr,
        outputMint: toTokenAddr,
        amount: lamportAmount,
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
      .then((res) => res.data)
      .catch((e) => console.log(e));

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
      preflightCommitment: 'confirmed',
    });
    await connection.confirmTransaction(
      {
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        signature: txid,
      },
      'confirmed'
    );

    return createResponse(Status.Success, { txHash: txid });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    return createResponse(Status.Failure, {}, errorMsg);
  }
};

const getPrice = async (
  network: Network,
  tokenAddress: string
): Promise<{ status: Status; error?: string; data: { usdPrice?: number } }> => {
  try {
    if (network !== Network.DEV && network !== Network.MAIN) {
      return createResponse(Status.Failure, {}, 'Invalid network specified.');
    }

    const chain = network === Network.DEV ? 'devnet' : 'mainnet';

    const response = await Moralis.SolApi.token.getTokenPrice({
      network: chain,
      address: tokenAddress,
    });

    const usdPrice = response?.raw.usdPrice || 0;

    return createResponse(Status.Success, { usdPrice }, '');
  } catch (error: unknown) {
    // Handle and log errors
    const errorMsg =
      error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error fetching token price:', errorMsg);

    // Return a failure response
    return createResponse(Status.Failure, {}, 'Failed to get token price.');
  }
};

const getWalletPorfolio = async (
  network: Network,
  address: string
): Promise<{ status: Status; error?: string; data: { portfolio?: any } }> => {
  try {
    if (network !== Network.DEV && network !== Network.MAIN) {
      return createResponse(Status.Failure, {}, 'Invalid network specified.');
    }

    const chain = network === Network.DEV ? 'devnet' : 'mainnet';

    const response = await Moralis.SolApi.account.getPortfolio({
      network: chain,
      address: address,
    });

    return createResponse(Status.Success, { portfolio: response.raw }, '');
  } catch (error: unknown) {
    // Handle and log errors
    const errorMsg =
      error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error fetching wallet portfolio:', errorMsg);

    // Return a failure response
    return createResponse(
      Status.Failure,
      {},
      'Failed to fetch wallet portfolio.'
    );
  }
};

const getTokenBalance = async (
  userPublicKey: PublicKey,
  tokenAddress: PublicKey
) => {
  try {
    if (tokenAddress === NATIVE_MINT) {
      const balance = await connection.getBalance(userPublicKey);
      return balance;
    }

    const tokenAccounts = await connection.getTokenAccountsByOwner(
      userPublicKey,
      {
        mint: new PublicKey(tokenAddress),
      }
    );

    if (tokenAccounts.value.length === 0) {
      createResponse(
        Status.Failure,
        {},
        'No token account found for this user.'
      );
      return;
    }

    // const mintInfo = await getMint(connection, new PublicKey(tokenAddress));
    const balance = await connection.getTokenAccountBalance(tokenAccounts.value[0].pubkey);

    // const amountUnit =
    //   Number(balance.amount.toString()) / 10 ** mintInfo.decimals;
    return balance.value.amount ;
  } catch (error) {
    createResponse(
      Status.Failure,
      {},
      'Something went wrong while getting token information'
    );
    return;
  }
};

export { getBalance, sendSol, swapToken, getPrice, getWalletPorfolio };
