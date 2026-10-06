import SignupForm from "@/components/SignupForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원가입",
  description: "링크에 가입하고 북마크를 정리해 보세요.",
};

export default function SignupPage() {
  return <SignupForm />;
}
