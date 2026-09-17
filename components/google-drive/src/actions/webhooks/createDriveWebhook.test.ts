import nock from "nock";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { connection as connectionDefinition } from "../../connections";
import { createDriveWebhook } from "./createDriveWebhook";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const DRIVE = "https://www.googleapis.com";
describe("createDriveWebhook", () => {
  afterEach(() => nock.cleanAll());
  test("creates a webhook for a drive", async () => {
    nock(DRIVE)
      .get("/drive/v3/changes/startPageToken")
      .query(true)
      .reply(200, { startPageToken: "12345" });
    nock(DRIVE).post("/drive/v3/changes/watch").query(true).reply(200, {
      kind: "api#channel",
      resourceId: "jkkJZYhd8PPV6-Xto6QIo1abcde",
      type: "web_hook",
      address: "https://hooks.example.io/trigger/WEBHOOK_ID",
      expiration: "1426325213000",
    });
    const { result } = await invoke(createDriveWebhook, {
      connection,
      driveId: "0AAvGyortvuqEXAMPLE",
      endpoint: "https://hooks.example.io/trigger/WEBHOOK_ID",
      expiration: "1426325213000",
    });
    expect(result.data).toMatchObject({
      address: "https://hooks.example.io/trigger/WEBHOOK_ID",
      expiration: "1426325213000",
    });
  });
  test("surfaces an API error", async () => {
    nock(DRIVE)
      .get("/drive/v3/changes/startPageToken")
      .query(true)
      .reply(500, { error: { message: "boom" } });
    await expect(
      invoke(createDriveWebhook, {
        connection,
        driveId: "0AAvGyortvuqEXAMPLE",
        endpoint: "https://hooks.example.io/trigger/WEBHOOK_ID",
        expiration: "1426325213000",
      }),
    ).rejects.toThrow();
  });
});
