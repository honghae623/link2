"use client";

import { useState } from "react";
import type { Folder } from "@/lib/types";
import { useFolders } from "./FolderProvider";

export default function FolderItem({ folder }: { folder: Folder }) {
  const { renameFolder, deleteFolder, selectedFolderId, selectFolder } =
    useFolders();
  const selected = selectedFolderId === folder.id;
  const [confirming, setConfirming] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(folder.name);

  function openEdit() {
    setName(folder.name);
    setEditing(true);
  }

  function handleRename(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    renameFolder(folder.id, trimmed);
    setEditing(false);
  }

  return (
    <>
      <div className="item-hover group relative flex items-center rounded-xl">
        <button
          type="button"
          onClick={() => selectFolder(folder.id)}
          className={`flex flex-1 items-center justify-between rounded-xl px-3 py-2.5 text-left text-[15px] font-bold ${
            selected
              ? "bg-[var(--hover-bg)] text-[var(--accent)]"
              : "text-[var(--text)]"
          }`}
        >
          <span>{folder.name}</span>
          <span className="rounded-lg bg-[var(--hover-bg)] px-2 py-0.5 text-[13px] font-bold text-[var(--accent)] group-hover:invisible group-focus-within:invisible">
            {folder.count}
          </span>
        </button>
        <button
          type="button"
          onClick={openEdit}
          aria-label={`${folder.name} 폴더 이름 수정`}
          className="icon-edit absolute right-10 flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-sub)] opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => setConfirming(true)}
          aria-label={`${folder.name} 폴더 삭제`}
          className="icon-danger absolute right-2 flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-sub)] opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 6h18" />
            <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
          </svg>
        </button>
      </div>
      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5"
          onClick={() => setEditing(false)}
        >
          <form
            onSubmit={handleRename}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`edit-title-${folder.id}`}
            className="flex w-full max-w-sm flex-col gap-3.5 rounded-2xl bg-[var(--surface)] p-5 shadow-[var(--shadow-hover)]"
          >
            <h2
              id={`edit-title-${folder.id}`}
              className="text-xl font-bold text-[var(--text)]"
            >
              폴더 이름 수정
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
                onClick={() => setEditing(false)}
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
      {confirming && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5"
          onClick={() => setConfirming(false)}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={`delete-title-${folder.id}`}
            onClick={(event) => event.stopPropagation()}
            className="flex w-full max-w-sm flex-col gap-3.5 rounded-2xl bg-[var(--surface)] p-5 shadow-[var(--shadow-hover)]"
          >
            <h2
              id={`delete-title-${folder.id}`}
              className="text-xl font-bold text-[var(--text)]"
            >
              폴더를 삭제할까요?
            </h2>
            <p className="text-sm text-[var(--text-sub)]">
              &lsquo;{folder.name}&rsquo; 폴더가 삭제됩니다.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                autoFocus
                onClick={() => setConfirming(false)}
                className="btn-sub rounded-xl bg-[var(--hover-bg)] px-5 py-3 text-base font-bold text-[var(--accent)]"
              >
                취소
              </button>
              <button
                type="button"
                onClick={() => deleteFolder(folder.id)}
                className="btn-danger rounded-xl bg-[var(--error)] px-5 py-3 text-base font-bold text-white"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
