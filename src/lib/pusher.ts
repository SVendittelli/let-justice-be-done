import z from "zod";

export const BILLBOARD_CHANNEL = "billboard";
export const BILLBOARD_DISPLAY = "display";
export const BILLBOARD_REFRESH = "refresh";

export const billboardSchema = {
  display: z.object({
    label: z.string().min(1),
    path: z.string().regex(/\/billboard\/.*/),
  }),
  refresh: z.null(),
};
export type BillboardSchema = typeof billboardSchema;

export const TOAST_CHANNEL = "toast";
export const TOAST_MESSAGE = "message";
export const TOAST_REVEAL = "reveal";

export const toastSchema = {
  message: z.string().min(1),
  reveal: z.null(),
};
export type ToastSchema = typeof toastSchema;
