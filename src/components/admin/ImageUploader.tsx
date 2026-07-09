"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/cn";

/** Uploads a file to the public `media` bucket and returns its public URL. */
export async function uploadToMedia(file: File, folder: string): Promise<string> {
  const supabase = createClient();
  const ext = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from("media")
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) throw error;
  return supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
}

export function ImageUploader({
  value,
  onChange,
  folder,
  aspect = "aspect-[4/5]",
  className,
}: {
  value: string;
  onChange: (url: string) => void;
  folder: string;
  aspect?: string;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function handleFile(file?: File) {
    if (!file) return;
    setBusy(true);
    try {
      const url = await uploadToMedia(file, folder);
      onChange(url);
    } catch {
      toast.error("Качването се провали. Опитай пак.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={cn("relative overflow-hidden rounded-lg border border-hairline bg-base", aspect, className)}>
      {value ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-base/80 text-ink backdrop-blur transition-colors hover:bg-oxblood/70"
            title="Премахни"
          >
            <X className="h-4 w-4" />
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-grey transition-colors hover:text-ink"
        >
          {busy ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <>
              <UploadCloud className="h-6 w-6" />
              <span className="text-xs">Качи снимка</span>
            </>
          )}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
