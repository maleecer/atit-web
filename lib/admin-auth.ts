import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"

export async function isAuthorizedAdmin(): Promise<boolean> {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) {
    return false
  }

  const allowedEmails = process.env.ADMIN_EMAILS
    ?.split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)

  if (allowedEmails && allowedEmails.length > 0) {
    const userEmail = data.user.email?.toLowerCase()
    return Boolean(userEmail && allowedEmails.includes(userEmail))
  }

  return true
}
