"use server";

import { scrapeAmzaonProduct } from "@/lib/scraper";

export async function ScrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return null;
  const scrapedProduct = await scrapeAmzaonProduct(productUrl);
  try {
  } catch (error) {
    console.log("SCRAPPING THE PRODUCT DETAILS:", error);
  }
}
