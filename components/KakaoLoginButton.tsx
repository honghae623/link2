"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function KakaoLoginButton({
  onError,
}: {
  onError: (message: string) => void;
}) {
  const [supabase] = useState(createClient);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: "", // account_email 요청 제외 (비즈앱 설정 없이 작동)
      },
    });

    // 성공하면 카카오 로그인 화면으로 이동하므로 여기까지 오는 것은 실패한 경우다.
    if (error) {
      onError("카카오 로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.");
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="flex items-center justify-center gap-2 rounded-xl bg-[#FEE500] px-6 py-3.5 text-base font-bold text-black/85 hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <svg width="20" height="20" viewBox="0 0 18 18" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9 1C4.029 1 0 4.129 0 7.989c0 2.4 1.559 4.514 3.932 5.77l-1 3.665c-.088.324.28.582.56.393l4.36-2.9c.378.038.763.058 1.148.058 4.971 0 9-3.129 9-6.986C18 4.129 13.971 1 9 1z"
          fill="#000"
          fillOpacity=".9"
        />
      </svg>
      카카오 로그인
    </button>
  );
}
