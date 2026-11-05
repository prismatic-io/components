import { createVerify } from "node:crypto";
import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/http";
import { IO_EVENTS_PUBLIC_KEY_BASE_URL, PUBLIC_KEY_CACHE_TTL_MS } from "../constants";

const keyCache = new Map<string, { pem: string; fetchedAt: number }>();

const getPublicKey = async (client: HttpClient, keyPath: string): Promise<string> => {
  const cached = keyCache.get(keyPath);
  if (cached && Date.now() - cached.fetchedAt < PUBLIC_KEY_CACHE_TTL_MS) {
    return cached.pem;
  }
  const { data } = await client.get<string>(`${IO_EVENTS_PUBLIC_KEY_BASE_URL}${keyPath}`);
  const pem = util.types.toString(data);
  keyCache.set(keyPath, { pem, fetchedAt: Date.now() });
  return pem;
};

const verifyOne = (rawBody: string, signature: string, pem: string): boolean => {
  try {
    const verifier = createVerify("RSA-SHA256");
    verifier.update(rawBody);
    return verifier.verify(pem, signature, "base64");
  } catch {
    return false;
  }
};

export const verifyAdobeSignature = async (
  client: HttpClient,
  headers: Record<string, string>,
  rawBody: string,
): Promise<void> => {
  const pairs = [
    [headers["x-adobe-digital-signature-1"], headers["x-adobe-public-key1-path"]],
    [headers["x-adobe-digital-signature-2"], headers["x-adobe-public-key2-path"]],
  ].filter(
    (pair): pair is [string, string] =>
      pair[0] !== undefined && pair[0] !== "" && pair[1] !== undefined && pair[1] !== "",
  );

  for (const [signature, keyPath] of pairs) {
    if (!keyPath.startsWith("/")) continue;
    let pem: string;
    try {
      pem = await getPublicKey(client, keyPath);
    } catch {
      continue;
    }
    if (verifyOne(rawBody, signature, pem)) return;
  }
  throw new Error("Adobe I/O Events signature verification failed.");
};

export const clearPublicKeyCache = (): void => keyCache.clear();
