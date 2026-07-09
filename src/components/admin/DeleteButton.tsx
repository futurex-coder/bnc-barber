"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export function DeleteButton({
  onDelete,
  confirmText = "Сигурен ли си? Това не може да се върне.",
  redirectTo,
  label,
}: {
  onDelete: () => Promise<void>;
  confirmText?: string;
  redirectTo?: string;
  label?: string;
}) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!window.confirm(confirmText)) return;
        startTransition(async () => {
          try {
            await onDelete();
            toast.success("Изтрито");
            if (redirectTo) router.push(redirectTo);
            router.refresh();
          } catch {
            toast.error("Изтриването се провали.");
          }
        });
      }}
      className="inline-flex items-center gap-1.5 rounded-lg border border-oxblood/50 px-3 py-1.5 text-xs text-red-300 transition-colors hover:bg-oxblood/20 disabled:opacity-50"
    >
      <Trash2 className="h-3.5 w-3.5" />
      {label ?? "Изтрий"}
    </button>
  );
}
