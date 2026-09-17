import nock from "nock";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { updateItamAssetExamplePayload as examplePayload } from "../../examplePayloads";
import { updateItamAsset } from "./updateItamAsset";
beforeAll(() => {
  nock.disableNetConnect();
});
afterAll(() => {
  nock.enableNetConnect();
});
const HOST = "https://example.freshservice.com";
const connection = {
  key: "freshservice-api-key-connection",
  configVarKey: "",
  fields: { freshserviceDomain: "example", apiKey: "test-api-key" },
} as never;
const context = { debug: { enabled: false } } as never;
const rawWriteBody = { msg: [examplePayload.data.raw], code: 0 };
const params = (overrides: Record<string, unknown> = {}) =>
  ({
    connection,
    assetId: 54,
    name: "main modem",
    rackPlacement: {},
    itamAssetsAdditionalFields: {},
    ...overrides,
  }) as never;
afterEach(() => {
  nock.cleanAll();
});
describe("updateItamAsset", () => {
  test("puts to the record path WITH a trailing slash and unwraps the nested tuple", async () => {
    let sent: unknown;
    const scope = nock(HOST)
      .put("/api/v2/itam/assets/54/", (body) => {
        sent = body;
        return true;
      })
      .reply(200, rawWriteBody);
    const result = await updateItamAsset.perform(context, params());
    expect(scope.isDone()).toBe(true);
    expect(sent).toEqual({ name: "main modem" });
    expect(result).toEqual(examplePayload);
  });
  test("surfaces a rejected write", async () => {
    nock(HOST)
      .put("/api/v2/itam/assets/54/")
      .reply(400, { description: "Validation failed", errors: [] });
    await expect(updateItamAsset.perform(context, params())).rejects.toThrow();
  });
  test("refuses a rack placement missing Start At and Size", async () => {
    const scope = nock(HOST)
      .put("/api/v2/itam/assets/54/")
      .reply(200, rawWriteBody);
    await expect(
      updateItamAsset.perform(
        context,
        params({ rackPlacement: { rackId: 17 } }),
      ),
    ).rejects.toThrow(/Start At and Size are both required/);
    expect(scope.isDone()).toBe(false);
  });
});
