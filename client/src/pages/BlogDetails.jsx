import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { getBlogBySlug } from "../services/blogService";

export default function BlogDetails() {

    const { slug } = useParams();

    const [blog, setBlog] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadBlog();

    }, [slug]);

    async function loadBlog() {

        try {

            const res = await getBlogBySlug(slug);

            setBlog(res.data.data);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                <h1 className="text-3xl font-bold">

                    Loading...

                </h1>

            </div>

        );

    }

    if (!blog) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                <h1 className="text-3xl font-bold">

                    Blog Not Found

                </h1>

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-slate-100">

            <div className="max-w-5xl mx-auto py-12 px-6">

                <Link

                    to="/blogs"

                    className="text-blue-600 font-semibold"

                >

                    ← Back to Blogs

                </Link>

                <h1 className="text-5xl font-bold mt-6 mb-4">

                    {blog.title}

                </h1>

                <div className="flex flex-wrap gap-6 text-gray-600 mb-8">

                    <span>

                        👤 {blog.author}

                    </span>

                    <span>

                        📂 {blog.category}

                    </span>

                    <span>

                        👁 {blog.views} Views

                    </span>

                    <span>

                        📅 {new Date(blog.created_at).toLocaleDateString()}

                    </span>

                </div>

                <img
    src={
        blog.thumbnail ||
        "https://placehold.co/1200x600"
    }
    alt={blog.title}
    className="w-full max-h-[450px] object-cover rounded-2xl shadow-lg mb-10"
/>

                                <div className="bg-white rounded-2xl shadow-lg p-10">

    <p className="text-lg leading-9 whitespace-pre-wrap text-gray-800">

        {blog.content}

    </p>

</div>

                <div className="mt-12 flex justify-between items-center border-t pt-8">

                    <div>

                        <h3 className="text-xl font-semibold">

                            Written by

                        </h3>

                        <p className="text-gray-600 mt-1">

                            {blog.author}

                        </p>

                    </div>

                    <Link

                        to="/blogs"

                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"

                    >

                        All Blogs

                    </Link>

                </div>

            </div>

        </div>

    );

}