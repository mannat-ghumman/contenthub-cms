import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import Blogs from "./pages/Blogs";
import CreateEditBlog from "./pages/CreateEditBlog";

import Videos from "./pages/Videos";
import CreateEditVideo from "./pages/CreateEditVideo";

import Categories from "./pages/Categories";

import BlogDetails from "./pages/BlogDetails";
import PublicBlogs from "./pages/PublicBlogs";
import PublicVideos from "./pages/PublicVideos";

function AppContent() {

    const location = useLocation();

    const isDashboard = location.pathname.startsWith("/dashboard");

    return (

        <>

            {!isDashboard && <Navbar />}

            <Routes>

                {/* ================= PUBLIC ROUTES ================= */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/blogs"
                    element={<PublicBlogs />}
                />

                <Route
                    path="/blogs/:slug"
                    element={<BlogDetails />}
                />

                <Route
                    path="/videos"
                    element={<PublicVideos />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* ================= DASHBOARD ================= */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Blogs */}

                <Route
                    path="/dashboard/blogs"
                    element={
                        <ProtectedRoute>
                            <Blogs />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard/blogs/create"
                    element={
                        <ProtectedRoute>
                            <CreateEditBlog />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard/blogs/edit/:id"
                    element={
                        <ProtectedRoute>
                            <CreateEditBlog />
                        </ProtectedRoute>
                    }
                />

                {/* Videos */}

                <Route
                    path="/dashboard/videos"
                    element={
                        <ProtectedRoute>
                            <Videos />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard/videos/create"
                    element={
                        <ProtectedRoute>
                            <CreateEditVideo />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard/videos/edit/:id"
                    element={
                        <ProtectedRoute>
                            <CreateEditVideo />
                        </ProtectedRoute>
                    }
                />

                {/* Categories */}

                <Route
                    path="/dashboard/categories"
                    element={
                        <ProtectedRoute>
                            <Categories />
                        </ProtectedRoute>
                    }
                />

                {/* ================= 404 ================= */}

                <Route
                    path="*"
                    element={
                        <div className="min-h-screen flex items-center justify-center">
                            <h1 className="text-5xl font-bold">
                                404 - Page Not Found
                            </h1>
                        </div>
                    }
                />

            </Routes>

        </>

    );

}

export default function App() {

    return (

        <BrowserRouter>

            <AppContent />

        </BrowserRouter>

    );

}