import crypto from "node:crypto";
import type { CosmosDbResourceType, HttpVerb } from "../constants";

export const buildAuthHeader = (
  verb: HttpVerb,
  resourceType: CosmosDbResourceType,
  resourceLink: string,
  date: string,
  key: string,
) => {
  const keyBuffer = Buffer.from(key, "base64");

  const text = `${verb.toLowerCase()}\n${resourceType.toLowerCase()}\n${resourceLink}\n${date.toLowerCase()}\n\n`;

  const signature = crypto
    .createHmac("sha256", keyBuffer)
    .update(text, "utf8")
    .digest("base64");

  const MasterToken = "master";
  const TokenVersion = "1.0";

  return encodeURIComponent(
    `type=${MasterToken}&ver=${TokenVersion}&sig=${signature}`,
  );
};
