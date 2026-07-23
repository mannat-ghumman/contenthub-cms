import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import BlogTable from "../components/BlogTable";

import {
  getBlogs,
  deleteBlog,
} from "../services/blogService";

export default function Blogs() {

  const [blogs, setBlogs] = useState([]);

  const [search, setSearch] = useState("");

  async function loadBlogs(searchText = "") {

    try {

      const res = await getBlogs({
        search: searchText,
      });

      setBlogs(res.data.data);

    }

    catch (err) {

      console.log(err);

    }

  }

  async function removeBlog(id) {

    const confirmDelete = window.confirm(
      "Delete this blog?"
    );

    if (!confirmDelete) return;

    try {

      await deleteBlog(id);

      loadBlogs(search);

    }

    catch (err) {

      alert(
        err.response?.data?.message ||
        "Unable to delete."
      );

    }

  }

  useEffect(() => {

    loadBlogs(search);

  }, [search]);

  return (

    <DashboardLayout>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

        <h1 className="text-4xl font-bold">

          Blogs

        </h1>

        <div className="flex gap-3">

          <input

            type="text"

            placeholder="Search blogs..."

            value={search}

            onChange={(e) => setSearch(e.target.value)}

            className="border rounded-lg px-4 py-3 w-72"

          />

          <Link

            to="/dashboard/blogs/create"

            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"

          >

            + New Blog

          </Link>

        </div>

      </div>

      <BlogTable

        blogs={blogs}

        onDelete={removeBlog}

      />

    </DashboardLayout>

  );

}