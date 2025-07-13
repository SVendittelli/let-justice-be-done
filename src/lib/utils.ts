import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addOrRemove(array: string[], value: string) {
  if (array.includes(value)) {
    return array.filter((item) => item !== value);
  }
  return array.concat(value);
}
