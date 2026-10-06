import Link from "next/link";

export default function AddLinkButton() {
  return (
    <Link
      href="/new"
      className="btn-hover rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-bold text-white"
    >
      + 링크 추가
    </Link>
  );
}
