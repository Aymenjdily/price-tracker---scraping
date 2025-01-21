/* eslint-disable @typescript-eslint/no-explicit-any */
import * as cheerio from "cheerio";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractPrice = (...elements: any) => {
  for (const element of elements) {
    const priceText = element.text().trim();

    if (priceText) return priceText.replace(/[^\d.]/g, "");
  }

  return "";
};

export const extractCurrency = (element: any) => {
  const currencyText = element.text().trim().slice(0, 1);
  return currencyText ? currencyText : "";
};

export const extractStars = (...elements: any) => {
  for (const element of elements) {
    const stars = element.text().trim();

    if (stars) return stars.replace(/[^\d.]/g, "");
  }

  return "";
};

export const extractTableValues = (
  $: cheerio.CheerioAPI,
  tableId: string
): string[] => {
  const values: string[] = [];
  $(`#${tableId} tr`).each((_, row) => {
    $(row)
      .find("td, th")
      .each((_, cell) => {
        const text = $(cell).text().trim();
        if (text) {
          values.push(text);
        }
      });
  });

  return values;
};
