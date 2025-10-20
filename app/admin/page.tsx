import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import AdminDashboardClient from "./AdminDashboardClient"

const AdminPage = async () => {
  const user = await currentUser()

  // user not logged in
  if(!user) redirect("/")

  const adminEmail = process.env.ADMIN_EMAIL;
  const userAdmin = user.emailAddresses[0].emailAddress;

  // check user whether admin or not
  if(!adminEmail || userAdmin !== adminEmail) redirect("/dashboard")
  return <AdminDashboardClient />
}

export default AdminPage
