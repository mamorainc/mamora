export const buySol = async (
  walletAddress: string,
  amount: string
) => {
  try {
    return {
      status: 0,
      data: {
        action: 'OPEN_MOONPAY',
        amount,
        walletAddress,
      },
      error: null,
    };
  } catch (error) {
    return {
      status: 1,
      data: null,
      error: error instanceof Error ? error.message : 'Failed to initiate SOL purchase',
    };
  }
};
