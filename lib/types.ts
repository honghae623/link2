export type Folder = { id: number; name: string; count: number };

export type Bookmark = {
  id: number;
  url: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  folder_id: number | null;
  created_at: string;
};
