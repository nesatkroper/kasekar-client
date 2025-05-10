import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Decimal } from "decimal.js"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: Decimal | number): string {
  const value = typeof amount === "number" ? amount : amount.toNumber()
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value)
}
