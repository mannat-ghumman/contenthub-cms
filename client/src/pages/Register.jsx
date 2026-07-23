import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await register(form);

      alert("Registration Successful!");

      navigate("/login");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* Left Panel */}

      <div className="hidden lg:flex w-1/2 bg-blue-600 text-white flex-col justify-center px-16">

        <h1 className="text-6xl font-bold mb-6">
          Join ContentHub
        </h1>

        <p className="text-xl text-blue-100 mb-10">
          Build, manage and publish your blogs and YouTube content
          from one beautiful dashboard.
        </p>

        <div className="space-y-6 text-lg">

          <div className="flex items-center gap-3">
            <span className="text-2xl">🚀</span>
            <span>Modern CMS Dashboard</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl">📝</span>
            <span>Create Blog Posts</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl">🎥</span>
            <span>Manage YouTube Videos</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl">🔒</span>
            <span>Secure JWT Authentication</span>
          </div>

        </div>

      </div>

      {/* Right Panel */}

      <div className="flex-1 flex items-center justify-center">

        <div className="bg-white shadow-xl rounded-2xl w-[440px] p-10">

          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>

          <p className="text-gray-500 mb-8">
            Register to continue
          </p>

          <form
            onSubmit={handleSubmit}
            autoComplete="off"
          >

            {/* Hidden dummy fields help reduce autofill */}
            <input
              type="text"
              name="fake-user"
              autoComplete="username"
              className="hidden"
            />

            <input
              type="password"
              name="fake-password"
              autoComplete="new-password"
              className="hidden"
            />

            <div className="mb-4">

              <label className="block mb-2 font-medium">
                Name
              </label>

              <input
                type="text"
                name="full_name"
                autoComplete="off"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                placeholder="Enter your name"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <div className="mb-4">

              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                name="register_email"
                autoComplete="off"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                placeholder="Enter your email"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <div className="mb-6">

              <label className="block mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                name="register_password"
                autoComplete="new-password"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                placeholder="Create a password"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

          </form>

          <p className="text-center mt-8 text-gray-600">
            Already have an account?

            <Link
              to="/login"
              className="text-blue-600 font-semibold ml-2"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}