import { ImageResponse } from "next/og";

// 기본 폰트에는 한글 글리프가 없어 깨지므로 썸네일에는 영문만 사용한다.
export const ogAlt = "Link - Save and organize your bookmarks";
export const ogSize = { width: 1200, height: 630 };

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#2563eb",
          color: "white",
        }}
      >
        <div style={{ fontSize: 160, fontWeight: 800, letterSpacing: -4 }}>
          Link
        </div>
        <div style={{ fontSize: 48, marginTop: 16, opacity: 0.9 }}>
          Save and organize your bookmarks
        </div>
      </div>
    ),
    ogSize,
  );
}
