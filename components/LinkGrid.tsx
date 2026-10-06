"use client";

import { useEffect, useState } from "react";
import type { Bookmark } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";
import { useFolders } from "./FolderProvider";
import LinkCard from "./LinkCard";

export default function LinkGrid() {
  const { selectedFolderId } = useFolders();
  const [supabase] = useState(createClient);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      let query = supabase
        .from("bookmarks")
        .select("*")
        .order("created_at", { ascending: false });
      if (selectedFolderId !== null) {
        query = query.eq("folder_id", selectedFolderId);
      }
      const { data, error } = await query;
      if (error) return console.error(error);
      if (!cancelled) setBookmarks(data);
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [supabase, selectedFolderId]);

  return (
    <section className="flex-1 overflow-y-auto p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {bookmarks.map((bookmark) => (
          <LinkCard key={bookmark.id} bookmark={bookmark} />
        ))}
      </div>
    </section>
  );
}
