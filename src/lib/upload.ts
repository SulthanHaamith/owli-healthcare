import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import path from "path";
import { MAX_FILE_SIZE, UPLOAD_DIR } from "./constants";

export function ensureUploadDir(subDir: string): string {
  const dirPath = path.join(UPLOAD_DIR, subDir);
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
  return dirPath;
}

export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_{2,}/g, "_")
    .substring(0, 200);
}

export function validatePdfFile(file: File): { valid: boolean; error?: string } {
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds maximum of ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
    };
  }

  if (file.type !== "application/pdf") {
    return { valid: false, error: "Only PDF files are allowed" };
  }

  return { valid: true };
}

export async function saveUploadedFile(
  file: File,
  subDir: string
): Promise<{ fileName: string; filePath: string; fileSize: number }> {
  const dirPath = ensureUploadDir(subDir);
  const sanitized = sanitizeFilename(file.name);
  const uniqueName = `${Date.now()}-${sanitized}`;
  const filePath = path.join(dirPath, uniqueName);

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  await writeFile(filePath, buffer);

  return {
    fileName: uniqueName,
    filePath,
    fileSize: file.size,
  };
}
