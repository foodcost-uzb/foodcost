"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#f8f7fc] to-white">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-slate-900 mb-4">Ошибка</h1>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          Произошла непредвиденная ошибка. Попробуйте обновить страницу.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#5838a8] to-[#c04880] text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-[#5838a8]/30 hover:shadow-xl transition-shadow"
        >
          Попробовать снова
        </button>
      </div>
    </div>
  );
}
