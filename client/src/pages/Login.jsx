import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as loginApi } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await loginApi(form);

      login(
        res.data.data.token,
        res.data.data.user
      );

      navigate("/dashboard");
    } catch (err) {
      alert(
        err.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* Left Side */}

      <div className="hidden lg:flex w-1/2 bg-blue-600 text-white flex-col justify-center px-16">

        <h1 className="text-6xl font-bold mb-6">
          ContentHub CMS
        </h1>

        <p className="text-xl mb-10 text-blue-100">
          A modern platform to manage blogs and YouTube videos from one dashboard.
        </p>

        <div className="space-y-6 text-lg">

          <div className="flex items-center gap-3">
            <span className="text-2xl">📝</span>
            <span>Create and manage blogs</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl">🎥</span>
            <span>Publish YouTube videos</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl">📊</span>
            <span>Track all content in one dashboard</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl">🔒</span>
            <span>Secure JWT Authentication</span>
          </div>

        </div>

      </div>

      {/* Right Side */}

      <div className="flex-1 flex items-center justify-center">

        <div className="bg-white shadow-xl rounded-2xl w-[420px] p-10">

          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 mb-8">
            Login to continue
          </p>

          <form
            onSubmit={handleSubmit}
            autoComplete="off"
          >

            <div className="mb-5">

              <label className="block mb-2 text-gray-700 font-medium">
                Email
              </label>

              <input
                type="email"
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

              <label className="block mb-2 text-gray-700 font-medium">
                Password
              </label>

              <input
                type="password"
                autoComplete="new-password"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                placeholder="Enter your password"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition font-semibold"
            >
              {loading ? "Logging In..." : "Login"}
            </button>

          </form>

          <div className="text-center mt-8">

            <p className="text-gray-600">

              Don't have an account?

              <Link
                to="/register"
                className="text-blue-600 font-semibold ml-2"
              >
                Register
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}