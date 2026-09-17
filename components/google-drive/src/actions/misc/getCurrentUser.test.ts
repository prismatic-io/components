import nock from "nock";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { connection as connectionDefinition } from "../../connections";
import { getCurrentUser } from "./getCurrentUser";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const DRIVE = "https://www.googleapis.com";
describe("getCurrentUser", () => {
  afterEach(() => nock.cleanAll());
  test("returns the unwrapped user object", async () => {
    nock(DRIVE)
      .get("/drive/v3/about")
      .query(true)
      .reply(200, {
        user: {
          kind: "drive#user",
          displayName: "Example User",
          photoLink: "https://lh3.googleusercontent.com/a/Example",
          me: true,
          permissionId: "12345678901234567890",
          emailAddress: "jane.doe@example.com",
        },
      });
    const { result } = await invoke(getCurrentUser, { connection });
    expect(result.data).toEqual({
      kind: "drive#user",
      displayName: "Example User",
      photoLink: "https://lh3.googleusercontent.com/a/Example",
      me: true,
      permissionId: "12345678901234567890",
      emailAddress: "jane.doe@example.com",
    });
  });
  test("surfaces an API error", async () => {
    nock(DRIVE)
      .get("/drive/v3/about")
      .query(true)
      .reply(401, { error: { message: "unauthorized" } });
    await expect(invoke(getCurrentUser, { connection })).rejects.toThrow();
  });
});
