import nock from "nock";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { connection as connectionDefinition } from "../../connections";
import { getAbout } from "./getAbout";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const DRIVE = "https://www.googleapis.com";
describe("getAbout", () => {
  afterEach(() => nock.cleanAll());
  test("returns the About resource", async () => {
    nock(DRIVE)
      .get("/drive/v3/about")
      .query(true)
      .reply(200, {
        user: {
          displayName: "Jane Doe",
          emailAddress: "jane.doe@example.com",
          kind: "drive#user",
        },
      });
    const { result } = await invoke(getAbout, { connection, fields: "*" });
    expect(result.data).toEqual({
      user: {
        displayName: "Jane Doe",
        emailAddress: "jane.doe@example.com",
        kind: "drive#user",
      },
    });
  });
  test("surfaces an API error", async () => {
    nock(DRIVE)
      .get("/drive/v3/about")
      .query(true)
      .reply(403, { error: { message: "forbidden" } });
    await expect(
      invoke(getAbout, { connection, fields: "*" }),
    ).rejects.toThrow();
  });
});
