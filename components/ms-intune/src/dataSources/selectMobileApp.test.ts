import type { Element } from "@prismatic-io/spectral";
import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../connections";
import { MANAGED_APPS_FILTER } from "../constants";
import { listMobileAppsExamplePayload } from "../examplePayloads";
import { selectMobileApp } from "./selectMobileApp";
const HOST = "https://graph.microsoft.com";
const ACCESS_TOKEN = "test-access-token";
const PATH = "/beta/deviceAppManagement/mobileApps";
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
const listReply = listMobileAppsExamplePayload.data;
const invokeBare = async (): Promise<Element[]> =>
  (await invokeDataSource(selectMobileApp, {
    connection,
  })) as unknown as Element[];
describe("selectMobileApp", () => {
  afterEach(() => nock.cleanAll());
  test("forwards the managed app filter and maps the list to a bare array of label/key elements", async () => {
    const scope = nock(HOST)
      .get(PATH)
      .query({ $filter: MANAGED_APPS_FILTER })
      .reply(200, listReply);
    const result = await invokeBare();
    expect(scope.isDone()).toBe(true);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual([
      {
        label: "Display Name value",
        key: "0177548a-548a-0177-8a54-77018a547701",
      },
    ]);
    for (const element of result) {
      expect(element).toHaveProperty("label");
      expect(element).toHaveProperty("key");
    }
  });
  test("returns an empty array when the API returns no mobile apps", async () => {
    nock(HOST)
      .get(PATH)
      .query({ $filter: MANAGED_APPS_FILTER })
      .reply(200, { value: [] });
    expect(await invokeBare()).toEqual([]);
  });
});
