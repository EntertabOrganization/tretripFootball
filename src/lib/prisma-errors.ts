import { Prisma } from "@prisma/client";

const PRISMA_CONNECTION_ERROR_CODES = new Set(["P1001", "P1002"]);

export function isPrismaConnectionError(error: unknown) {
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return true;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return PRISMA_CONNECTION_ERROR_CODES.has(error.code);
  }

  return false;
}

export async function withPrismaConnectionFallback<T>(
  operation: () => Promise<T>,
  fallback: T,
  context: string,
) {
  try {
    return await operation();
  } catch (error) {
    if (isPrismaConnectionError(error)) {
      console.warn(`[prisma] ${context} skipped because the database is unavailable.`);
      return fallback;
    }

    throw error;
  }
}
