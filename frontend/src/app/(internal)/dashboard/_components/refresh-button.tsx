'use client'

import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function RefreshButton() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = async () => {
    setIsLoading(true)
    toast({
      title: "Refreshing dashboard",
      description: "Your dashboard data is being updated.",
    })

    try {
      router.refresh()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh dashboard data.",
        variant: "destructive",
      })
    } finally {
      setTimeout(() => {
        setIsLoading(false)
        toast({
          title: "Success",
          description: "Dashboard data has been updated.",
        })
      }, 1000)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleRefresh}
      disabled={isLoading}
      className="h-8 px-2 w-full sm:w-auto"
    >
      {isLoading ? (
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
