"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import AuthCard from "./AuthCard";

const ERROR_MESSAGES: Record<string, string> = {
  weak_password: "비밀번호가 너무 약합니다. 더 길고 복잡하게 만들어 주세요.",
  same_password: "이전과 다른 비밀번호를 입력해 주세요.",
  session_not_found:
    "재설정 링크가 만료되었거나 올바르지 않습니다. 메일의 링크로 다시 접속해 주세요.",
};

export default function ResetPasswordForm() {
  const router = useRouter();
  const [supabase] = useState(createClient);

  async function handleSubmit(values: Record<string, string>) {
    if (values.password !== values["password-confirm"]) {
      return "비밀번호가 일치하지 않습니다.";
    }
    const { error } = await supabase.auth.updateUser({
      password: values.password,
    });
    if (error) {
      return (
        (error.code && ERROR_MESSAGES[error.code]) ||
        (error.name === "AuthSessionMissingError"
          ? ERROR_MESSAGES.session_not_found
          : "비밀번호를 변경하지 못했습니다. 잠시 후 다시 시도해 주세요.")
      );
    }
    router.push("/");
  }

  return (
    <AuthCard
      description="메일로 받은 링크로 접속한 뒤 새 비밀번호를 입력해 주세요."
      fields={[
        { id: "password", label: "새 비밀번호", type: "password", placeholder: "새 비밀번호", autoComplete: "new-password" },
        { id: "password-confirm", label: "새 비밀번호 확인", type: "password", placeholder: "새 비밀번호 확인", autoComplete: "new-password" },
      ]}
      submitLabel="비밀번호 변경"
      altText=""
      altLabel="로그인으로 돌아가기"
      altHref="/login"
      onSubmit={handleSubmit}
    />
  );
}
