"use client";
import { useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { countries } from "@/constants/countries";

export default function Component() {
  const [activeCountry, setActiveCountry] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="container mx-auto bg-background p-4 text-foreground">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            CHANNELS LIST
          </CardTitle>
          <CardDescription className="text-center">
            At IPsubTV we can offer you access to up to 16,000 IPTV channels of
            all countries around the world. We want to make sure that you won't
            be disappointed.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Countries</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="search"
              placeholder="Search countries..."
              className="mb-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ScrollArea className="h-[60vh]">
              <div className="space-y-2">
                {filteredCountries.map((country) => (
                  <Button
                    key={country.id}
                    variant={activeCountry === country.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveCountry(country.id)}
                  >
                    {country.name}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Channels</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="mb-4 w-full justify-between">
              Select Channel <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto justify-between py-4"
                >
                  <span>Channel {index + 1}</span>
                  <Globe className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
