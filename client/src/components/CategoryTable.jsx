export default function CategoryTable({

    categories,

    onEdit,

    onDelete

}) {

    if (!categories.length) {

        return (

            <div className="bg-white rounded-xl shadow-lg p-10 text-center">

                <h2 className="text-2xl font-semibold">

                    No Categories

                </h2>

                <p className="text-gray-500 mt-2">

                    Create your first category.

                </p>

            </div>

        );

    }

    return (

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

            <table className="w-full">

                <thead className="bg-slate-100">

                    <tr>

                        <th className="p-4 text-left">

                            Name

                        </th>

                        <th className="p-4 text-center">

                            Type

                        </th>

                        <th className="p-4 text-center">

                            Actions

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        categories.map(category => (

                            <tr

                                key={category.id}

                                className="border-t"

                            >

                                <td className="p-4 font-medium">

                                    {category.name}

                                </td>

                                <td className="text-center">

                                    {category.type}

                                </td>

                                <td className="text-center">

                                    <button

                                        onClick={() => onEdit(category)}

                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2"

                                    >

                                        Edit

                                    </button>

                                    <button

                                        onClick={() => onDelete(category.id)}

                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"

                                    >

                                        Delete

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}