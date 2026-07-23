import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import CategoryTable from "../components/CategoryTable";

import {

    getCategories,

    createCategory,

    updateCategory,

    deleteCategory

} from "../services/categoryService";

export default function Categories() {

    const [categories, setCategories] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [editing, setEditing] = useState(null);

    const [form, setForm] = useState({

        name: "",

        type: "both"

    });

    useEffect(() => {

        loadCategories();

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

    function openCreate() {

        setEditing(null);

        setForm({

            name: "",

            type: "both"

        });

        setShowModal(true);

    }

    function openEdit(category) {

        setEditing(category);

        setForm({

            name: category.name,

            type: category.type

        });

        setShowModal(true);

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            if (editing) {

                await updateCategory(

                    editing.id,

                    form

                );

            }

            else {

                await createCategory(form);

            }

            setShowModal(false);

            loadCategories();

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Something went wrong."

            );

        }

    }

    async function handleDelete(id) {

        const ok = window.confirm(

            "Delete this category?"

        );

        if (!ok) return;

        try {

            await deleteCategory(id);

            loadCategories();

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Unable to delete."

            );

        }

    }

        return (

        <DashboardLayout>

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl font-bold">

                    Categories

                </h1>

                <button

                    onClick={openCreate}

                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"

                >

                    + Add Category

                </button>

            </div>

            <CategoryTable

                categories={categories}

                onEdit={openEdit}

                onDelete={handleDelete}

            />

            {

                showModal && (

                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">

                            <h2 className="text-2xl font-bold mb-6">

                                {

                                    editing

                                        ? "Edit Category"

                                        : "Add Category"

                                }

                            </h2>

                            <form

                                onSubmit={handleSubmit}

                                className="space-y-5"

                            >

                                <div>

                                    <label className="block mb-2 font-medium">

                                        Name

                                    </label>

                                    <input

                                        type="text"

                                        value={form.name}

                                        onChange={(e)=>

                                            setForm({

                                                ...form,

                                                name:e.target.value

                                            })

                                        }

                                        className="w-full border rounded-lg px-4 py-3"

                                        required

                                    />

                                </div>

                                <div>

                                    <label className="block mb-2 font-medium">

                                        Type

                                    </label>

                                    <select

                                        value={form.type}

                                        onChange={(e)=>

                                            setForm({

                                                ...form,

                                                type:e.target.value

                                            })

                                        }

                                        className="w-full border rounded-lg px-4 py-3"

                                    >

                                        <option value="blog">

                                            Blog

                                        </option>

                                        <option value="video">

                                            Video

                                        </option>

                                        <option value="both">

                                            Both

                                        </option>

                                    </select>

                                </div>

                                <div className="flex justify-end gap-3 pt-4">

                                    <button

                                        type="button"

                                        onClick={()=>

                                            setShowModal(false)

                                        }

                                        className="px-5 py-2 rounded-lg border"

                                    >

                                        Cancel

                                    </button>

                                    <button

                                        type="submit"

                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"

                                    >

                                        {

                                            editing

                                                ? "Update"

                                                : "Create"

                                        }

                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                )

            }

        </DashboardLayout>

    );

}