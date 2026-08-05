"use client";

import { Check, LogOut, Package, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { avatars } from "@/data/avatars";
import { saveAvatar } from "@/lib/firebase/account";
import { authErrorMessage, logout } from "@/lib/firebase/auth-actions";
import { resolveLines } from "@/lib/cart-totals";
import { cn, formatDate, formatPrice } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { useSession } from "@/store/session";
import { useUI } from "@/store/ui";

import { AvatarBadge } from "./avatar-badge";

/** Signed-in account panel: avatar, email, orders, saved cart and logout. */
export function AccountPanel() {
  const open = useUI((s) => s.accountPanelOpen);
  const setOpen = useUI((s) => s.setAccountPanelOpen);

  const status = useSession((s) => s.status);
  const email = useSession((s) => s.email);
  const avatarId = useSession((s) => s.avatarId);
  const orders = useSession((s) => s.orders);
  const uid = useSession((s) => s.uid);
  const kind = useSession((s) => s.kind);

  const cartItems = useCart((s) => s.items);
  const lines = resolveLines(cartItems);

  if (status !== "user") return null;

  const chooseAvatar = async (id: string) => {
    if (!uid) return;
    try {
      await saveAvatar(kind, uid, id);
      toast.success("Avatar updated");
    } catch {
      toast.error("Could not save that avatar. Try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setOpen(false);
      toast.success("Signed out");
    } catch (error) {
      toast.error(authErrorMessage(error));
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Your account</SheetTitle>
        </SheetHeader>

        <SheetBody className="px-0 py-0">
          {/* Identity */}
          <div className="flex items-center gap-4 border-b border-border px-6 py-5">
            <AvatarBadge avatarId={avatarId} size="lg" />
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                Email address
              </p>
              <p className="truncate text-sm font-medium">{email}</p>
            </div>
          </div>

          <div className="px-6">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList>
                <TabsTrigger value="orders">My orders ({orders.length})</TabsTrigger>
                <TabsTrigger value="cart">Saved cart ({lines.length})</TabsTrigger>
                <TabsTrigger value="avatar">Avatar</TabsTrigger>
              </TabsList>

              {/* Orders */}
              <TabsContent value="orders" className="pt-6">
                {orders.length === 0 ? (
                  <EmptyPanel
                    icon={Package}
                    title="No orders yet"
                    body="Orders you place will appear here and stay available after you sign out and back in."
                  />
                ) : (
                  <ul className="space-y-4 pb-6">
                    {orders.map((order) => (
                      <li
                        key={order.id}
                        className="rounded-2xl border border-border bg-card p-5"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium">{order.reference}</p>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              {formatDate(order.placedAt)} · {order.totals.itemCount}{" "}
                              {order.totals.itemCount === 1 ? "item" : "items"}
                            </p>
                          </div>
                          <p className="text-sm font-medium tabular-nums">
                            {formatPrice(order.totals.total)}
                          </p>
                        </div>

                        <ul className="mt-4 space-y-3 border-t border-border pt-4">
                          {order.lines.map((line, index) => (
                            <li key={`${order.id}-${index}`} className="flex items-center gap-3">
                              <span className="relative aspect-4/5 w-10 shrink-0 overflow-hidden rounded-md bg-muted">
                                <Image
                                  src={line.image}
                                  alt=""
                                  fill
                                  sizes="40px"
                                  className="object-cover"
                                />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-xs font-medium">
                                  {line.name}
                                </span>
                                <span className="block truncate text-[11px] text-muted-foreground">
                                  {[line.color, line.size, `Qty ${line.quantity}`]
                                    .filter(Boolean)
                                    .join(" · ")}
                                </span>
                              </span>
                              <span className="shrink-0 text-xs tabular-nums">
                                {formatPrice(line.lineTotal)}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <p className="mt-4 text-[11px] text-muted-foreground">
                          {order.deliveryLabel} · {order.paymentLabel}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </TabsContent>

              {/* Saved cart */}
              <TabsContent value="cart" className="pt-6">
                {lines.length === 0 ? (
                  <EmptyPanel
                    icon={ShoppingBag}
                    title="Your saved cart is empty"
                    body="Anything you add is saved to your account and restored when you sign back in."
                  />
                ) : (
                  <>
                    <ul className="space-y-3 pb-5">
                      {lines.map((line) => (
                        <li
                          key={`${line.productId}-${line.color}-${line.size}`}
                          className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
                        >
                          <span className="relative aspect-4/5 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                            <Image
                              src={line.product.images[0]}
                              alt=""
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium">
                              {line.product.name}
                            </span>
                            <span className="block truncate text-xs text-muted-foreground">
                              {[line.color, line.size, `Qty ${line.quantity}`]
                                .filter(Boolean)
                                .join(" · ")}
                            </span>
                          </span>
                          <span className="shrink-0 text-sm tabular-nums">
                            {formatPrice(line.lineTotal)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full" onClick={() => setOpen(false)}>
                      <Link href="/cart">Open shopping bag</Link>
                    </Button>
                  </>
                )}
              </TabsContent>

              {/* Avatar picker */}
              <TabsContent value="avatar" className="pt-6">
                <p className="mb-5 text-sm text-muted-foreground">
                  Choose an avatar. Selecting one saves it to your account
                  immediately — there are no uploads.
                </p>
                <ul className="grid grid-cols-4 gap-3 pb-6 sm:grid-cols-6">
                  {avatars.map((avatar) => {
                    const active = avatar.id === avatarId;
                    return (
                      <li key={avatar.id}>
                        <button
                          type="button"
                          onClick={() => void chooseAvatar(avatar.id)}
                          aria-label={avatar.label}
                          aria-pressed={active}
                          title={avatar.label}
                          className={cn(
                            "relative grid w-full place-items-center rounded-xl p-1.5 transition-all duration-300 ease-luxe",
                            active
                              ? "ring-2 ring-accent"
                              : "hover:bg-secondary",
                          )}
                        >
                          <AvatarBadge avatarId={avatar.id} />
                          {active && (
                            <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-accent text-accent-foreground">
                              <Check className="size-3" strokeWidth={3} />
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        </SheetBody>

        <SheetFooter>
          <Button variant="outline" className="w-full" onClick={() => void handleLogout()}>
            <LogOut className="size-4" />
            Logout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function EmptyPanel({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Package;
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-col items-center py-12 text-center">
      <span className="mb-4 grid size-14 place-items-center rounded-full bg-secondary">
        <Icon className="size-6 text-muted-foreground" strokeWidth={1.5} />
      </span>
      <p className="text-base font-medium">{title}</p>
      <p className="mt-2 max-w-xs text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
