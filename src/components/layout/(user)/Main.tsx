import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

export default function Main({ children }: MainProps) {
  return (
    <main className="pt-[57px] mx-auto w-full h-screen text-black bg-white border-l border-r border-r-gray-100 border-l-gray-100 sm:max-w-[800px]">
      {children}
    </main>
  );
}
