"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useFolders } from "./FolderProvider";

export default function LinkForm() {
  const router = useRouter();
  const { folders, selectedFolderId, refreshFolders } = useFolders();
  const [supabase] = useState(createClient);
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState<number | null>(selectedFolderId);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const { error } = await supabase.from("bookmarks").insert({
      url,
      title: new URL(url).hostname,
      folder_id: folderId,
    });
    if (error) {
      setError("저장하지 못했어요. 잠시 후 다시 시도해 주세요.");
      setSaving(false);
      return;
    }
    await refreshFolders();
    router.push("/");
  }

  return (
    <section className="flex-1 overflow-y-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="flex max-w-xl flex-col gap-3.5 rounded-2xl bg-[var(--surface)] p-5 shadow-[var(--shadow)]"
      >
        <label htmlFor="url" className="text-sm font-bold text-[var(--text)]">
          링크 주소
        </label>
        <input
          id="url"
          type="url"
          required
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          className="input-focus rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 text-base text-[var(--text)] placeholder:text-[var(--placeholder)]"
        />
        <label htmlFor="folder" className="text-sm font-bold text-[var(--text)]">
          폴더
        </label>
        <select
          id="folder"
          value={folderId ?? ""}
          onChange={(event) =>
            setFolderId(event.target.value ? Number(event.target.value) : null)
          }
          className="input-focus rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 text-base text-[var(--text)]"
        >
          <option value="">폴더 없음</option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-[var(--error)]">{error}</p>}
        <button
          type="submit"
          disabled={saving}
          className="btn-hover self-start rounded-xl bg-[var(--accent)] px-6 py-3.5 text-base font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          저장
        </button>
      </form>
    </section>
  );
}
