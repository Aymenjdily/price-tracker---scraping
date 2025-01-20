"use client";

import Image from "next/image";

import Autoplay from "embla-carousel-autoplay";

import SearchBar from "@/components/searchbar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const Intro = () => {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      src: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      src: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      src: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <section className="py-9">
      <div className="grid gap-16 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-y-3">
          <div className="flex items-center gap-x-2">
            <p className="text-sm text-muted-foreground">
              Smart Shopping Starts Here
            </p>
          </div>
          <h1 className="text-3xl font-bold leading-tight md:text-5xl md:leading-tight">
            Unleash the Power of
            <span className="ml-2.5 text-green-500">a Price Tracker</span>
          </h1>
          <p className="text-justify text-muted-foreground">
            A web application built with Next.js that uses web scraping to
            monitor and track product prices across various platforms. Designed
            to help users stay updated on price changes and find the best deals
            efficiently
          </p>
          <SearchBar />
        </div>
        <Carousel
          plugins={[
            Autoplay({
              delay: 1500,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="gap-5 md:px-16">
            {images.map((image, index) => (
              <CarouselItem key={index} className="relative aspect-square">
                <Image
                  src={image.src}
                  alt={image.src}
                  fill
                  className="rounded-xl object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Intro;
