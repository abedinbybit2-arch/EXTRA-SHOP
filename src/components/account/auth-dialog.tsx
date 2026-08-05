"use client";

import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  authErrorMessage,
  loginWithEmail,
  registerWithEmail,
} from "@/lib/firebase/auth-actions";
import { cn } from "@/lib/utils";
import { useUI } from "@/store/ui";

/** Email and password only — no phone, OTP or third-party providers. */
export function AuthDialog() {
  const mode = useUI((s) => s.authDialog);
  const setAuthDialog = useUI((s) => s.setAuthDialog);

  return (
    <Dialog open={mode !== null} onOpenChange={(open) => !open && setAuthDialog(null)}>
      <DialogContent className="max-w-md">
        {mode && <AuthForm key={mode} mode={mode} />}
      </DialogContent>
    </Dialog>
  );
}

function AuthForm({ mode }: { mode: "login" | "register" }) {
  const setAuthDialog = useUI((s) => s.setAuthDialog);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [reveal, setReveal] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isRegister = mode === "register";

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least six characters.");
      return;
    }
    if (isRegister && password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setBusy(true);
    try {
      if (isRegister) {
        await registerWithEmail(email, password);
        toast.success("Account created", {
          description: "Your cart and orders will now follow you.",
        });
      } else {
        await loginWithEmail(email, password);
        toast.success("Signed in", { description: email.trim() });
      }
      setAuthDialog(null);
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{isRegister ? "Create an account" : "Sign in"}</DialogTitle>
        <DialogDescription>
          {isRegister
            ? "Register with an email address to keep your cart and orders across devices."
            : "Sign in to restore your avatar, cart and order history."}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={submit} noValidate className="space-y-4">
        <div>
          <Label htmlFor="auth-email" className="mb-2 block text-xs text-muted-foreground">
            Email address
          </Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              autoComplete="email"
              className="pl-11"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="auth-password" className="mb-2 block text-xs text-muted-foreground">
            Password
          </Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="auth-password"
              type={reveal ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              autoComplete={isRegister ? "new-password" : "current-password"}
              className="px-11"
            />
            <button
              type="button"
              onClick={() => setReveal((r) => !r)}
              aria-label={reveal ? "Hide password" : "Show password"}
              aria-pressed={reveal}
              className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
            >
              {reveal ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        {isRegister && (
          <div>
            <Label
              htmlFor="auth-confirm"
              className="mb-2 block text-xs text-muted-foreground"
            >
              Confirm password
            </Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="auth-confirm"
                type={reveal ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat your password"
                autoComplete="new-password"
                className="pl-11"
              />
            </div>
          </div>
        )}

        {error && (
          <p role="alert" className="rounded-xl bg-destructive/10 px-4 py-3 text-xs text-destructive">
            {error}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={busy}>
          {busy && <Loader2 className={cn("size-4 animate-spin")} />}
          {isRegister ? "Create account" : "Sign in"}
        </Button>
      </form>

      <p className="mt-5 text-center text-xs text-muted-foreground">
        {isRegister ? "Already have an account?" : "New here?"}{" "}
        <button
          type="button"
          onClick={() => setAuthDialog(isRegister ? "login" : "register")}
          className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-accent"
        >
          {isRegister ? "Sign in" : "Create one"}
        </button>
      </p>
    </>
  );
}
