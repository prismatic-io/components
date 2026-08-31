import type { Connection } from "@prismatic-io/spectral";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { billConnection } from "./connections";
import { ApiUrls } from "./enums/apiUrls";
export { nock };
export const SANDBOX_BASE: string = ApiUrls.Sandbox;
const LOGIN_RESPONSE_DATA = {
  sessionId: "test-session-id",
  orgId: "00801POTKMSVCTVAgcvw",
  apiEndPoint: `${ApiUrls.Sandbox}/`,
  usersId: "00901BCLBHFGKQNQqxyz",
  error_code: "",
  error_message: "",
};
export const testConnection: Connection = createConnection(billConnection, {
  username: "integration@example.com",
  password: "test-password",
  organizationId: "00801POTKMSVCTVAgcvw",
  developerKey: "test-developer-key",
  useProductionUrl: false,
});
export const envelope = <T>(
  data: T,
): {
  response_status: number;
  response_message: string;
  response_data: T;
} => ({
  response_status: 0,
  response_message: "Success",
  response_data: data,
});
export const mockLogin = (): nock.Scope =>
  nock(SANDBOX_BASE)
    .persist()
    .post("/Login.json")
    .reply(200, envelope(LOGIN_RESPONSE_DATA));
