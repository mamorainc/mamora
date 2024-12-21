import { useEffect } from 'react'
import { useAuth } from '@/stores/use-auth'
import { api } from '@/lib/axios'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function useCheckAuth() {
    const { setAuth, setLoading, logout } = useAuth()

    useEffect(() => {
        const checkAuth = async () => {
            await sleep(1500)
            try {
                const response = await api.get('/auth/me')
                if (response.data?.data?.user) {
                    setAuth(response.data.data.user)
                } else {
                    logout()
                }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                logout()
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [setAuth, setLoading, logout])
}