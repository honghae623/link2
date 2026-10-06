"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Field = {
  id: string;
  label: string;
  type: "email" | "password";
  placeholder: string;
  autoComplete: string;
};

type Props = {
  fields: Field[];
  submitLabel: string;
  altText: string;
  altLabel: string;
  altHref: string;
  /** 제출 버튼 아래에 추가로 렌더링할 요소 (예: 소셜 로그인 버튼) */
  renderExtra?: (showToast: (message: string) => void) => React.ReactNode;
  /** 대안 링크 위에 한 줄 더 표시할 링크 (예: 비밀번호 찾기) */
  extraLink?: { label: string; href: string };
  /** 로고 아래 안내 문구 */
  description?: string;
  /** 오류 메시지를 반환하면 토스트로 표시한다. 없으면 버튼은 동작하지 않는다. */
  onSubmit?: (values: Record<string, string>) => Promise<string | null | void>;
};

export default function AuthCard({
  fields,
  submitLabel,
  altText,
  altLabel,
  altHref,
  extraLink,
  description,
  renderExtra,
  onSubmit,
}: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const filled = fields.every((field) => values[field.id]);
  const disabled = onSubmit ? !filled || submitting : false;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!onSubmit || disabled) return;
    setSubmitting(true);
    const message = await onSubmit(values);
    if (message) {
      setToast(message);
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] p-5">
      {toast && (
        <div
          role="alert"
          className="fixed left-1/2 top-5 z-50 -translate-x-1/2 rounded-xl bg-[var(--error)] px-5 py-3 text-sm font-bold text-white shadow-[var(--shadow-hover)]"
        >
          {toast}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-5 rounded-2xl bg-[var(--surface)] p-6 shadow-[var(--shadow)]"
      >
        <span className="text-center text-2xl font-bold tracking-tight text-[var(--accent)]">
          링크
        </span>
        {description && (
          <p className="text-center text-sm text-[var(--text-sub)]">
            {description}
          </p>
        )}
        {fields.map((field) => (
          <div key={field.id} className="flex flex-col gap-2">
            <label
              htmlFor={field.id}
              className="text-sm font-bold text-[var(--text)]"
            >
              {field.label}
            </label>
            <input
              id={field.id}
              type={field.type}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              value={values[field.id] ?? ""}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, [field.id]: event.target.value }))
              }
              className="input-focus rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 text-base text-[var(--text)] placeholder:text-[var(--placeholder)]"
            />
          </div>
        ))}
        <button
          type={onSubmit ? "submit" : "button"}
          disabled={disabled}
          className="btn-hover rounded-xl bg-[var(--accent)] px-6 py-3.5 text-base font-bold text-white disabled:cursor-not-allowed disabled:bg-[var(--border)] disabled:text-[var(--text-sub)]"
        >
          {submitLabel}
        </button>
        {renderExtra?.(setToast)}
        {extraLink && (
          <Link
            href={extraLink.href}
            className="text-center text-sm font-bold text-[var(--accent)]"
          >
            {extraLink.label}
          </Link>
        )}
        <p className="text-center text-sm text-[var(--text-sub)]">
          {altText && <>{altText} </>}
          <Link href={altHref} className="font-bold text-[var(--accent)]">
            {altLabel}
          </Link>
        </p>
      </form>
    </main>
  );
}
