import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {

    const { user, logout } = useAuth();

    return (

        <nav className="bg-white shadow-md sticky top-0 z-50">

            <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

                <Link
                    to="/"
                    className="text-3xl font-extrabold text-blue-600"
                >
                    ContentHub
                </Link>

                <div className="flex items-center gap-8">

                    <Link
                        to="/"
                        className="hover:text-blue-600 transition"
                    >
                        Home
                    </Link>

                    <Link
                        to="/blogs"
                        className="hover:text-blue-600 transition"
                    >
                        Blogs
                    </Link>

                    <Link
                        to="/videos"
                        className="hover:text-blue-600 transition"
                    >
                        Videos
                    </Link>

                    {user ? (

                        <>
                            <Link
                                to="/dashboard"
                                className="hover:text-blue-600 transition"
                            >
                                Dashboard
                            </Link>

                            <button
                                onClick={logout}
                                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
                            >
                                Logout
                            </button>
                        </>

                    ) : (

                        <>
                            <Link
                                to="/login"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-5 py-2 rounded-lg transition"
                            >
                                Register
                            </Link>
                        </>

                    )}

                </div>

            </div>

        </nav>

    );

}