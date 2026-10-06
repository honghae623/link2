"use client";

import { useState } from "react";
import { useFolders } from "./FolderProvider";

export default function AddFolderButton() {
  const { addFolder } = useFolders();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  function close() {
    setOpen(false);
    setName("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    addFolder(trimmed);
    close();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-sub rounded-xl bg-[var(--hover-bg)] px-5 py-2.5 text-sm font-bold text-[var(--accent)]"
      >
        + 새 폴더
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5"
          onClick={close}
        >
          <form
            onSubmit={handleSubmit}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="folder-modal-title"
            className="flex w-full max-w-sm flex-col gap-3.5 rounded-2xl bg-[var(--surface)] p-5 shadow-[var(--shadow-hover)]"
          >
            <h2
              id="folder-modal-title"
              className="text-xl font-bold text-[var(--text)]"
            >
              새 폴더
            </h2>
            <input
              autoFocus
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="폴더 이름"
              className="input-focus rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 text-base text-[var(--text)] placeholder:text-[var(--placeholder)]"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={close}
                className="btn-sub rounded-xl bg-[var(--hover-bg)] px-5 py-3 text-base font-bold text-[var(--accent)]"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={!name.trim()}
                className="btn-hover rounded-xl bg-[var(--accent)] px-5 py-3 text-base font-bold text-white disabled:cursor-not-allowed disabled:bg-[var(--border)] disabled:text-[var(--text-sub)]"
              >
                저장
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
