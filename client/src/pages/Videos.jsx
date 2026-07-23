import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import VideoTable from "../components/VideoTable";

import {
    getVideos,
    deleteVideo
} from "../services/videoService";

export default function Videos() {

    const [videos, setVideos] = useState([]);

    const [search, setSearch] = useState("");

    async function loadVideos() {

        try {

            const res = await getVideos();

            let data = res.data.data;

            if (search.trim() !== "") {

                data = data.filter(video =>
                    video.title
                        .toLowerCase()
                        .includes(search.toLowerCase())
                );

            }

            setVideos(data);

        }

        catch (err) {

            console.log(err);

        }

    }

    async function removeVideo(id) {

        const confirmDelete = window.confirm(
            "Delete this video?"
        );

        if (!confirmDelete) return;

        try {

            await deleteVideo(id);

            loadVideos();

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Unable to delete."

            );

        }

    }

    useEffect(() => {

        loadVideos();

    }, [search]);

    return (

        <DashboardLayout>

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

                <h1 className="text-4xl font-bold">

                    Videos

                </h1>

                <div className="flex gap-3">

                    <input

                        type="text"

                        placeholder="Search videos..."

                        value={search}

                        onChange={(e) =>
                            setSearch(e.target.value)
                        }

                        className="border rounded-lg px-4 py-3 w-72"

                    />

                    <Link

                        to="/dashboard/videos/create"

                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"

                    >

                        + New Video

                    </Link>

                </div>

            </div>

            <VideoTable

                videos={videos}

                onDelete={removeVideo}

            />

        </DashboardLayout>

    );

}