import { useAuth } from "../context/AuthContext";

export default function Topbar() {

    const { user } = useAuth();

    return (

        <header className="bg-white shadow px-8 py-5 flex justify-between items-center">

            <div>

                <h1 className="text-3xl font-bold">

                    Dashboard

                </h1>

                <p className="text-gray-500">

                    Manage your content

                </p>

            </div>

            <div className="text-right">

                <p className="font-semibold">

                    {user?.name}

                </p>

                <p className="text-sm text-gray-500">

                    {user?.email}

                </p>

            </div>

        </header>

    );

}