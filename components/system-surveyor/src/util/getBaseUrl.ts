import type { Connection } from "@prismatic-io/spectral";
import { util } from "@prismatic-io/spectral";
import { BASE_PRODUCTION_URL } from "../constants";


export const getBaseUrl = (ssvConnection: Connection): string =>
  util.types.toString(ssvConnection.fields.baseUrl) || BASE_PRODUCTION_URL;
