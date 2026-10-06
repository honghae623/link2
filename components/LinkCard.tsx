import type { Bookmark } from "@/lib/types";

export default function LinkCard({ bookmark }: { bookmark: Bookmark }) {
  const host = new URL(bookmark.url).hostname;

  return (
    <a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover flex flex-col gap-2 rounded-2xl bg-[var(--surface)] p-5 shadow-[var(--shadow)]"
    >
      <h3 className="text-base font-bold text-[var(--text)]">
        {bookmark.title ?? host}
      </h3>
      {bookmark.description && (
        <p className="line-clamp-2 text-sm leading-snug text-[var(--text-sub)]">
          {bookmark.description}
        </p>
      )}
      <span className="mt-auto w-fit rounded-lg bg-[var(--hover-bg)] px-2.5 py-1 text-[13px] font-bold text-[var(--accent)]">
        {host}
      </span>
    </a>
  );
}
