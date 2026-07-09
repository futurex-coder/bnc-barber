"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

/** Shared submit helper for admin forms: pending state, toast, redirect+refresh. */
export function useSave() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function save<T>(
    fn: () => Promise<T>,
    opts?: { success?: string; redirectTo?: string | ((result: T) => string) },
  ) {
    setSaving(true);
    try {
      const result = await fn();
      toast.success(opts?.success ?? "Записано");
      const to =
        typeof opts?.redirectTo === "function" ? opts.redirectTo(result) : opts?.redirectTo;
      if (to) router.push(to);
      router.refresh();
      return result;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Грешка при запис.");
      throw e;
    } finally {
      setSaving(false);
    }
  }

  return { save, saving };
}
