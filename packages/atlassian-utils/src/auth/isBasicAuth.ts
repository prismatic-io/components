import type { Connection } from "@prismatic-io/spectral";
import type { AtlassianConnectionKeys } from "../interfaces/AtlassianConnectionKeys";

export const isAtlassianBasicAuth = (
  connection: Connection,
  keys: AtlassianConnectionKeys,
): boolean => connection.key === keys.basic;
