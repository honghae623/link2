"use client";

import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

/** undefined: 확인 중, null: 로그아웃 상태 */
export function useUser() {
  const [supabase] = useState(createClient);
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => data.subscription.unsubscribe();
  }, [supabase]);

  return user;
}
