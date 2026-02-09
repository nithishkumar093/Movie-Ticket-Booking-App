import React, { useState } from "react";
import { dummyTrailers } from "../assets/assets";
import ReactPlayer from "react-player";
import BlurCircle from "./BlurCircle";
import { PlayCircleIcon } from "lucide-react"


const TrailerSection = () => {
    const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0])

    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden">
            <p className="text-gray-300 font-medium text-lg max-w-[960px]">Trailers</p>

            <div className="mt-6 max-w-[960px] mx-auto rounded-xl border border-white/10 shadow-2xl">
                <iframe
                    width="100%"
                    height="540"
                    src={`https://www.youtube.com/embed/${currentTrailer.videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>



            <div className="group grid grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto">
                {
                    dummyTrailers.map((trailer) => (
                        <div
                            key={trailer.image}
                            className={`relative group-hover:opacity-50 hover:!opacity-100 hover:-translate-y-1 duration-300 transition max-md:h-60 md:max-h-60 cursor-pointer rounded-lg overflow-hidden ${currentTrailer.videoUrl === trailer.videoUrl ? 'ring-2 ring-primary ring-offset-4 ring-offset-black opacity-100' : 'opacity-80'}`}
                            onClick={() => setCurrentTrailer(trailer)}
                        >
                            <img src={trailer.image} className="w-full h-full object-cover brightness-75" />
                            <PlayCircleIcon strokeWidth={1.6} className={`absolute top-1/2 left-1/2 w-5 md:w-8 h-5 md:h-12 transform -translate-x-1/2 -translate-y-1/2 ${currentTrailer.videoUrl === trailer.videoUrl ? 'text-primary scale-110' : 'text-white'}`} />
                        </div>
                    ))
                }

            </div>
        </div>
    )
}
export default TrailerSection
