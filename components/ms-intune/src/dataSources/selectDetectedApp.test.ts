import type { Element } from "@prismatic-io/spectral";
import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../connections";
import { listDetectedAppsExamplePayload } from "../examplePayloads";
import { selectDetectedApp } from "./selectDetectedApp";
const HOST = "https://graph.microsoft.com";
const ACCESS_TOKEN = "test-access-token";
const PATH = "/v1.0/deviceManagement/detectedApps";
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
const listReply = listDetectedAppsExamplePayload.data;
const invokeBare = async (): Promise<Element[]> =>
  (await invokeDataSource(selectDetectedApp, {
    connection,
  })) as unknown as Element[];
describe("selectDetectedApp", () => {
  afterEach(() => nock.cleanAll());
  test("maps the detected app list to a bare array of label/key elements", async () => {
    nock(HOST).get(PATH).reply(200, listReply);
    const result = await invokeBare();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual([
      {
        label: "Display Name value",
        key: "caf60db6-0db6-caf6-b60d-f6cab60df6ca",
      },
    ]);
    for (const element of result) {
      expect(element).toHaveProperty("label");
      expect(element).toHaveProperty("key");
    }
  });
  test("returns an empty array when the API returns no detected apps", async () => {
    nock(HOST).get(PATH).reply(200, { value: [] });
    expect(await invokeBare()).toEqual([]);
  });
});
