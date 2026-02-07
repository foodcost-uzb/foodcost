export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
      {children}
    </div>
  );
}
