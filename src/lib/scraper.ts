import axios from "axios";
import * as cheerio from "cheerio";

import { extractPrice } from "./utils";

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
      $(".a-button-selected .a-color-base"),
      $(".a-price.a-text-price")
    );
    console.log("Getting the product title :", title);
    console.log("Getting the product Price :", price);
  } catch (error) {
    console.log("Getting data from bright data :", error);
  }
}
