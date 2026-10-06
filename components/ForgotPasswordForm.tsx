"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import AuthCard from "./AuthCard";

const ERROR_MESSAGES: Record<string, string> = {
  validation_failed: "이메일 형식이 올바르지 않습니다.",
  over_email_send_rate_limit:
    "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.",
};

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [supabase] = useState(createClient);

  async function handleSubmit(values: Record<string, string>) {
    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      return (
        (error.code && ERROR_MESSAGES[error.code]) ||
        "메일을 보내지 못했습니다. 잠시 후 다시 시도해 주세요."
      );
    }
    router.push("/reset-password");
  }

  return (
    <AuthCard
      description="가입한 이메일로 비밀번호 재설정 링크를 보내드려요."
      fields={[
        { id: "email", label: "이메일", type: "email", placeholder: "example@email.com", autoComplete: "email" },
      ]}
      submitLabel="재설정 링크 발송"
      altText=""
      altLabel="로그인으로 돌아가기"
      altHref="/login"
      onSubmit={handleSubmit}
    />
  );
}
