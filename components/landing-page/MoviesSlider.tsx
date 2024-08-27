import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import Image from "next/image";

const movieImages = [
  "https://rwxfqslhsyxt7n8g.public.blob.vercel-storage.com/MV5BYjhiZTQzZGYtMjJmZS00YTQ0LTg4NmItZGE2NTcwYmNmMjk4XkEyXkFqcGdeQXVyMTA0MDM3NDg4._V1_-j4k3Oj0ibvPDoV5qyMlPOZD8nOX1jc.jpg",
  "https://rwxfqslhsyxt7n8g.public.blob.vercel-storage.com/MV5BMTIzMDc4MzA2Ml5BMl5BanBnXkFtZTcwODU0MzA3MQ@@._V1_-aWMg7f0l5M5kjx2CSQSGS5wvydETy2.jpg",
  "https://rwxfqslhsyxt7n8g.public.blob.vercel-storage.com/MV5BMjA1Nzk0OTM2OF5BMl5BanBnXkFtZTgwNjU2NjEwMDE@._V1_-Og6NYLhtodIb3NUAOmHpTKn54B3XRb.jpg",
  "https://rwxfqslhsyxt7n8g.public.blob.vercel-storage.com/MV5BMzg2ZGY3MWYtNjkxOS00OGE4LThjZTktMDM2ODQ1OTEwZDIzXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_-QCmDFac6dILNdgh7CqZtyhg6z2lVYA.jpg",
  "https://rwxfqslhsyxt7n8g.public.blob.vercel-storage.com/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_-nczkbGAQV2tLHWRE2ZMDw8SG0ixo3K.jpg",
  "https://rwxfqslhsyxt7n8g.public.blob.vercel-storage.com/MV5BNWU3NDM3YmYtMzJlNy00ZTZkLTk4NGYtMDJlYmM2NWE3NGQ5XkEyXkFqcGdeQXVyMTY2NDk3MTQy._V1_-NisfmnPoTfMM18aNo7Y4l7jyTjnb3n.jpg",
  "https://rwxfqslhsyxt7n8g.public.blob.vercel-storage.com/MV5BNjMzNDBhNGMtYmMxNC00ZTE2LThhYzItNmFjYzQzZTQ2OGQ2XkEyXkFqcGc@._V1_-KOygPbZ4saiTTTSyTn4twbg6RDnMFO.jpg",
  "https://rwxfqslhsyxt7n8g.public.blob.vercel-storage.com/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_-GbZOHhW8lOpp4ZhjIFGe2NXg9EPzDy.jpg",
  "https://rwxfqslhsyxt7n8g.public.blob.vercel-storage.com/MV5BZDkwOTIyZGQtYWNkOS00YzAxLTkwZWUtMzU3YjU4ZDIyYzdlXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_-E9WtE5bMsCcALXuxecrQVQl3YGp8kO.jpg",
  "https://rwxfqslhsyxt7n8g.public.blob.vercel-storage.com/MV5BZjUzYTU0YTAtNTk3NS00ODZiLWJkOWMtMGZjODA1ZTIxZjM5XkEyXkFqcGc@._V1_-Zl5342Pb4XklEWkIJUCvnNtoeIXyuB.jpg",
];

const firstRow = movieImages.slice(0, movieImages.length / 2);
const secondRow = movieImages.slice(movieImages.length / 2);

const MovieCard = ({ img }: { img: string }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-40 cursor-pointer overflow-hidden rounded-xl border sm:w-64",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <Image
        width={200}
        height={300}
        priority
        src={img}
        alt="Movie poster"
        className="h-full w-full object-cover transition-all duration-300 ease-in-out hover:scale-105"
      />
    </figure>
  );
};

export function MoviesSlider() {
  return (
    <div className="relative flex h-[550px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background sm:h-[700px] md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((img, index) => (
          <MovieCard key={`first-${index}`} img={img} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((img, index) => (
          <MovieCard key={`second-${index}`} img={img} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
