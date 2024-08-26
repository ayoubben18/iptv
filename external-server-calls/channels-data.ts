"use server";

import { parseSearchResults } from "@/lib/parsers";
import { SearchParams, SearchResult, SearchType } from "@/types/search.types";

const getChannelsData = async (
  searchTerm: string,
  typeSearch: SearchType,
): Promise<SearchResult[]> => {
  const url = "https://megaottcredits.tv/";
  const params: SearchParams = {
    search: searchTerm,
    type_search: typeSearch,
    key: "GvshZIvD+41THJn4Ldt01A==",
    action: "search",
  };
  const formData = new URLSearchParams(params as Record<string, string>);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const html = await response.text();
  return parseSearchResults(html);
};

export { getChannelsData };
