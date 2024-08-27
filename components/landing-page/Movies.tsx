"use client";
import { InView } from "@/components/core/in-view";
import { motion } from "framer-motion";

function Movies() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-center text-4xl font-bold">
          Explore the latest movies and TV shows
        </h1>
        <p className="text-center">
          Experience the best of video on demand with our IPTV VOD library.
          Watch your favorite movies, TV shows, and documentaries, anytime,
          anywhere, from multiple platforms like prime, hbo, netflix, hulo,
          disney, sling tv, apple tv and more. With a vast collection of titles
          updated regularly, you'll never run out of things to watch. So sit
          back, relax, and enjoy the ultimate viewing experience with IPTV VOD.
        </p>
      </div>
      <div className="flex items-center justify-center">
        <InView
          viewOptions={{ once: true, margin: "0px 0px -250px 0px" }}
          variants={{
            hidden: {
              opacity: 0,
            },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.09,
              },
            },
          }}
        >
          <div className="columns-2 gap-4 px-8 sm:columns-3 md:columns-4">
            {[
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
            ].map((imgSrc, index) => {
              return (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)",
                    },
                  }}
                  key={index}
                  className="mb-4"
                >
                  <img
                    src={imgSrc}
                    alt={`Image placeholder from cosmos.so, index:${index}`}
                    className="w-full rounded-lg object-cover transition-all duration-300 ease-in-out hover:scale-105"
                  />
                </motion.div>
              );
            })}
          </div>
        </InView>
      </div>
    </div>
  );
}

export default Movies;
