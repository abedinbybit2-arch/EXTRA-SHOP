"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export const Tabs = TabsPrimitive.Root;

export function TabsList({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        "no-scrollbar flex w-full items-center gap-6 overflow-x-auto border-b border-border",
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "relative whitespace-nowrap py-4 text-sm font-medium text-muted-foreground transition-colors",
        "hover:text-foreground data-[state=active]:text-foreground",
        // Underline indicator sits on the shared bottom border.
        "after:absolute after:inset-x-0 after:-bottom-px after:h-px after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 after:ease-luxe",
        "data-[state=active]:after:scale-x-100",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn("pt-8 focus-visible:outline-none", className)}
      {...props}
    />
  );
}
