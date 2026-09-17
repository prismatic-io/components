import nock from "nock";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { connection as connectionDefinition } from "../../connections";
import { createFileWebhook } from "./createFileWebhook";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const DRIVE = "https://www.googleapis.com";
describe("createFileWebhook", () => {
  afterEach(() => nock.cleanAll());
  test("creates a webhook for a file", async () => {
    nock(DRIVE)
      .post("/drive/v3/files/ret08u3rv24htgh289g/watch")
      .query(true)
      .reply(200, {
        kind: "api#channel",
        resourceId: "o3hgv1538sdjfh1abcde",
        type: "web_hook",
        address: "https://hooks.example.io/trigger/WEBHOOK_ID",
        expiration: "1426325213000",
      });
    const { result } = await invoke(createFileWebhook, {
      connection,
      resourceId: "ret08u3rv24htgh289g",
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
      .post("/drive/v3/files/ret08u3rv24htgh289g/watch")
      .query(true)
      .reply(404, { error: { message: "File not found" } });
    await expect(
      invoke(createFileWebhook, {
        connection,
        resourceId: "ret08u3rv24htgh289g",
        endpoint: "https://hooks.example.io/trigger/WEBHOOK_ID",
        expiration: "1426325213000",
      }),
    ).rejects.toThrow();
  });
});
