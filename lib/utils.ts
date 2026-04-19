import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTRY(kurus: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
  }).format(kurus / 100);
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export function formatRelativeDate(date: Date | number): string {
  const d = typeof date === "number" ? new Date(date) : date;
  const diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 60) return "az önce";
  if (diff < 3600) return `${Math.floor(diff / 60)} dk önce`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} sa önce`;
  if (diff < 86400 * 7) return `${Math.floor(diff / 86400)} gün önce`;
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function compactNumber(n: number): string {
  return new Intl.NumberFormat("tr-TR", { notation: "compact" }).format(n);
}

export function slugify(input: string): string {
  return input
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
