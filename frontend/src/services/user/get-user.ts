import logger from "@/lib/logger";
import { UserData } from "@/types/auth";


export const getUserData = async (userId?: string): Promise<UserData> => {
  if (!userId) {
    throw new Error('User ID is required')
  }
  try {
    const response = await fetch('http://localhost:3000/api/v1/user/me', {
      headers: {
        'x-user-id': userId,
        'Content-Type': 'application/json',
      },
      cache: "no-cache"
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch user data')
    }

    return response.json()
  } catch (error) {
    logger.error('Error fetching user data:', error)
    throw error
  }
}
