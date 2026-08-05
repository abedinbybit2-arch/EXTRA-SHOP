import {
  Briefcase,
  Footprints,
  Gem,
  Glasses,
  Headphones,
  Lamp,
  RotateCcw,
  ShieldCheck,
  Shirt,
  SprayCan,
  Truck,
  Watch,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * Explicit icon registry. Data files reference icons by name, and mapping them
 * here keeps the bundle tree-shakeable — a dynamic lookup on the whole lucide
 * package would pull in every icon.
 */
const ICONS: Record<string, LucideIcon> = {
  Briefcase,
  Footprints,
  Gem,
  Glasses,
  Headphones,
  Lamp,
  RotateCcw,
  ShieldCheck,
  Shirt,
  SprayCan,
  Truck,
  Watch,
  Wrench,
};

export function getIcon(name: string): LucideIcon {
  return ICONS[name] ?? Gem;
}
