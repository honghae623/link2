"use client";

import FolderItem from "./FolderItem";
import SidebarAuth from "./SidebarAuth";
import { useFolders } from "./FolderProvider";

export default function Sidebar() {
  const { folders, selectedFolderId, selectFolder } = useFolders();

  return (
    <aside className="flex w-56 shrink-0 flex-col overflow-y-auto bg-[var(--surface)] p-4">
      <nav className="flex flex-col gap-1">
        <button
          type="button"
          onClick={() => selectFolder(null)}
          className={`rounded-xl px-3 py-2.5 text-left text-[15px] font-bold ${
            selectedFolderId === null
              ? "bg-[var(--hover-bg)] text-[var(--accent)]"
              : "text-[var(--text)]"
          }`}
        >
          전체
        </button>
        <p className="mt-5 px-3 pb-1 text-[13px] font-bold text-[var(--text-sub)]">
          폴더
        </p>
        {folders.map((folder) => (
          <FolderItem key={folder.id} folder={folder} />
        ))}
      </nav>
      <SidebarAuth />
    </aside>
  );
}
