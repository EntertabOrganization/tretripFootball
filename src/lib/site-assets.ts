import "server-only";

import { readdir } from "node:fs/promises";
import path from "node:path";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".svg", ".avif"]);

function isImageFile(fileName: string) {
  return IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase());
}

function getPublicDirectory(...segments: string[]) {
  return path.join(process.cwd(), "public", ...segments);
}

function toPublicPath(folder: string, fileName: string) {
  return `/${folder}/${encodeURIComponent(fileName)}`;
}

export async function getAboutImagePaths() {
  const directory = getPublicDirectory("about");
  const entries = await readdir(directory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && isImageFile(entry.name))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }))
    .map((fileName) => toPublicPath("about", fileName));
}

export type TeamFlag = {
  name: string;
  imagePath: string;
};

export async function getTeamFlags(): Promise<TeamFlag[]> {
  const directory = getPublicDirectory("flags");
  const entries = await readdir(directory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && isImageFile(entry.name))
    .map((entry) => {
      const extension = path.extname(entry.name);
      const name = path.basename(entry.name, extension);

      return {
        name,
        imagePath: toPublicPath("flags", entry.name),
      };
    })
    .sort((left, right) => left.name.localeCompare(right.name));
}
