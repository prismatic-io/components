import type { Element } from "@prismatic-io/spectral";
import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../connections";
import { listManagedDevicesExamplePayload } from "../examplePayloads";
import { selectManagedDevice } from "./selectManagedDevice";
const HOST = "https://graph.microsoft.com";
const ACCESS_TOKEN = "test-access-token";
const PATH = "/v1.0/deviceManagement/managedDevices";
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
const listReply = listManagedDevicesExamplePayload.data;
const invokeBare = async (): Promise<Element[]> =>
  (await invokeDataSource(selectManagedDevice, {
    connection,
  })) as unknown as Element[];
describe("selectManagedDevice", () => {
  afterEach(() => nock.cleanAll());
  test("maps the managed device list to a bare array of label/key elements", async () => {
    nock(HOST).get(PATH).reply(200, listReply);
    const result = await invokeBare();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual([
      {
        label: "Device Name value",
        key: "705c034c-034c-705c-4c03-5c704c035c70",
      },
    ]);
    for (const element of result) {
      expect(element).toHaveProperty("label");
      expect(element).toHaveProperty("key");
    }
  });
  test("returns an empty array when the API returns no managed devices", async () => {
    nock(HOST).get(PATH).reply(200, { value: [] });
    expect(await invokeBare()).toEqual([]);
  });
});
