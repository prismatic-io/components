import nock from "nock";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { createOrUpdateItamAssetExamplePayload as examplePayload } from "../../examplePayloads";
import { createOrUpdateItamAsset } from "./createOrUpdateItamAsset";
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
    name: "main modem",
    rackPlacement: {},
    itamAssetsAdditionalFields: {},
    ...overrides,
  }) as never;
afterEach(() => {
  nock.cleanAll();
});
describe("createOrUpdateItamAsset", () => {
  test("posts to the collection WITH a trailing slash and unwraps the nested tuple", async () => {
    let sent: unknown;
    const scope = nock(HOST)
      .post("/api/v2/itam/assets/", (body) => {
        sent = body;
        return true;
      })
      .reply(200, rawWriteBody);
    const result = await createOrUpdateItamAsset.perform(context, params());
    expect(scope.isDone()).toBe(true);
    expect(sent).toEqual({ name: "main modem" });
    expect(result).toEqual(examplePayload);
  });
  test("surfaces a rejected write", async () => {
    nock(HOST)
      .post("/api/v2/itam/assets/")
      .reply(400, { description: "Validation failed", errors: [] });
    await expect(
      createOrUpdateItamAsset.perform(context, params()),
    ).rejects.toThrow();
  });
  test("refuses a rack placement missing Start At and Size", async () => {
    const scope = nock(HOST)
      .post("/api/v2/itam/assets/")
      .reply(200, rawWriteBody);
    await expect(
      createOrUpdateItamAsset.perform(
        context,
        params({ rackPlacement: { rack: "Rack 12" } }),
      ),
    ).rejects.toThrow(/Start At and Size are both required/);
    expect(scope.isDone()).toBe(false);
  });
});
