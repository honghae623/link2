"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import AuthCard from "./AuthCard";
import KakaoLoginButton from "./KakaoLoginButton";

const ERROR_MESSAGES: Record<string, string> = {
  invalid_credentials: "이메일 또는 비밀번호가 올바르지 않습니다.",
  email_not_confirmed: "이메일 인증이 완료되지 않았습니다. 메일함을 확인해 주세요.",
  validation_failed: "이메일 형식이 올바르지 않습니다.",
  over_request_rate_limit: "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.",
};

export default function LoginForm() {
  const router = useRouter();
  const [supabase] = useState(createClient);

  async function handleSubmit(values: Record<string, string>) {
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (error) {
      return (
        (error.code && ERROR_MESSAGES[error.code]) ||
        "로그인에 실패했습니다. 잠시 후 다시 시도해 주세요."
      );
    }
    router.push("/");
  }

  return (
    <AuthCard
      fields={[
        { id: "email", label: "이메일", type: "email", placeholder: "example@email.com", autoComplete: "email" },
        { id: "password", label: "비밀번호", type: "password", placeholder: "비밀번호", autoComplete: "current-password" },
      ]}
      submitLabel="로그인"
      altText="계정이 없으신가요?"
      altLabel="회원가입"
      altHref="/signup"
      extraLink={{ label: "비밀번호 찾기", href: "/forgot-password" }}
      renderExtra={(showToast) => <KakaoLoginButton onError={showToast} />}
      onSubmit={handleSubmit}
    />
  );
}
