import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Decimal } from "decimal.js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// lib/utils.ts
export function formatCurrency(
  amount: number | string | { toNumber: () => number }
) {
  // Handle different input types
  let numericAmount: number;

  if (typeof amount === "number") {
    numericAmount = amount;
  } else if (typeof amount === "string") {
    numericAmount = parseFloat(amount);
  } else if (amount && typeof amount.toNumber === "function") {
    numericAmount = amount.toNumber();
  } else {
    console.error("Invalid amount format:", amount);
    numericAmount = 0; // Default fallback
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(numericAmount);
}


