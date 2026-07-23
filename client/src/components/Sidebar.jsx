import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const links = [
  {
    name: "📊 Dashboard",
    path: "/dashboard",
  },
  {
    name: "📝 Blogs",
    path: "/dashboard/blogs",
  },
  {
    name: "🎥 Videos",
    path: "/dashboard/videos",
  },
  {
    name: "📂 Categories",
    path: "/dashboard/categories",
  },
];

  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white flex flex-col">

      <div className="text-center py-8 border-b border-slate-700">

        <h1 className="text-3xl font-bold text-blue-400">
          ContentHub
        </h1>

      </div>

      <nav className="flex-1 mt-6">

        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `block px-8 py-4 transition duration-200 ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}

      </nav>

      <div className="p-6">

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 transition py-3 rounded-lg font-semibold"
        >
          Logout
        </button>

      </div>

    </aside>
  );
}