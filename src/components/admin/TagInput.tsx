"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function TagInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");

  function add(raw: string) {
    const t = raw.trim();
    if (!t) return;
    if (!value.includes(t)) onChange([...value, t]);
    setDraft("");
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-hairline bg-base px-2 py-2 focus-within:border-gold/60 focus-within:ring-2 focus-within:ring-gold/20">
      {value.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-full border border-hairline bg-white/[0.03] px-2.5 py-1 text-xs text-ink"
        >
          {tag}
          <button
            type="button"
            onClick={() => onChange(value.filter((t) => t !== tag))}
            className="text-grey transition-colors hover:text-oxblood"
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            add(draft);
          } else if (e.key === "Backspace" && !draft && value.length) {
            onChange(value.slice(0, -1));
          }
        }}
        onBlur={() => add(draft)}
        placeholder={value.length ? "" : placeholder || "Добави таг и Enter"}
        className="min-w-24 flex-1 bg-transparent px-1 text-sm text-ink placeholder:text-grey/60 focus:outline-none"
      />
    </div>
  );
}
