import React from 'react'
import { auth } from '@/lib/auth'
import logger from '@/lib/logger'
import { redirect } from 'next/navigation'
import { DashboardContent } from './_components/dashboard-content'
import { WalletService } from '@/services/wallet'


const DashboardPage = async () => {
  logger.info('DashboardPage called')
  const session = await auth()

  if (!session) {
    return redirect('/login')
  }

  try {
    const userId = session?.user?.id
    const walletService = new WalletService(userId!);
    const walletData = await walletService.getWalletData("mainnet");

    return (
      <DashboardContent initialWalletData={walletData} userId={session?.user?.id as string} />
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
