import type { Connection } from "@prismatic-io/spectral";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { serviceTitanConnection } from "./connections";
export const TENANT = "10978752986";
export const BASE = "https://api.servicetitan.io";
export const prefix = (module: string) => `/${module}/v2/tenant/${TENANT}`;
export const connection = createConnection(
  serviceTitanConnection,
  { tenant: TENANT, applicationKey: "ak1.testapplicationkey" },
  { access_token: "test-access-token" },
) as unknown as Connection;
export const REQUIRED_HEADERS = {
  Authorization: "Bearer test-access-token",
  Accept: "application/json",
  "Content-type": "application/json",
  "ST-App-Key": "ak1.testapplicationkey",
};
export const api = () => nock(BASE, { reqheaders: REQUIRED_HEADERS });
