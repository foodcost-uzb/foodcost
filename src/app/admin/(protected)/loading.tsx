export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-[#5838a8]/20 border-t-[#5838a8] rounded-full animate-spin" />
        <p className="text-slate-500 text-sm">Загрузка...</p>
      </div>
    </div>
  );
}
