import LoginForm from "@/components/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인",
  description: "링크에 로그인하고 저장한 링크를 확인하세요.",
};

export default function LoginPage() {
  return <LoginForm />;
}
