"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={signOut}
      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-grey transition-colors hover:bg-white/[0.04] hover:text-ink"
    >
      <LogOut className="h-4 w-4" />
      Изход
    </button>
  );
}
