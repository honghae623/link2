import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// 로그인하지 않아도 접근할 수 있는 페이지
const AUTH_PATHS = ["/login", "/signup", "/forgot-password"];
// 메일의 재설정 링크로 들어오면 임시 세션이 생기므로 로그인 여부와 상관없이 연다.
const OPEN_PATHS = [...AUTH_PATHS, "/reset-password", "/auth/callback"];

export const createClient = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // getUser()는 토큰을 서버에서 검증한다. (getSession()은 쿠키만 믿으므로 쓰지 않는다.)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const redirectTo =
    !user && !OPEN_PATHS.includes(pathname)
      ? "/login"
      : user && AUTH_PATHS.includes(pathname)
        ? "/"
        : null;

  if (redirectTo) {
    const url = request.nextUrl.clone();
    url.pathname = redirectTo;
    url.search = "";
    const redirect = NextResponse.redirect(url);
    // 갱신된 세션 쿠키를 리다이렉트 응답에도 실어 보낸다.
    supabaseResponse.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
    return redirect;
  }

  return supabaseResponse;
};
