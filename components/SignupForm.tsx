"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import AuthCard from "./AuthCard";

const ERROR_MESSAGES: Record<string, string> = {
  user_already_exists: "이미 가입된 이메일입니다.",
  email_exists: "이미 가입된 이메일입니다.",
  weak_password: "비밀번호가 너무 약합니다. 더 길고 복잡하게 만들어 주세요.",
  validation_failed: "이메일 형식이 올바르지 않습니다.",
  over_email_send_rate_limit:
    "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.",
};

export default function SignupForm() {
  const router = useRouter();
  const [supabase] = useState(createClient);

  async function handleSubmit(values: Record<string, string>) {
    if (values.password !== values["password-confirm"]) {
      return "비밀번호가 일치하지 않습니다.";
    }
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });
    if (error) {
      return (
        (error.code && ERROR_MESSAGES[error.code]) ||
        "회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요."
      );
    }
    router.push("/");
  }

  return (
    <AuthCard
      fields={[
        { id: "email", label: "이메일", type: "email", placeholder: "example@email.com", autoComplete: "email" },
        { id: "password", label: "비밀번호", type: "password", placeholder: "비밀번호", autoComplete: "new-password" },
        { id: "password-confirm", label: "비밀번호 확인", type: "password", placeholder: "비밀번호 확인", autoComplete: "new-password" },
      ]}
      submitLabel="회원가입"
      altText="이미 계정이 있으신가요?"
      altLabel="로그인"
      altHref="/login"
      onSubmit={handleSubmit}
    />
  );
}
