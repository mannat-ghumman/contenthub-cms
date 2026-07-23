import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getBlogs } from "../services/blogService";
import { getVideos } from "../services/videoService";

export default function Home() {

    const [blogs, setBlogs] = useState([]);
    const [videos, setVideos] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {

        try {

            const blogRes = await getBlogs();
            const videoRes = await getVideos();

            setBlogs(blogRes.data.data || []);
            setVideos(videoRes.data.data || []);

        } catch (err) {

            console.log(err);

        }

    }

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(search.toLowerCase())
    );

    const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="min-h-screen bg-slate-100">

            {/* Hero */}

            <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white py-20">

                <div className="max-w-7xl mx-auto px-6 text-center">

                    <h1 className="text-6xl font-extrabold mb-6">

                        ContentHub CMS

                    </h1>

                    <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">

                        A modern platform to publish blogs, organize videos,
                        manage categories and share knowledge effortlessly.

                    </p>

                    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-3">

                        <input

                            type="text"

                            value={search}

                            onChange={(e) => setSearch(e.target.value)}

                            placeholder="🔍 Search blogs and videos..."

                            className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-500 text-lg px-4 py-2"

                        />

                    </div>

                </div>

            </section>

            {/* Latest Blogs */}

            <section className="max-w-7xl mx-auto px-6 py-16">

                <h2 className="text-4xl font-bold text-slate-900 mb-10">

                    Latest Blogs

                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {

                        filteredBlogs.length === 0 ?

                            (

                                <p className="text-gray-500">

                                    No blogs found.

                                </p>

                            )

                            :

                            (

                                filteredBlogs.map(blog => (

                                    <div

                                        key={blog.id}

                                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"

                                    >

                                        <img

                                            src={

                                                blog.thumbnail ||

                                                "https://placehold.co/600x350"

                                            }

                                            alt={blog.title}

                                            className="w-full h-52 object-cover"

                                        />

                                        <div className="p-6">

                                            <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">

                                                {blog.category}

                                            </span>

                                            <h3 className="text-2xl font-bold text-slate-900 mt-4 mb-4">

                                                {blog.title}

                                            </h3>

                                            <Link

                                                to={`/blogs/${blog.slug}`}

                                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"

                                            >

                                                Read More →

                                            </Link>

                                        </div>

                                    </div>

                                ))

                            )

                    }

                </div>

            </section>

            {/* Latest Videos */}

            <section className="max-w-7xl mx-auto px-6 pb-20">

                <h2 className="text-4xl font-bold text-slate-900 mb-10">

                    Latest Videos

                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {

                        filteredVideos.length === 0 ?

                            (

                                <p className="text-gray-500">

                                    No videos found.

                                </p>

                            )

                            :

                            (

                                filteredVideos.map(video => (

                                    <div

                                        key={video.id}

                                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"

                                    >

                                        <img

                                            src={video.thumbnail}

                                            alt={video.title}

                                            className="w-full h-52 object-cover"

                                        />

                                        <div className="p-6">

                                            <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">

                                                {video.category}

                                            </span>

                                            <h3 className="text-2xl font-bold text-slate-900 mt-4 mb-4">

                                                {video.title}

                                            </h3>

                                            <a

                                                href={video.youtube_url}

                                                target="_blank"

                                                rel="noreferrer"

                                                className="inline-block bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"

                                            >

                                                Watch Video →

                                            </a>

                                        </div>

                                    </div>

                                ))

                            )

                    }

                </div>

            </section>

        </div>

    );

}