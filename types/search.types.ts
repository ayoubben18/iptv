export type SearchResult = {
  title: string;
  group: string;
};

export enum SearchType {
  VOD = "get_vod_streams",
  LIVE = "get_live_streams",
  SERIES = "get_series",
}

export type SearchParams = {
  search: string;
  type_search: SearchType;
  key: string;
  action: string;
};
