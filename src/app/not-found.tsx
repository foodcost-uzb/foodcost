import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#f8f7fc] to-white">
      <div className="text-center px-4">
        <h1 className="text-8xl font-bold gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Страница не найдена
        </h2>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          Запрашиваемая страница не существует или была перемещена.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#5838a8] to-[#c04880] text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-[#5838a8]/30 hover:shadow-xl transition-shadow"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}
