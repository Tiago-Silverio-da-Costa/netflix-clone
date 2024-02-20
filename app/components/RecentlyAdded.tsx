import prisma from "../utils/db"
import Image from "next/image"
import { MovieCard } from "./MovieCard"

async function getData() {
  const data = await prisma.movie.findMany({
    select: {
      id: true,
      overview: true,
      title: true,
      WatchLits: true,
      imageString: true,
      youtubeString: true,
      age: true,
      release: true,
      duration: true
    },
    orderBy: {
      createdAt: "desc"
    },
    take: 4,
  })

  return data
}

export default async function RecentlyAdded() {
  const data = await getData()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-6">
      {data.map((movie) => (
        <div key={movie.id} className="relative h-48">
          <Image
            src={movie.imageString}
            alt="Movie"
            width={500}
            height={500}
            className="rounded-sm absolute w-full h-full object-cover" />
          <div className="h-60 relative z-10 w-full transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
            <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex justify-center items-center border">
              <Image
                src={movie.imageString}
                alt="Movie"
                width={800}
                height={800}
                className="absolute w-full h-full -z-10 rounded-lg object-cover" />
              <MovieCard
                movieId={movie.id}
                overview={movie.overview}
                title={movie.title}
                watchListId={movie.WatchLits[0]?.id}
                youtbeUrl={movie.youtubeString}
                watchList={movie.WatchLits.length > 0 ? true : false}
                key={movie.id}
                age={movie.age}
                time={movie.duration}
                year={movie.release}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}