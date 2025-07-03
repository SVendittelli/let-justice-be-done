export type BillboardRoute = { label: string; path: string };

export const ROUTES: BillboardRoute[] = [
  { label: "Default", path: "/" },
  { label: "QR Code", path: "/qr" },
  { label: "Quote 1", path: "/quotes/0" },
  { label: "Quote 2", path: "/quotes/1" },
];
