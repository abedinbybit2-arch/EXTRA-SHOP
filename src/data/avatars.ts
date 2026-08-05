/**
 * Predefined avatars. Users pick one of these rather than uploading an image —
 * there is no file input, camera access or cropping anywhere in the app.
 *
 * Each avatar is drawn from the site's own palette so the picker sits inside
 * the existing visual language instead of importing external artwork.
 */
export interface Avatar {
  id: string;
  label: string;
  /** Two-letter monogram rendered inside the swatch. */
  monogram: string;
  /** CSS gradient used as the swatch background. */
  gradient: string;
  /** Foreground colour for the monogram. */
  ink: string;
}

export const avatars: Avatar[] = [
  { id: "onyx", label: "Onyx", monogram: "ON", gradient: "linear-gradient(135deg,#2b2723,#14110e)", ink: "#e9dcbc" },
  { id: "champagne", label: "Champagne", monogram: "CH", gradient: "linear-gradient(135deg,#e9dcbc,#c2a052)", ink: "#14110e" },
  { id: "ivory", label: "Ivory", monogram: "IV", gradient: "linear-gradient(135deg,#faf8f5,#e4dcd1)", ink: "#14110e" },
  { id: "cognac", label: "Cognac", monogram: "CO", gradient: "linear-gradient(135deg,#c07a42,#96552b)", ink: "#faf8f5" },
  { id: "emerald", label: "Emerald", monogram: "EM", gradient: "linear-gradient(135deg,#2f6f5a,#12433a)", ink: "#e9f5ef" },
  { id: "midnight", label: "Midnight", monogram: "MI", gradient: "linear-gradient(135deg,#31435f,#1c2434)", ink: "#dce5f2" },
  { id: "plum", label: "Plum", monogram: "PL", gradient: "linear-gradient(135deg,#6d3f5b,#3f2338)", ink: "#f3e4ee" },
  { id: "steel", label: "Steel", monogram: "ST", gradient: "linear-gradient(135deg,#b9bdc2,#7d8388)", ink: "#14110e" },
  { id: "olive", label: "Olive", monogram: "OL", gradient: "linear-gradient(135deg,#7a7a52,#4a4a30)", ink: "#f2f0e2" },
  { id: "rose", label: "Rose Gold", monogram: "RO", gradient: "linear-gradient(135deg,#e0a894,#c48b76)", ink: "#14110e" },
  { id: "slate", label: "Slate", monogram: "SL", gradient: "linear-gradient(135deg,#5b5852,#3a3833)", ink: "#efe9df" },
  { id: "sand", label: "Sand", monogram: "SA", gradient: "linear-gradient(135deg,#e6dfd2,#c9b99b)", ink: "#14110e" },
];

export const DEFAULT_AVATAR_ID = "onyx";

export function getAvatar(id: string | undefined): Avatar {
  return avatars.find((a) => a.id === id) ?? avatars[0];
}
