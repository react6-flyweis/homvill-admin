import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Return a stable avatar URL for a given seed.
 * Uses i.pravatar.cc which returns a random-looking avatar per numeric id.
 * If seed is not numeric, we hash it to a small number to keep results stable.
 */
export function avatarUrl(seed = "random", size = 128) {
  let id = 0;
  if (typeof seed === "number") id = Math.abs(seed) % 70 || 1;
  else if (typeof seed === "string") {
    // simple hash
    for (let i = 0; i < seed.length; i++)
      id = (id << 5) - id + seed.charCodeAt(i);
    id = Math.abs(id) % 70 || 1;
  }
  return `https://i.pravatar.cc/${size}?img=${id}`;
}

/**
 * Return a stable photo URL using picsum.photos seed.
 * `width`/`height` default to 400x300.
 */
export function photoUrl(seed = "random", width = 400, height = 300) {
  // encode seed so it's safe in the URL
  const s = encodeURIComponent(String(seed));
  return `https://picsum.photos/seed/${s}/${width}/${height}`;
}
