export default function StatCard({
  title,
  value,
  color,
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">

      <p className="text-gray-500 text-lg">

        {title}

      </p>

      <h2 className={`text-5xl font-bold mt-4 ${color}`}>

        {value}

      </h2>

    </div>
  );
}