import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DashboardLayout({ children }) {

    const location = useLocation();
    const navigate = useNavigate();

    const { logout } = useAuth();

    function handleLogout() {

        logout();

        navigate("/login");

    }

    const menu = [

        {
            name: "Dashboard",
            path: "/dashboard",
            icon: "📊"
        },

        {
            name: "Blogs",
            path: "/dashboard/blogs",
            icon: "📝"
        },

        {
            name: "Videos",
            path: "/dashboard/videos",
            icon: "🎥"
        },

        {
            name: "Categories",
            path: "/dashboard/categories",
            icon: "📂"
        }

    ];

    return (

        <div className="flex min-h-screen bg-slate-100">

            {/* Sidebar */}

            <aside className="w-72 bg-slate-900 text-white flex flex-col">

                <Link
                    to="/"
                    className="text-center py-10 border-b border-slate-700"
                >

                    <h1 className="text-5xl font-bold text-blue-500">

                        ContentHub

                    </h1>

                </Link>

                <nav className="flex-1 mt-6">

                    {

                        menu.map(item => (

                            <Link

                                key={item.path}

                                to={item.path}

                                className={`flex items-center gap-3 px-8 py-5 text-xl transition ${
    item.path === "/dashboard"
        ? location.pathname === "/dashboard"
            ? "bg-blue-600"
            : "hover:bg-slate-800"
        : location.pathname.startsWith(item.path)
            ? "bg-blue-600"
            : "hover:bg-slate-800"
}`}
                            >

                                <span>

                                    {item.icon}

                                </span>

                                {item.name}

                            </Link>

                        ))

                    }

                </nav>

                <div className="p-6 space-y-4">

                    <Link
    to="/"
    className="block w-full text-center bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold"
>
    🏠 Home
</Link>

                    <button

                        onClick={handleLogout}

                        className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold"

                    >

                        Logout

                    </button>

                </div>

            </aside>

            {/* Main */}

            <main className="flex-1">

                <header className="bg-white shadow px-10 py-8 flex justify-between items-center">

                    <div>

                        <h1 className="text-5xl font-bold">

                            Dashboard

                        </h1>

                        <p className="text-gray-500 mt-2">

                            Manage your content

                        </p>

                    </div>

                    <Link
    to="/"
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
>
    🏠 Home
</Link>

                </header>

                <div className="p-10">

                    {children}

                </div>

            </main>

        </div>

    );

}