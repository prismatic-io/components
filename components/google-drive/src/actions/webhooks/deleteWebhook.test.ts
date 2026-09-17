import nock from "nock";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { connection as connectionDefinition } from "../../connections";
import { deleteWebhook } from "./deleteWebhook";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const DRIVE = "https://www.googleapis.com";
describe("deleteWebhook", () => {
  afterEach(() => nock.cleanAll());
  test("stops a webhook channel", async () => {
    nock(DRIVE).post("/drive/v3/channels/stop").query(true).reply(200, {});
    const { result } = await invoke(deleteWebhook, {
      connection,
      webhookId: "00000000-0000-0000-0000-000000000000",
      resourceId: "ret08u3rv24htgh289g",
    });
    expect(result).toHaveProperty("data");
  });
  test("surfaces an API error", async () => {
    nock(DRIVE)
      .post("/drive/v3/channels/stop")
      .query(true)
      .reply(404, { error: { message: "Channel not found" } });
    await expect(
      invoke(deleteWebhook, {
        connection,
        webhookId: "00000000-0000-0000-0000-000000000000",
        resourceId: "ret08u3rv24htgh289g",
      }),
    ).rejects.toThrow();
  });
});
