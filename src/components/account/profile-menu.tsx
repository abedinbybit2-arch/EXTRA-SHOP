"use client";

import { LogIn, LogOut, Package, ShoppingBag, User, UserPlus } from "lucide-react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authErrorMessage, logout } from "@/lib/firebase/auth-actions";
import { useSession } from "@/store/session";
import { useUI } from "@/store/ui";

import { AvatarBadge } from "./avatar-badge";

/**
 * Account entry point in the header.
 *
 * Signed out, the menu offers exactly two things — Login and Register. Signed
 * in, it shows the avatar, email and the account shortcuts.
 */
export function ProfileMenu() {
  const status = useSession((s) => s.status);
  const email = useSession((s) => s.email);
  const avatarId = useSession((s) => s.avatarId);
  const setAuthDialog = useUI((s) => s.setAuthDialog);
  const setAccountPanelOpen = useUI((s) => s.setAccountPanelOpen);

  // Hidden entirely when Firebase is not configured for this build.
  if (status === "unavailable") return null;

  const signedIn = status === "user";

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Signed out", { description: "You're browsing as a guest again." });
    } catch (error) {
      toast.error(authErrorMessage(error));
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={signedIn ? "Your account" : "Sign in or register"}
          className="grid size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary"
        >
          {signedIn ? (
            <AvatarBadge avatarId={avatarId} size="sm" />
          ) : (
            <User className="size-[18px]" />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-60">
        {signedIn ? (
          <>
            <div className="flex items-center gap-3 px-3 py-3">
              <AvatarBadge avatarId={avatarId} />
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  Signed in
                </p>
                <p className="truncate text-sm font-medium">{email}</p>
              </div>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem onSelect={() => setAccountPanelOpen(true)}>
              <User className="size-4" />
              Profile &amp; avatar
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setAccountPanelOpen(true)}>
              <Package className="size-4" />
              My orders
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setAccountPanelOpen(true)}>
              <ShoppingBag className="size-4" />
              Saved cart
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onSelect={() => void handleLogout()}>
              <LogOut className="size-4" />
              Logout
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem onSelect={() => setAuthDialog("login")}>
              <LogIn className="size-4" />
              Login
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setAuthDialog("register")}>
              <UserPlus className="size-4" />
              Register
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
