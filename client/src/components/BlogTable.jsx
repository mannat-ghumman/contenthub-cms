import { Link } from "react-router-dom";

export default function BlogTable({ blogs, onDelete }) {

    if (!blogs || blogs.length === 0) {

        return (

            <div className="bg-white rounded-xl shadow-lg p-10 text-center">

                <h2 className="text-2xl font-semibold mb-3">

                    No Blogs Found

                </h2>

                <p className="text-gray-500">

                    Create your first blog to get started.

                </p>

            </div>

        );

    }

    return (

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

            <table className="w-full">

                <thead className="bg-slate-100">

                    <tr>

                        <th className="p-4 text-left">

                            Thumbnail

                        </th>

                        <th className="p-4 text-left">

                            Title

                        </th>

                        <th className="p-4 text-center">

                            Category

                        </th>

                        <th className="p-4 text-center">

                            Status

                        </th>

                        <th className="p-4 text-center">

                            Actions

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {blogs.map((blog) => (

                        <tr

                            key={blog.id}

                            className="border-t hover:bg-gray-50 transition"

                        >

                            <td className="p-4">

                                <img

                                    src={

                                        blog.thumbnail ||

                                        "https://placehold.co/100x60"

                                    }

                                    alt={blog.title}

                                    className="w-24 h-14 object-cover rounded"

                                />

                            </td>

                            <td className="p-4 font-medium">

                                {blog.title}

                            </td>

                            <td className="text-center">

                                {blog.category}

                            </td>

                            <td className="text-center">

                                <span

                                    className={`px-3 py-1 rounded-full text-sm font-medium ${

                                        blog.status === "published"

                                            ? "bg-green-100 text-green-700"

                                            : "bg-yellow-100 text-yellow-700"

                                    }`}

                                >

                                    {blog.status}

                                </span>

                            </td>

                            <td className="text-center">

                                <Link

                                    to={`/dashboard/blogs/edit/${blog.id}`}

                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2"

                                >

                                    Edit

                                </Link>

                                <button

                                    onClick={() => onDelete(blog.id)}

                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"

                                >

                                    Delete

                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}