import type { Connection } from "@prismatic-io/spectral";
import { ConnectionError } from "@prismatic-io/spectral";
import { ARENA_API_VERSION_PATH } from "../constants";
import { getBaseUrl } from "./connectionUtils";
const LOOPBACK_HOSTNAMES = new Set(["127.0.0.1", "localhost", "[::1]", "::1"]);
export const getArenaApiBaseUrl = (connection: Connection): string => {
  const resolvedBaseUrl = getBaseUrl(connection);
  if (!resolvedBaseUrl) {
    throw new ConnectionError(connection, "Base URL is required");
  }
  let parsed: URL;
  try {
    parsed = new URL(resolvedBaseUrl);
  } catch {
    throw new ConnectionError(
      connection,
      `Base URL must be an absolute URL beginning with https://, received: ${resolvedBaseUrl}`,
    );
  }
  if (
    parsed.protocol !== "https:" &&
    !LOOPBACK_HOSTNAMES.has(parsed.hostname)
  ) {
    throw new ConnectionError(
      connection,
      `Base URL must use https:// so credentials are not sent in cleartext, received scheme: ${parsed.protocol.replace(":", "")}`,
    );
  }
  return `${resolvedBaseUrl.replace(/\/$/, "")}${ARENA_API_VERSION_PATH}`;
};
