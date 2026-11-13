import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { oauth } from "../../connections";
import { BASE_URL } from "../../constants";
import { listGroupsExamplePayload } from "../../examplePayloads";
import { listGroups } from "./listGroups";

const connection = createConnection(
  oauth,
  {},
  { access_token: "eyJ0eXAiOiJKV1QiLCJub25jZSI6Im9uZWRyaXZlLXRlc3QifQ" },
);
const pagination = { pageLimit: 2, pageToken: "X%2744537079ghv" };
const pageQuery = { $top: "2", $skiptoken: "X%2744537079ghv" };

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

afterAll(() => {
  nock.enableNetConnect();
});

describe("listGroups", () => {
  test("returns one page of groups", async () => {
    nock(BASE_URL)
      .get("/groups")
      .query(pageQuery)
      .reply(200, listGroupsExamplePayload.data);

    const { result } = await invoke(listGroups, {
      connection,
      fetchAll: false,
      pagination,
    });

    expect(result).toEqual(listGroupsExamplePayload);
  });

  test("rejects on an API error", async () => {
    nock(BASE_URL).get("/groups").query(pageQuery).reply(403, {});

    await expect(
      invoke(listGroups, { connection, fetchAll: false, pagination }),
    ).rejects.toThrow();
  });
});
