"use client";

import Link from "next/link";
import { useUser } from "@/lib/use-user";

export default function SidebarAuth() {
  const user = useUser();

  // 로그인 상태이거나 아직 확인 중일 때는 숨긴다.
  if (user !== null) return null;

  return (
    <div className="mt-auto flex flex-col gap-2 pt-4">
      <Link
        href="/login"
        className="btn-hover rounded-xl bg-[var(--accent)] px-5 py-2.5 text-center text-sm font-bold text-white"
      >
        로그인
      </Link>
      <Link
        href="/signup"
        className="btn-sub rounded-xl bg-[var(--hover-bg)] px-5 py-2.5 text-center text-sm font-bold text-[var(--accent)]"
      >
        회원가입
      </Link>
    </div>
  );
}
