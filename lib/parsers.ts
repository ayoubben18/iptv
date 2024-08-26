import { SearchResult } from "@/types/search.types";
import * as cheerio from "cheerio";

function parseSearchResults(html: string): SearchResult[] {
  const $ = cheerio.load(html);
  const searchResults: SearchResult[] = [];

  const resultsContainer = $("#megaottcredits");

  resultsContainer.find("li").each((_, element) => {
    const title = cleanText($(element).find("h3").text());
    const group = cleanText($(element).find("h4 b").text());

    searchResults.push({ title, group });
  });

  return searchResults;
}

function cleanText(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

export { parseSearchResults };
