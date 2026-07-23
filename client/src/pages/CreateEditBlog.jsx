import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  createBlog,
  updateBlog,
  getBlogById,
} from "../services/blogService";

import { getCategories } from "../services/categoryService";

export default function CreateEditBlog() {
  const navigate = useNavigate();

  const { id } = useParams();

  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    title: "",
    thumbnail: "",
    category_id: "",
    status: "draft",
    content: "",
  });

  useEffect(() => {
    loadCategories();

    if (isEdit) {
      loadBlog();
    }
  }, []);

  async function loadCategories() {
    try {
      const res = await getCategories();

      // Your updated backend returns { success, message, data }
      setCategories(res.data.data);
    } catch (err) {
      console.log(err);
      setCategories([]);
    }
  }

  async function loadBlog() {
    try {
      const res = await getBlogById(id);

      const blog = res.data.data;

      setForm({
        title: blog.title || "",
        thumbnail: blog.thumbnail || "",
        category_id: blog.category_id || "",
        status: blog.status || "draft",
        content: blog.content || "",
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...form,
        category_id: Number(form.category_id),
      };

      if (isEdit) {
        await updateBlog(id, payload);
        alert("Blog updated successfully");
      } else {
        await createBlog(payload);
        alert("Blog created successfully");
      }

      navigate("/dashboard/blogs");
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">

        <div className="bg-white shadow-lg rounded-xl p-8">

          <h1 className="text-3xl font-bold mb-8">
            {isEdit ? "Edit Blog" : "Create Blog"}
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Title */}

            <div>
              <label className="block font-semibold mb-2">
                Blog Title
              </label>

              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                className="w-full border rounded-lg px-4 py-3"
                placeholder="Enter blog title"
                required
              />
            </div>

            {/* Thumbnail */}

            <div>
              <label className="block font-semibold mb-2">
                Thumbnail URL
              </label>

              <input
                type="text"
                value={form.thumbnail}
                onChange={(e) =>
                  setForm({
                    ...form,
                    thumbnail: e.target.value,
                  })
                }
                className="w-full border rounded-lg px-4 py-3"
                placeholder="https://picsum.photos/500"
              />
            </div>

            {/* Category */}

            <div>
              <label className="block font-semibold mb-2">
                Category
              </label>

              <select
                value={form.category_id}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category_id: e.target.value,
                  })
                }
                className="w-full border rounded-lg px-4 py-3"
                required
              >
                <option value="">
                  Select Category
                </option>

                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}

            <div>
              <label className="block font-semibold mb-2">
                Status
              </label>

              <select
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value,
                  })
                }
                className="w-full border rounded-lg px-4 py-3"
              >
                <option value="draft">
                  Draft
                </option>

                <option value="published">
                  Published
                </option>
              </select>
            </div>

            {/* Content */}

            <div>
              <label className="block font-semibold mb-2">
                Blog Content
              </label>

              <textarea
                rows={12}
                value={form.content}
                onChange={(e) =>
                  setForm({
                    ...form,
                    content: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-4 resize-none"
                placeholder="Write your blog here..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
            >
              {loading
                ? "Saving..."
                : isEdit
                ? "Update Blog"
                : "Publish Blog"}
            </button>

          </form>

        </div>

      </div>
    </DashboardLayout>
  );
}