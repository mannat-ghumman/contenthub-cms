import { Link } from "react-router-dom";

export default function VideoTable({ videos, onDelete }) {

    if (!videos || videos.length === 0) {

        return (

            <div className="bg-white rounded-xl shadow-lg p-10 text-center">

                <h2 className="text-2xl font-semibold mb-3">

                    No Videos Found

                </h2>

                <p className="text-gray-500">

                    Add your first YouTube video.

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

                            Actions

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {videos.map((video) => (

                        <tr
                            key={video.id}
                            className="border-t hover:bg-gray-50 transition"
                        >

                            <td className="p-4">

                                <img

                                    src={video.thumbnail}

                                    alt={video.title}

                                    className="w-24 h-14 rounded object-cover"

                                />

                            </td>

                            <td className="p-4 font-medium">

                                {video.title}

                            </td>

                            <td className="text-center">

                                {video.category}

                            </td>

                            <td className="text-center">

                                <Link

                                    to={`/dashboard/videos/edit/${video.id}`}

                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2"

                                >

                                    Edit

                                </Link>

                                <button

                                    onClick={() => onDelete(video.id)}

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