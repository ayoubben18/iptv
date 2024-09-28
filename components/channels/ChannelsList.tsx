"use client";
import { getChannelsData } from "@/external-server-calls/channels-data";
import { SearchResult, SearchType } from "@/types/search.types";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { useI18n } from "@/locales/client";

function ChannelsList() {
  const [search] = useQueryState("search", {
    defaultValue: "",
  });
  const [typeSearch] = useQueryState<SearchType>("type_search", {
    defaultValue: SearchType.LIVE,
    parse: (value) => value as SearchType,
  });
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading } = useQuery({
    queryKey: ["search", debouncedSearch, typeSearch],
    queryFn: () =>
      getChannelsData(
        debouncedSearch?.length > 3 ? debouncedSearch : "bein",
        typeSearch,
      ),
  });
  const t = useI18n();

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
            data.map((card, index) => (
              <CardItem key={index} {...card} locale={t("available")} />
            ))}
        </div>
      )}
    </div>
  );
}

export default ChannelsList;

const CardItem = ({
  title,
  group,
  locale,
}: SearchResult & { locale: string }) => {
  return (
    <Card className="flex flex-col justify-between transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="p-4">
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{group}</p>
      </CardContent>
      <CardFooter className="flex items-center p-4 pt-0">
        <Badge variant="secondary" className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full bg-green-500"
            aria-hidden="true"
          ></span>
          <span>{locale}</span>
        </Badge>
      </CardFooter>
    </Card>
  );
};
