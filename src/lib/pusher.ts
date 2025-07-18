import z from "zod";

export const BILLBOARD_CHANNEL = "billboard";
export const BILLBOARD_DISPLAY = "display";
export const BILLBOARD_REFRESH = "refresh";

export const billboardSchema = {
  current: z.void(),
  display: z.object({
    label: z.string().min(1),
    path: z.string().regex(/\/billboard\/.*/),
  }),
  refresh: z.void(),
};
export type BillboardSchema = typeof billboardSchema;

export const TOAST_CHANNEL = "toast";
export const TOAST_MESSAGE = "message";
export const TOAST_REVEAL = "reveal";
export const TOAST_SUSPICION = "suspicion";

export const toastSchema = {
  message: z.string().min(1),
  reveal: z.object({
    message: z.string().min(1),
    path: z.string().startsWith("/"),
    type: z.enum(["CLUE", "NPC", "CRIME_SCENE"]),
  }),
  suspicion: z.number().min(0).max(7),
};
export type ToastSchema = typeof toastSchema;
