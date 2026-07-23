import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getBlogs } from "../services/blogService";

export default function PublicBlogs() {

    const [blogs, setBlogs] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        loadBlogs();

    }, []);

    async function loadBlogs() {

        try {

            const res = await getBlogs();

            setBlogs(res.data.data || []);

        }

        catch (err) {

            console.log(err);

        }

    }

    const filteredBlogs = blogs.filter(blog =>

        blog.title.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <div className="min-h-screen bg-slate-100">

            <div className="max-w-7xl mx-auto px-6 py-16">

                <h1 className="text-5xl font-bold text-slate-900 mb-8">

                    All Blogs

                </h1>

                <input

                    type="text"

                    placeholder="🔍 Search blogs..."

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}

                    className="w-full md:w-1/2 border border-gray-300 rounded-xl px-5 py-3 mb-10 outline-none focus:ring-2 focus:ring-blue-500"

                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {

                        filteredBlogs.length===0 ?

                        (

                            <p className="text-gray-500">

                                No blogs found.

                            </p>

                        )

                        :

                        (

                            filteredBlogs.map(blog=>(

                                <div

                                    key={blog.id}

                                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden"

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

                                        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">

                                            {blog.category}

                                        </span>

                                        <h2 className="text-2xl font-bold mb-4">

                                            {blog.title}

                                        </h2>

                                        <Link

                                            to={`/blogs/${blog.slug}`}

                                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"

                                        >

                                            Read More →

                                        </Link>

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