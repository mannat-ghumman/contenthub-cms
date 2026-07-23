import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import {
    createVideo,
    updateVideo,
    getVideo
} from "../services/videoService";

import {
    getCategories
} from "../services/categoryService";

export default function CreateEditVideo() {

    const navigate = useNavigate();

    const { id } = useParams();

    const isEdit = Boolean(id);

    const [loading, setLoading] = useState(false);

    const [categories, setCategories] = useState([]);

    const [form, setForm] = useState({

        title: "",

        youtube_url: "",

        description: "",

        category_id: ""

    });

    useEffect(() => {

        loadCategories();

        if (isEdit) {

            loadVideo();

        }

    }, []);

    async function loadCategories() {

        try {

            const res = await getCategories();

            setCategories(res.data.data);

        }

        catch (err) {

            console.log(err);

        }

    }

    async function loadVideo() {

        try {

            const res = await getVideo(id);

            const video = res.data.data;

            setForm({

                title: video.title,

                youtube_url: video.youtube_url,

                description: video.description,

                category_id: video.category_id

            });

        }

        catch (err) {

            console.log(err);

        }

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            setLoading(true);

            const payload = {

                ...form,

                category_id: Number(form.category_id)

            };

            if (isEdit) {

                await updateVideo(id, payload);

            }

            else {

                await createVideo(payload);

            }

            alert(

                isEdit

                    ? "Video Updated Successfully"

                    : "Video Created Successfully"

            );

            navigate("/dashboard/videos");

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Something went wrong."

            );

        }

        finally {

            setLoading(false);

        }

    }

        return (

        <DashboardLayout>

            <div className="max-w-5xl mx-auto">

                <div className="bg-white rounded-xl shadow-lg p-8">

                    <h1 className="text-3xl font-bold mb-8">

                        {

                            isEdit

                                ? "Edit Video"

                                : "Create Video"

                        }

                    </h1>

                    <form

                        onSubmit={handleSubmit}

                        className="space-y-6"

                    >

                        <div>

                            <label className="block font-semibold mb-2">

                                Video Title

                            </label>

                            <input

                                type="text"

                                value={form.title}

                                onChange={(e)=>

                                    setForm({

                                        ...form,

                                        title:e.target.value

                                    })

                                }

                                className="w-full border rounded-lg px-4 py-3"

                                placeholder="Enter video title"

                                required

                            />

                        </div>

                        <div>

                            <label className="block font-semibold mb-2">

                                YouTube URL

                            </label>

                            <input

                                type="text"

                                value={form.youtube_url}

                                onChange={(e)=>

                                    setForm({

                                        ...form,

                                        youtube_url:e.target.value

                                    })

                                }

                                className="w-full border rounded-lg px-4 py-3"

                                placeholder="https://www.youtube.com/watch?v=..."

                                required

                            />

                        </div>

                        <div>

                            <label className="block font-semibold mb-2">

                                Category

                            </label>

                            <select

                                value={form.category_id}

                                onChange={(e)=>

                                    setForm({

                                        ...form,

                                        category_id:e.target.value

                                    })

                                }

                                className="w-full border rounded-lg px-4 py-3"

                                required

                            >

                                <option value="">

                                    Select Category

                                </option>

                                {

                                    categories.map(category=>(

                                        <option

                                            key={category.id}

                                            value={category.id}

                                        >

                                            {category.name}

                                        </option>

                                    ))

                                }

                            </select>

                        </div>

                        <div>

                            <label className="block font-semibold mb-2">

                                Description

                            </label>

                            <textarea

                                rows={8}

                                value={form.description}

                                onChange={(e)=>

                                    setForm({

                                        ...form,

                                        description:e.target.value

                                    })

                                }

                                className="w-full border rounded-lg p-4"

                                placeholder="Write video description..."

                            />

                        </div>

                        <button

                            type="submit"

                            disabled={loading}

                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"

                        >

                            {

                                loading

                                    ? "Saving..."

                                    : isEdit

                                        ? "Update Video"

                                        : "Create Video"

                            }

                        </button>

                    </form>

                </div>

            </div>

        </DashboardLayout>

    );

}