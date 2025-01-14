import logger from "@/lib/logger"
import { WalletData } from "@/types/wallet"

export const getWalletData = async (userId?: string, userWallet?: string): Promise<WalletData> => {
  if (!userId) {
    throw new Error('User ID is required')
  }
  logger.info(`getWalletData called with userId: ${userId}, wallet: ${userWallet}`)

  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/user/wallet?chain=mainnet`,
      {
        headers: {
          'x-user-id': userId,
          'Content-Type': 'application/json',
        },
      },
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch wallet data')
    }

    return response.json()
  } catch (error) {
    logger.error('Error fetching wallet data:', error)
    throw error
  }
}
