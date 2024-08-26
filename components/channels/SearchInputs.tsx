"use client";
import { SearchType } from "@/types/search.types";
import { useQueryState } from "nuqs";
import React from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const searchValues = [
  {
    value: SearchType.LIVE,
    label: "Channels",
  },
  {
    value: SearchType.VOD,
    label: "Movies",
  },

  {
    value: SearchType.SERIES,
    label: "Series",
  },
];

const SearchInputs = () => {
  const [search, setSearch] = useQueryState("search");
  const [typeSearch, setTypeSearch] = useQueryState<SearchType>("type_search", {
    defaultValue: SearchType.LIVE,
    parse: (value) => value as SearchType,
  });

  return (
    <div className="flex w-full gap-2">
      <Input
        value={search ?? ""}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
      />
      <Select
        value={typeSearch}
        onValueChange={(e) => setTypeSearch(e as SearchType)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Search" />
        </SelectTrigger>
        <SelectContent>
          {searchValues.map((value) => (
            <SelectItem key={value.value} value={value.value}>
              {value.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchInputs;
