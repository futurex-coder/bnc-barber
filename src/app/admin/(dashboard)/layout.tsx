import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/admin/auth";
import { AdminShell } from "@/components/admin/AdminShell";
import { Toaster } from "@/components/admin/Toaster";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Администрация",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAdmin } = await getAdmin();
  if (!user || !isAdmin) redirect("/admin/login");

  return (
    <>
      <AdminShell email={user.email ?? ""}>{children}</AdminShell>
      <Toaster />
    </>
  );
}
