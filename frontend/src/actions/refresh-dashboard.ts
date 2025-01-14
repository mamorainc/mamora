"use server";

import { revalidatePath } from "next/cache";

export async function refreshDashboard() {
  revalidatePath("/(internal)/dashboard", "page");
}
