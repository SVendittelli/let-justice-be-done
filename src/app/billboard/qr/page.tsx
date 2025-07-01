"use client";

import QRCode from "react-qr-code";

export default function Page() {
  const url = window.location.origin;
  return (
    <div className="flex h-screen items-center justify-center">
      <QRCode value={url} bgColor="transparent" fgColor="#f5b26c" size={256} />
    </div>
  );
}
