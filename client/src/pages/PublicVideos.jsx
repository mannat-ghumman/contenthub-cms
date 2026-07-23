import { useEffect, useState } from "react";

import { getVideos } from "../services/videoService";

export default function PublicVideos() {

    const [videos, setVideos] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadVideos();

    }, []);

    async function loadVideos() {

        try {

            const res = await getVideos();

            setVideos(res.data.data || []);

        }

        catch (err) {

            console.log(err);

        }

    }

    const filteredVideos = videos.filter(video =>

        video.title.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <div className="min-h-screen bg-slate-100">

            <div className="max-w-7xl mx-auto px-6 py-16">

                <h1 className="text-5xl font-bold text-slate-900 mb-8">

                    All Videos

                </h1>

                <input

                    type="text"

                    placeholder="🔍 Search videos..."

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}

                    className="w-full md:w-1/2 border border-gray-300 rounded-xl px-5 py-3 mb-10 outline-none focus:ring-2 focus:ring-blue-500"

                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {

                        filteredVideos.length===0 ?

                        (

                            <p className="text-gray-500">

                                No videos found.

                            </p>

                        )

                        :

                        (

                            filteredVideos.map(video=>(

                                <div

                                    key={video.id}

                                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden"

                                >

                                    <img

                                        src={video.thumbnail}

                                        alt={video.title}

                                        className="w-full h-52 object-cover"

                                    />

                                    <div className="p-6">

                                        <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">

                                            {video.category}

                                        </span>

                                        <h2 className="text-2xl font-bold mb-4">

                                            {video.title}

                                        </h2>

                                        <a

                                            href={video.youtube_url}

                                            target="_blank"

                                            rel="noreferrer"

                                            className="inline-block bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"

                                        >

                                            Watch Video →

                                        </a>

                                    </div>

                                </div>

                            ))

                        )

                    }

                </div>

            </div>

        </div>

    );

}