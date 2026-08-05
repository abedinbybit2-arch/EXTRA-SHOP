"use client";

import { getAvatar } from "@/data/avatars";
import { cn } from "@/lib/utils";

/**
 * Renders a predefined avatar. Avatars are generated from the site palette
 * rather than uploaded, so there is no image handling anywhere.
 */
export function AvatarBadge({
  avatarId,
  size = "md",
  className,
}: {
  avatarId: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const avatar = getAvatar(avatarId);
  const dimensions = {
    sm: "size-7 text-[9px]",
    md: "size-10 text-[11px]",
    lg: "size-16 text-sm",
  }[size];

  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-full font-display tracking-wider",
        dimensions,
        className,
      )}
      style={{ backgroundImage: avatar.gradient, color: avatar.ink }}
    >
      {avatar.monogram}
    </span>
  );
}
