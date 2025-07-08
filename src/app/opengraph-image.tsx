import { ImageResponse } from "next/og";

// Image metadata
export const alt = "Let Justice Be Done";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 124,
          fontWeight: 700,
          color: "#f5b26c",
          background: "#f5b26c",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          borderWidth: "12px",
          borderColor: "#f5b26c",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(180deg, #a4112e 0%, #5a142c 100%)",
            borderRadius: "20px",
          }}
        >
          <div>Let Justice</div>
          <div>Be Done</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Noto Serif",
          data: await loadGoogleFont("Noto Serif", 700, "Let Justice Be Done"),
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}

async function loadGoogleFont(font: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = /src: url\((.+)\) format\('(opentype|truetype)'\)/.exec(css);

  if (resource?.[1]) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}
