"use server"
import { revalidateTag } from "next/cache"
export async function refreshDashboard() {
    return revalidateTag("wallet")
}