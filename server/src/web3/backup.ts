

// const getBalance = async (network: Network, pk: String) => {
//   try {
//     if (!network) {
//       return createResponse(Status.Failure, {}, 'Network is not define');
//     }
//     const connection = getConnection(network);
//     const balance = await connection.getBalance(new PublicKey(pk));

//     return createResponse(
//       Status.Success,
//       { balance: balance / LAMPORTS_PER_SOL },
//       ''
//     );
//   } catch (error) {
//     return createResponse(Status.Failure, {}, 'Someting Went Wrong');
//   }
// };


// const sendSol = async (
//   network: Network,
//   from: string,
//   to: string,
//   amount: string
// ) => {
//   try {
//     if (!network) {
//       return createResponse(Status.Failure, {}, 'Network is not define');
//     }
//     const userKey = Keypair.fromSecretKey(bs58.decode(from));
//     const amountLamports = Number(amount) * LAMPORTS_PER_SOL;
//     const connection = getConnection(network);

//     const balance = await connection.getBalance(
//       new PublicKey(userKey.publicKey)
//     );

//     const transactionFee = 5000; // 0.000005 SOL fee buffer

//     if (amountLamports > balance + transactionFee) {
//       return createResponse(Status.Failure, {}, 'Insufficient balance.');
//     }

//     let transaction = new Transaction().add(
//       SystemProgram.transfer({
//         fromPubkey: new PublicKey(userKey.publicKey),
//         toPubkey: new PublicKey(to),
//         lamports: amountLamports,
//       })
//     );

//     const txSignature = await sendAndConfirmTransaction(
//       connection,
//       transaction,
//       [userKey]
//     );
//     return createResponse(Status.Success, { txHash: txSignature }, '');
//   } catch (error) {
//     return createResponse(Status.Failure, {}, 'Something went wrong');
//   }
// };

// const swapToken = async (
//   network: Network,
//   fromSecretKey: string,
//   amount: string,
//   fromTokenAddr: string,
//   toTokenAddr: string
// ) => {
//   try {
//     // Set up connection and wallet
//     if (!network) {
//       return createResponse(Status.Failure, {}, 'Network is not define');
//     }

//     const wallet = new Wallet(
//       Keypair.fromSecretKey(bs58.decode(fromSecretKey))
//     );

//     // Step 1: Get a quote for swapping SOL to the target token
//     // console.log('Fetching quote...');
//     const quoteResponse = await axios.get('https://quote-api.jup.ag/v6/quote', {
//       params: {
//         inputMint: fromTokenAddr, // SOL mint address
//         outputMint: toTokenAddr, // User-provided token address
//         amount: amount, // Amount in lamports
//         slippageBps: 50, // process.env.SLIPPAGE, // Slippage tolerance
//       },
//     });

//     const quoteData = quoteResponse.data;
//     if (!quoteData) {
//       return createResponse(Status.Failure, {}, 'No quote data received.');
//       // throw new Error('No quote data received.');
//     }

//     // Step 2: Prepare the swap transaction
//     // console.log('Preparing swap transaction...');
//     const { swapTransaction } = await (
//       await axios.post(
//         'https://quote-api.jup.ag/v6/swap',
//         {
//           quoteResponse: quoteData,
//           userPublicKey: wallet.publicKey.toString(),
//           wrapAndUnwrapSol: true, // Automatically handle SOL wrapping/unwrapping
//           dynamicComputeUnitLimit: true,
//           prioritizationFeeLamports: 'auto',
//           // prioritizationFeeLamports: {
//           //   autoMultiplier: 2,
//           // },
//         },
//         {
//           headers: { 'Content-Type': 'application/json' },
//         }
//       )
//     ).data;

//     if (!swapTransaction) {
//       return createResponse(
//         Status.Failure,
//         {},
//         'No swap transaction data received.'
//       );

//       // throw new Error('No swap transaction data received.');
//     }

//     // Step 3: Deserialize the transaction
//     // console.log('Deserializing transaction...');
//     const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
//     let transaction = VersionedTransaction.deserialize(swapTransactionBuf);

//     // Step 4: Refresh the blockhash and sign the transaction
//     // console.log('Refreshing blockhash and signing transaction...');
//     const connection = getConnection(network);

//     const latestBlockHash = await connection.getLatestBlockhash();
//     transaction.message.recentBlockhash = latestBlockHash.blockhash;
//     transaction.sign([wallet.payer]);

//     // Step 5: Send the transaction
//     const rawTransaction = transaction.serialize();
//     const txid = await connection.sendRawTransaction(rawTransaction, {
//       skipPreflight: true,
//       maxRetries: 2,
//     });
//     await connection.confirmTransaction({
//       blockhash: latestBlockHash.blockhash,
//       lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
//       signature: txid,
//     });

//     // console.log(`Transaction successful: https://solscan.io/tx/${txid}`);
//     return createResponse(Status.Success, { txHash: txid }, '');
//   } catch (error) {
//     if (error instanceof Error) {
//       // console.error('Error in buyTokenService:', error.message);
//       if (
//         error.message.includes('TransactionExpiredBlockheightExceededError')
//       ) {
//         console.warn('Transaction expired. Please try again.');
//         // return 'Error: Transaction expired. Please try again.';

//         return createResponse(
//           Status.Failure,
//           {},
//           'Error: Transaction expired. Please try again.'
//         );
//       }
//       // return `Error: ${error.message}`;
//       return createResponse(Status.Failure, {}, 'Error: ${error.message}');
//     } else {
//       // console.error('An unknown error occurred');
//       return createResponse(
//         Status.Failure,
//         {},
//         'Error: An unknown error occurred'
//       );
//       // return 'An unknown error occurred';
//     }
//   }
// };

