"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@/lib/use-user";
import { createClient } from "@/utils/supabase/client";

export default function UserMenu() {
  const router = useRouter();
  const user = useUser();
  const [supabase] = useState(createClient);

  if (!user) return null;

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <span className="max-w-48 truncate text-sm font-bold text-[var(--text-sub)]">
        {user.email}
      </span>
      <button
        type="button"
        onClick={handleLogout}
        className="btn-sub rounded-xl bg-[var(--hover-bg)] px-5 py-2.5 text-sm font-bold text-[var(--accent)]"
      >
        로그아웃
      </button>
    </div>
  );
}
