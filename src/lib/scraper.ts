import axios from "axios";
import * as cheerio from "cheerio";

import {
  extractCurrency,
  extractPrice,
  extractStars,
  extractTableValues,
} from "./utils";

export async function scrapeAmzaonProduct(productUrl: string) {
  if (!productUrl) return null;

  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);

  const port = 33335;
  const session_id = (1000000 * Math.random()) | 0;

  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  try {
    const response = await axios.get(productUrl, options);
    const $ = cheerio.load(response.data);

    const title = $(`#productTitle`).text().trim();
    const price = extractPrice(
      $(".priceToPay span.a-price-whole"),
      $("a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base")
    );
    const originalPrice = extractPrice(
      $("priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price")
    );
    const outOfStock =
      $("#availability span").text().trim().toLowerCase() ===
      "cuurently unavailable";
    const mainImages =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      "";
    const currency = extractCurrency($(".a-price-symbol"));
    const discountRate = $(".savingsPercentage").text().replace(/[-%]/g, "");
    const reviewsCount = $("#acrCustomerReviewText").text().trim();
    const stars = extractStars(
      $(".reviewCountTextLinkedHistogram"),
      $(".reviewCountTextLinkedHistogram.noUnderline")
    );
    const category = extractTableValues(
      $,
      "productDetails_detailBullets_sections1"
    );

    const parsedImages = Object.keys(JSON.parse(mainImages));

    // console.log("Getting the product title :", title);
    // console.log("Getting the product price :", price, originalPrice);
    // console.log("Getting the stock availability :", outOfStock);
    // console.log("Getting the main images :", parsedImages);
    // console.log("Getting the currency :", currency);
    // console.log("Getting the discount rate :", discountRate);

    const data = {
      productUrl,
      currency: currency || "$",
      image: parsedImages,
      title,
      price,
      originalPrice,
      priceHistory: [],
      discountRate,
      category: category,
      reviewsCount,
      stars,
      outOfStock,
      lowestPrice: price,
      highestPrice: originalPrice,
      averagePrice: price,
    };

    console.log(data);
    return data;
  } catch (error) {
    console.log("Getting data from bright data :", error);
  }
}
