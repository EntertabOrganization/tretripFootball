import { PAGE_SIZE_DEFAULT, PAGE_SIZE_MAX, PAGE_SIZE_MIN } from "@/lib/constants";

export function parsePageParam(value?: string) {
  const page = Number.parseInt(value ?? "1", 10);
  return Number.isNaN(page) || page < 1 ? 1 : page;
}

export function parsePageSizeParam(value?: string) {
  const pageSize = Number.parseInt(value ?? `${PAGE_SIZE_DEFAULT}`, 10);

  if (Number.isNaN(pageSize)) {
    return PAGE_SIZE_DEFAULT;
  }

  return Math.min(PAGE_SIZE_MAX, Math.max(PAGE_SIZE_MIN, pageSize));
}
