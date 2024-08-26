"use client";
import { SearchResult, SearchType } from "@/types/search.types";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { useState } from "react";
import { useQueryState } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import { getChannelsData } from "@/external-server-calls/channels-data";
import { useDebounce } from "use-debounce";

function ChannelsList() {
  const [search] = useQueryState("search", {
    defaultValue: "",
  });
  const [typeSearch] = useQueryState<SearchType>("type_search", {
    defaultValue: SearchType.VOD,
    parse: (value) => value as SearchType,
  });
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading } = useQuery({
    queryKey: ["search", debouncedSearch, typeSearch],
    queryFn: () =>
      getChannelsData(
        debouncedSearch?.length > 3 ? debouncedSearch : "Seven",
        typeSearch,
      ),
  });

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="flex flex-col overflow-hidden">
              <CardHeader className="p-0">
                <Skeleton className="h-48 w-full" />
              </CardHeader>
              <CardContent className="flex-grow p-4">
                <Skeleton className="mb-2 h-6 w-3/4" />
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Skeleton className="h-4 w-1/2" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data &&
            data.map((card, index) => <CardItem key={index} {...card} />)}
        </div>
      )}
    </div>
  );
}

export default ChannelsList;

const CardItem = ({ imageUrl, title, group }: SearchResult) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="transition-transform duration-300 ease-in-out"
            style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <p className="text-sm text-muted-foreground">{group}</p>
      </CardFooter>
    </Card>
  );
};

const cards: SearchResult[] = [
  {
    title: "Hello, Goodbye and Everything In Between [MULTI-SUB]",
    imageUrl: "http://tv365.me:900/images/n05spbekRTfx0OG4FI7bFssYlfo_big.jpg",
    group: '"MULTI-LANG| NETFLIX',
  },
  {
    title: "EN| Hello from Nowhere",
    imageUrl: "http://124s2.xyz:900/images/yEVroCRcAohETvORcoYyjO2yt3V_big.jpg",
    group: '"EN| COMEDY',
  },
  {
    title: "EN| Hello World",
    imageUrl:
      "http://line.megacdn.live:80/images/r6BWky420eJQ0KbtUTlY06ZzFwU_big.jpg",
    group: '"EN| ANIME',
  },
  {
    title: "FR| Hello, My Name Is Doris",
    imageUrl: "http://ip365.cx:900/images/46QADMsrkeqYeGipvskZReB5H8C_big.jpg",
    group: '"FR| FILMS',
  },
  {
    title: "FR| Hello, Dolly!",
    imageUrl:
      "https://image.tmdb.org/t/p/w600_and_h900_bestv2/b7wwVOpa3Hj0SAO0sbrp1CwPiCH.jpg",
    group: '"FR| FILMS',
  },
  {
    title: "AR| Hello Doctor",
    imageUrl:
      "http://line.megacdn.live:80/images/1OrnLB9jS1ae6w8B1zFsNHrNRyO_big.jpg",
    group: '"AR| أفلام عربية',
  },
  {
    title: "IT| Hello, My Name Is Doris",
    imageUrl:
      "https://image.tmdb.org/t/p/w600_and_h900_bestv2/iYRpTDqZgA3rsRh4EIkWHsMjAKd.jpg",
    group: '"IT| COMMEDIA',
  },
  {
    title: "RU| Hello, We Are Your Cover!",
    imageUrl:
      "http://line.megacdn.live:80/images/zfbc7NJbC5cQ6x4VTDgPzB1fSAD_big.jpg",
    group: '"RU| MOVIES',
  },
  {
    title: "BL| Hello Guru Prema Kosame",
    imageUrl:
      "http://line.megacdn.live:80/images/cRbYgwVYt2yA7XXqLPIPrZj8Vnh_big.jpg",
    group: '"IN| BOLLYWOOD',
  },
  {
    title: "AR| Hello Guru Prema Kosame",
    imageUrl: "http://ip365.cx:80/images/5VqWbyN1EmzvqpFNSzGN7sLJRTj_big.jpg",
    group: '"AR| أفلام هندية',
  },
  {
    title: "IN| TELUGU| Hello.. Meera..!",
    imageUrl: "http://124s2.xyz:900/images/2xUheapnQ5E5awCuQfxnbO8kGYW_big.jpg",
    group: '"IN| TELUGU',
  },
  {
    title: "IN| TELUGU| Hello Madam (2021)",
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/I/71yyIvMvI2S._RI_.jpg",
    group: '"IN| TELUGU',
  },
  {
    title: "MY| Oh My English Hello America",
    imageUrl: "https://lo1.in/VOD/Oh.My.English.HELLO.jpg",
    group: '"MY| MALAYSIA',
  },
  {
    title: "MY| Hello Suri",
    imageUrl: "https://lo1.in/VOD/Hello.Suri.jpg",
    group: '"MY| MALAYSIA',
  },
  {
    title: "TH| Namaste Hello, Bye-Bye",
    imageUrl:
      "http://iptv365.xyz:900/images/bKTPhTUNdtHMYOOsolKMefhSQU3_big.jpg",
    group: '"TH| THAILAND',
  },
  {
    title: "ID| Hello June",
    imageUrl: "https://pics.filmaffinity.com/Hello_June-709255976-large.jpg",
    group: '"IN| INDONESIA',
  },
  {
    title: "MY| Hello, Suria",
    imageUrl:
      "https://1.bp.blogspot.com/-umsGL8MyqWU/YCiqNHLATBI/AAAAAAAALIk/-HiTCsNjdO0HDkxoYGbbY4mAag5tTmK1QCLcBGAsYHQ/s16000/Hello%2BSuria.jpg",
    group: '"MY| MALAYSIA',
  },
  {
    title: "KO| Hello Ghost",
    imageUrl: "http://124s2.xyz:900/images/mjjZ0p8wIKaRZHbDFjceWN5Tjtk_big.jpg",
    group: '"KO| KOREA',
  },
  {
    title: "CN| Hello, Mrs. Money",
    imageUrl:
      "http://line.megacdn.live:80/images/lbRsDGAwodppV7teanJr6XYkfgS_big.jpg",
    group: '"CH| CHINA',
  },
  {
    title: "CN| Hello Mr. Billionaire",
    imageUrl:
      "http://line.megacdn.live:80/images/7i1DdPCAcB28NZnyizTBlgfHZNs_big.jpg",
    group: '"CH| CHINA',
  },
];
