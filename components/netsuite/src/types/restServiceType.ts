import type { QUERY_SERVICE, RECORD_SERVICE } from "../constants";

export type RestServiceType = typeof RECORD_SERVICE | typeof QUERY_SERVICE;
