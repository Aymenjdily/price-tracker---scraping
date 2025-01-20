/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractPrice = (...elements: any) => {
  for (const element of elements) {
    const priceText = element.text().trim();

    if (priceText) return priceText.replace(/\D/g, "");
  }

  return "";
};
