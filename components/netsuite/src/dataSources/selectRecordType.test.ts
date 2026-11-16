import type { Connection } from "@prismatic-io/spectral";
import { invokeDataSource } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { metadataCatalogExamplePayload } from "../examplePayloads";
import { selectRecordType } from "./selectRecordType";

const ORIGIN = "https://1234567.suitetalk.api.netsuite.com";

const connection: Connection = {
  key: "oauth",
  configVarKey: "NetSuite Connection",
  fields: { tokenUrl: `${ORIGIN}/services/rest/auth/oauth2/v1/token` },
  token: { access_token: "access-token" },
};

describe("selectRecordType", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("lists the record types in the account's metadata catalog, sorted", async () => {
    nock(ORIGIN)
      .get("/services/rest/record/v1/metadata-catalog")
      .reply(200, metadataCatalogExamplePayload);

    const { result } = await invokeDataSource(selectRecordType, { connection });

    expect(result).toEqual([
      { key: "account", label: "account" },
      { key: "customer", label: "customer" },
      { key: "customrecord_milestone", label: "customrecord_milestone" },
      { key: "salesOrder", label: "salesOrder" },
    ]);
    expect(nock.isDone()).toBe(true);
  });

  test("returns an empty list when the catalog has no record types", async () => {
    nock(ORIGIN)
      .get("/services/rest/record/v1/metadata-catalog")
      .reply(200, { items: [] });

    const { result } = await invokeDataSource(selectRecordType, { connection });

    expect(result).toEqual([]);
  });
});
