import type { Element } from "@prismatic-io/spectral";
import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../connections";
import { MANAGED_APPS_FILTER } from "../constants";
import { listMobileAppAssignmentsExamplePayload } from "../examplePayloads";
import { selectMobileAppAssignment } from "./selectMobileAppAssignment";
const HOST = "https://graph.microsoft.com";
const ACCESS_TOKEN = "test-access-token";
const MOBILE_APP_ID = "0177548a-548a-0177-8a54-77018a547701";
const PATH = `/beta/deviceAppManagement/mobileApps/${MOBILE_APP_ID}/assignments`;
const connection = createConnection(
  msIntuneOAuth2,
  {
    authorizeUrl:
      "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    tokenUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    clientId: "test-client-id",
    clientSecret: "test-client-secret",
  },
  { access_token: ACCESS_TOKEN },
);
const listReply = listMobileAppAssignmentsExamplePayload.data;
const invokeBare = async (): Promise<Element[]> =>
  (await invokeDataSource(selectMobileAppAssignment, {
    connection,
    mobileAppId: MOBILE_APP_ID,
  })) as unknown as Element[];
describe("selectMobileAppAssignment", () => {
  afterEach(() => nock.cleanAll());
  test("forwards the managed app filter and maps assignments to a bare array of label/key elements", async () => {
    const scope = nock(HOST)
      .get(PATH)
      .query({ $filter: MANAGED_APPS_FILTER })
      .reply(200, listReply);
    const result = await invokeBare();
    expect(scope.isDone()).toBe(true);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual([
      { label: "required", key: "591620b7-20b7-5916-b720-1659b7201659" },
    ]);
    for (const element of result) {
      expect(element).toHaveProperty("label");
      expect(element).toHaveProperty("key");
    }
  });
  test("returns an empty array when the app has no assignments", async () => {
    nock(HOST)
      .get(PATH)
      .query({ $filter: MANAGED_APPS_FILTER })
      .reply(200, { value: [] });
    expect(await invokeBare()).toEqual([]);
  });
});
