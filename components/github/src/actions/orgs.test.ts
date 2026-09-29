import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { oauth2 } from "../connections";
import { reposListForOrgExamplePayload } from "../examplePayloads";
import actions from "./index";
const BASE = "https://api.github.com";
const conn = createConnection(oauth2, {}, { access_token: "test-token" });
const { reposListForOrg } = actions;
afterEach(() => nock.cleanAll());
describe("reposListForOrg", () => {
  test("happy path returns organization repositories", async () => {
    nock(BASE)
      .get("/orgs/octocat-org/repos")
      .query(true)
      .reply(200, reposListForOrgExamplePayload.data);
    const { result } = await invoke(reposListForOrg, {
      connection: conn,
      org: "octocat-org",
      type: undefined,
      sort: "created",
      direction: undefined,
      pagination: { page: 1, perPage: 30 },
    });
    expect(result.data).toEqual(reposListForOrgExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    nock(BASE)
      .get("/orgs/octocat-org/repos")
      .query(true)
      .reply(404, { message: "Not Found" });
    await expect(
      invoke(reposListForOrg, {
        connection: conn,
        org: "octocat-org",
        type: undefined,
        sort: "created",
        direction: undefined,
        pagination: { page: 1, perPage: 30 },
      }),
    ).rejects.toThrow();
  });
});
