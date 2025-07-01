"use client";

import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

export default function Page() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.origin);
  }, [setUrl]);

  return (
    <div className="flex h-screen items-center justify-center">
      {url && (
        <QRCode
          value={url}
          bgColor="transparent"
          fgColor="#f5b26c"
          size={256}
        />
      )}
    </div>
  );
}
