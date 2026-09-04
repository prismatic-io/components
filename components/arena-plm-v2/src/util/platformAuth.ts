import { createHmac, randomBytes } from "node:crypto";
export const PLATFORM_AUTH_HEADER = "X-PLATFORM-AUTH";
const PLATFORM_ID = "PRISMATIC";
const PLATFORM_AUTH_KEY =
  "ab16aa730137f9489b3276965c0826d3150a7f00cebee6a2cd4e01e6ca286ea2";
const NONCE_BYTES = 16;
export const generatePlatformAuthHeader = (): string => {
  const timestamp = Date.now().toString();
  const nonce = randomBytes(NONCE_BYTES).toString("hex");
  const payload = `${PLATFORM_ID}|${timestamp}|${nonce}`;
  const signature = createHmac("sha256", PLATFORM_AUTH_KEY)
    .update(payload)
    .digest("base64");
  return `${payload}|${signature}`;
};
