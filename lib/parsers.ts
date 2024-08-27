import { SearchResult } from "@/types/search.types";
import * as cheerio from "cheerio";
import { JSONContent } from "novel";

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

const getBlogCreationTime = (blogContent: JSONContent) => {
  const firstTitle =
    blogContent?.content?.find((item) => item.type === "heading")?.content?.[0]
      ?.text ?? "No Title";
  const firstParagraph =
    blogContent?.content?.find((item) => item.type === "paragraph")
      ?.content?.[0]?.text ?? "No Description";
  const firstImage =
    blogContent?.content?.find((item) => item.type === "image")?.attrs?.src ??
    "/no-image.jpg";
  return {
    title: firstTitle,
    description: firstParagraph,
    image: firstImage,
  };
};

function formatToMacAddress(mac: string): string {
  if (mac.length > 12) {
    throw new Error("Invalid Mac Address");
  }

  return (
    mac
      .toUpperCase()
      .match(/.{1,2}/g)
      ?.join(":") ?? ""
  );
}

export { parseSearchResults, getBlogCreationTime, formatToMacAddress };
