"use client";

import { useMovieDetails } from "@/hooks/useMovieDetails";
import { useEffect } from "react";
import Portal from "../Portal";
import NotFound from "@/assets/images/not-image.jpg";
import { Heart, X } from "lucide-react";
import StarIcon from '@/assets/icons/star.svg'
import Image from "next/image";
import { useFavourites } from "@/providers/FavouritesProvider";

interface Props {
  movieId: string | null;
  onClose: () => void;
}

export default function MovieModal({ movieId, onClose }: Props) {
  const { data, isLoading } = useMovieDetails(movieId || undefined);
  const { toggleFavourite, isFavourite } = useFavourites();

  const fav = data?.id ? isFavourite(data.id) : false;

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    console.log(data?.image)
  }, [data])

  if (!movieId) return null;

  return (
    <Portal>
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
        onClick={onClose}
      >
        <div
          className="bg-[#1c1c1c] rounded-2xl w-full max-w-5xl p-4 md:p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 md:top-4 md:right-4 z-50 
             bg-black/60 hover:bg-black/80 
             rounded-full p-2 
             backdrop-blur-md transition"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          {isLoading ? (
            <div className="text-white">Loading...</div>
          ) : (
            <div className="flex flex-col md:grid md:grid-cols-[380px_1fr] gap-6 md:gap-8">

              <div className="w-full h-80 md:h-130">
                <img
                  src={data?.image || NotFound.src}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              <div className="flex flex-col justify-center text-white relative">

                <div className="flex flex-col mb-3">

                  <div className="flex items-start justify-between gap-5 mb-3">
                    <h2 className="text-xl md:text-3xl font-semibold leading-tight">
                      {data?.title}
                    </h2>

                    <div className="flex items-center gap-2 text-white font-medium whitespace-nowrap">
                      <Image
                        src={StarIcon}
                        alt="rating"
                      />

                      <span className="text-white font-semibold">
                        {data?.rating != null ? data.rating : "—"}
                      </span>

                      <span className="text-white text-sm">/10</span>
                    </div>
                  </div>

                  <div className="text-sm text-white flex flex-wrap gap-8.75 mb-5.25">
                    {data?.year && <span>{data.year}</span>}

                    {data?.genres?.[0] && <span>{data.genres[0]}</span>}

                    {data?.runtime && (
                      <span>
                        {Math.floor(data.runtime / 3600)}h{" "}
                        {Math.floor((data.runtime % 3600) / 60)}m
                      </span>
                    )}
                  </div>

                  <p className="text-white text-sm md:text-base leading-relaxed max-w-xl mb-6.5">
                    {data?.plot}
                  </p>
                </div>

                <div className="flex gap-3 mt-6">
                  <button className="bg-[#6100C2] px-5 py-2.5 rounded-lg font-medium transition">
                    Watch now
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavourite(data?.id);
                    }}
                    className={`
                      flex items-center justify-center
                      w-13.5 h-13.5
                      rounded-[14px]
                      p-3.75
                      backdrop-blur-[20px]
                      transition-all duration-300

                      bg-[linear-gradient(98.85deg,#FFFFFF_3.36%,rgba(255,255,255,0)_238.16%)]

                      hover:scale-105
                    `}
                  >
                    <Heart
                      className={`
                            w-5 h-5 transition-all
                            ${fav
                          ? "text-[#6100C2] fill-[#6100C2]"
                          : "text-[#6100C2]"
                        }
                      `}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Portal>
  );
}