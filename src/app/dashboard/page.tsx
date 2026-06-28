import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import DashboardPage from "@/components/DashboardPage";
import { authOptions } from "@/lib/auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return <DashboardPage />;
}
