"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Folder } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";

type FolderContextValue = {
  folders: Folder[];
  selectedFolderId: number | null;
  selectFolder: (id: number | null) => void;
  refreshFolders: () => Promise<void>;
  addFolder: (name: string) => Promise<void>;
  renameFolder: (id: number, name: string) => Promise<void>;
  deleteFolder: (id: number) => Promise<void>;
};

const FolderContext = createContext<FolderContextValue | null>(null);

export function FolderProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(createClient);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);

  const refreshFolders = useCallback(async () => {
    const { data, error } = await supabase
      .from("folders")
      .select("id, name, bookmarks(count)")
      .order("id");
    if (error) {
      console.error(error);
      return;
    }
    setFolders(
      data.map((row) => ({
        id: row.id,
        name: row.name,
        count: row.bookmarks[0]?.count ?? 0,
      })),
    );
  }, [supabase]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refreshFolders();
  }, [refreshFolders]);

  // 로그인/로그아웃으로 사용자가 바뀌면 이전 사용자의 폴더가 남지 않도록 다시 불러온다.
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        setSelectedFolderId(null);
        void refreshFolders();
      }
    });
    return () => data.subscription.unsubscribe();
  }, [supabase, refreshFolders]);

  async function addFolder(name: string) {
    const { error } = await supabase.from("folders").insert({ name });
    if (error) return console.error(error);
    await refreshFolders();
  }

  async function renameFolder(id: number, name: string) {
    const { error } = await supabase.from("folders").update({ name }).eq("id", id);
    if (error) return console.error(error);
    await refreshFolders();
  }

  async function deleteFolder(id: number) {
    // 연결된 bookmarks.folder_id는 FK(on delete set null)가 비운다.
    const { error } = await supabase.from("folders").delete().eq("id", id);
    if (error) return console.error(error);
    if (selectedFolderId === id) setSelectedFolderId(null);
    await refreshFolders();
  }

  return (
    <FolderContext.Provider
      value={{
        folders,
        selectedFolderId,
        selectFolder: setSelectedFolderId,
        refreshFolders,
        addFolder,
        renameFolder,
        deleteFolder,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
}

export function useFolders() {
  const ctx = useContext(FolderContext);
  if (!ctx) throw new Error("useFolders must be used within FolderProvider");
  return ctx;
}
