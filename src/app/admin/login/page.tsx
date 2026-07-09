"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button, Input, Field } from "@/components/admin/ui";
import { ScissorsIcon } from "@/components/ui/icons";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setLoading(false);
        setError("Грешен имейл или парола.");
        return;
      }
      // Hard navigation so the server reads the freshly-set session cookie.
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get("redirect") || "/admin";
      window.location.assign(redirect.startsWith("/admin") ? redirect : "/admin");
    } catch {
      setLoading(false);
      setError("Възникна грешка. Опитай пак.");
    }
  }

  return (
    <div className="flex min-h-[100svh] items-center justify-center px-6 py-20">
      <div className="w-full max-w-sm rounded-brand border border-hairline bg-base-elevated/70 p-8 backdrop-blur">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 text-gold">
            <ScissorsIcon className="h-5 w-5" />
          </span>
          <div>
            <h1 className="font-display text-2xl uppercase tracking-wide text-ink">
              Bonnie &amp; Clyde
            </h1>
            <p className="text-sm text-grey">Администрация</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Field label="Имейл" htmlFor="email">
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </Field>
          <Field label="Парола" htmlFor="password">
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </Field>
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <Button type="submit" variant="gold" size="lg" disabled={loading} className="mt-1">
            {loading ? "Влизане…" : "Влез"}
          </Button>
        </form>
      </div>
    </div>
  );
}
