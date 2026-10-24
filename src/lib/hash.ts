import { createHash } from "node:crypto";

/** Deterministic short block hash. Server-only: used for the "onchain" motif, never for security. */
export function blockHash(input: string, length = 8): string {
  return createHash("sha256").update(input).digest("hex").slice(0, length);
}
