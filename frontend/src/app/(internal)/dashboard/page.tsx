import React from 'react'
import { auth } from '@/lib/auth'
import logger from '@/lib/logger'
import { redirect } from 'next/navigation'
import { getUserData } from '@/services/user/get-user'
import { getWalletData } from '@/services/wallet/get-wallet'
import { DashboardContent } from './_components/dashboard-content'

const DashboardPage = async () => {
  logger.info('DashboardPage called')
  const session = await auth()

  if (!session) {
    return redirect('/login')
  }

  try {
    const userData = await getUserData(session?.user?.id)
    const publicKey = userData.data?.user?.public_key
    const walletData = await getWalletData(session?.user?.id, publicKey)

    return (
      <>
        <DashboardContent walletData={walletData} />
      </>
    )
  } catch (error) {
    return (
      <div className="p-4 text-red-500">
        Error: {error instanceof Error ? error.message : 'Failed to load dashboard data'}
      </div>
    )
  }
}

export default DashboardPage
