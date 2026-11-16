import { createHmac, timingSafeEqual } from "node:crypto";
import { util } from "@prismatic-io/spectral";

export const validateHmac = (
  rawBody: { data: unknown },
  timestamp: string,
  signature: string,
  secrets: string[],
): void => {
  const body = util.types.toString(rawBody.data);
  const provided = Buffer.from(util.types.toString(signature), "hex");
  for (const secret of secrets) {
    const computedSignature = createHmac("sha256", secret)
      .update(`${body}${timestamp}`)
      .digest();
    if (
      provided.length === computedSignature.length &&
      timingSafeEqual(provided, computedSignature)
    ) {
      return;
    }
  }
  throw new Error(
    "The included signing signature does not match a known BambooHR signing key for this integration. Rejecting payload.",
  );
};
