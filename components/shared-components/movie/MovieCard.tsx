import Image from "next/image";
import { Heart } from "lucide-react";
import { useFavourites } from "@/providers/FavouritesProvider";

interface MovieCardProps {
  id: string;
  title: string;
  image: string;
  year: string;
  genre: string;
}

export default function MovieCard({
  id,
  title,
  image,
  year,
  genre,
}: MovieCardProps) {
  const { toggleFavourite, isFavourite } = useFavourites();

  const fav = isFavourite(id);

  return (
    <div className="min-w-55 rounded-2xl overflow-hidden relative group/card cursor-pointer">

      <Image
        src={image}
        alt={title}
        width={220}
        height={300}
        className="object-cover h-75 w-full transition-transform duration-300 group-hover/card:scale-105"
      />

      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavourite(id);
        }}
        className="absolute top-3 right-3 bg-white/70 p-2 rounded-full"
      >
        <Heart
          className={`w-4 h-4 ${
            fav ? "text-red-500 fill-red-500" : "text-gray-800"
          }`}
        />
      </button>

      <div 
        className="absolute bottom-0 left-0 right-0 h-21.5 px-4 py-3
          bg-white/65 backdrop-blur-[10px] text-black rounded-b-[20px]">
        <h3 className="text-sm font-semibold truncate">{title}</h3>
        <p className="text-xs">
          {year} | {genre}
        </p>
      </div>
    </div>
  );
}