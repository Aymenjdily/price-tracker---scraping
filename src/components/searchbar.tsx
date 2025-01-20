"use client";

import { FormEvent, useState } from "react";

import { Loader, Search } from "lucide-react";

import { ScrapeAndStoreProduct } from "@/actions";
import { useToast } from "@/hooks/use-toast";

import { Button } from "./ui/button";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const ValidProductLink = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;

      if (
        hostname.includes("amazon.com") ||
        hostname.includes("amazon.") ||
        hostname.includes("amazon")
      )
        return true;

      return false;
    } catch (error) {
      console.log("Check Validation Link Error:", error);
      return false;
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = ValidProductLink(searchValue);

    if (!isValidLink) {
      toast({
        title: "Please provide a valid amazon product link",
        variant: "destructive",
      });
    }

    try {
      setIsLoading(true);

      const product = await ScrapeAndStoreProduct(searchValue);
    } catch (error) {
      console.log("Scrapping amazon product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      <input
        type="text"
        placeholder="Enter product link"
        className="w-full border-2 border-input py-1 pl-2 outline-none"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Button disabled={searchValue === ""} type="submit">
        {isLoading ? <Loader className="animate-spin" /> : <Search />}
        {isLoading ? "Searching..." : "Search"}
      </Button>
    </form>
  );
};

export default SearchBar;
