import type { Connection } from "@prismatic-io/spectral";
import { invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { deleteRecord } from "./deleteRecord";

const ORIGIN = "https://1234567.suitetalk.api.netsuite.com";
const BASE = "/services/rest/record/v1";

const connection: Connection = {
  key: "oauth",
  configVarKey: "NetSuite Connection",
  fields: { tokenUrl: `${ORIGIN}/services/rest/auth/oauth2/v1/token` },
  token: { access_token: "access-token" },
};

describe("deleteRecord", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("deletes the record by type and ID", async () => {
    nock(ORIGIN).delete(`${BASE}/customer/12345`).reply(204);

    const { result } = await invoke(deleteRecord, {
      connection,
      recordType: "customer",
      id: "12345",
    });

    expect(result).toMatchObject({ data: { data: "" } });
    expect(nock.isDone()).toBe(true);
  });

  test("rejects when the record is not found", async () => {
    nock(ORIGIN)
      .delete(`${BASE}/customer/999`)
      .reply(404, { title: "Not Found", status: 404 });

    await expect(
      invoke(deleteRecord, {
        connection,
        recordType: "customer",
        id: "999",
      }),
    ).rejects.toThrow();
  });
});
