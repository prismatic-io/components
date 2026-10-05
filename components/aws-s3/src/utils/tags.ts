import querystring from "node:querystring";
import { type KeyValuePair, util } from "@prismatic-io/spectral";
export const encodeTags = (tags: KeyValuePair[] | undefined): string =>
  querystring.encode(util.types.keyValPairListToObject<string>(tags || []));
