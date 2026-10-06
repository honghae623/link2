import Header from "@/components/Header";
import LinkGrid from "@/components/LinkGrid";
import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "내 링크",
  description: "저장한 링크를 폴더별로 모아 보세요.",
};

export default function Home() {
  return (
    <div className="flex h-screen flex-col bg-[var(--bg)]">
      <Header />
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <LinkGrid />
      </div>
    </div>
  );
}
