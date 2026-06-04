import crypto from "node:crypto";

export function getBase64FromUrl(url: string): string {
  const lastPathSegmentMatch = url.match(/\/([^/]+)$/);
  return lastPathSegmentMatch ? lastPathSegmentMatch[1] : "";
}

export const generatePrefixedHash = (
  prefix: string,
  primaryValue: string,
  secondaryValue?: string,
): string => {
  const base = secondaryValue ? `${primaryValue}${secondaryValue}` : primaryValue;
  const hash = crypto.createHash("md5").update(base).digest("hex").substring(0, 20);
  return `${prefix}_${hash}`;
};
