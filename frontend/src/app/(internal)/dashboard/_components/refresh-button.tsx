'use client'
import { useTransition } from 'react'
import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'

export function RefreshButton() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const handleRefresh = async () => {
    startTransition(() => {
      router.refresh()
      // await queryClient.invalidateQueries({ queryKey: ['walletData'] })
      toast({
        title: "Success",
        description: "Dashboard data has been refreshed.",
      })
    })


    // setIsLoading(true)
    // toast({
    //   title: "Refreshing dashboard",
    //   description: "Your dashboard data is being updated.",
    // })

    // try {
    //   // router.refresh()
    //   toast({
    //     title: "Success",
    //     description: "Dashboard data has been updated.",
    //   })
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Failed to refresh dashboard data.",
    //     variant: "destructive",
    //   })
    // } finally {
    //   setIsLoading(false)
    // }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleRefresh}
      disabled={isPending}
      className="h-8 px-2"
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Refreshing...
        </>
      ) : (
        <>
          <RefreshCcw className="mr-2 h-4 w-4" />
          Refresh
        </>
      )}
    </Button>
  )
}
