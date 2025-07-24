"use client";

import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

export default function Page() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(`${window.location.origin}/invite`);
  }, [setUrl]);

  return (
    <div className="flex h-dvh items-center justify-center">
      {url && (
        <QRCode
          title="QR code of the current domain"
          value={url}
          bgColor="transparent"
          fgColor="#f5b26c"
          size={256}
        />
      )}
    </div>
  );
}
