import {
  defaultTriggerPayload,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import { dropboxWebhook } from "./dropboxWebhook";
const SIGNING_SECRET = "exampleSigningSecret";
const RAW_BODY =
  '{"list_folder":{"accounts":["dbid:AAH4f99T0taONIb-OurWxbNQ6ywGRopQngc"]}}';
const VALID_SIGNATURE =
  "ee9c6f8373c2af33cdf54cf7c0bb34b7eb52f5d79abc53fbfeafc7d67c283d67";
const notificationPayload = (signature: string) => ({
  ...defaultTriggerPayload(),
  headers: {
    "Content-Type": "application/json",
    "X-Dropbox-Signature": signature,
  },
  rawBody: { data: RAW_BODY, contentType: "application/json" },
});
describe("dropboxWebhook signature verification", () => {
  test("a matching signature passes and branches to Notification", async () => {
    const { result } = await invokeTrigger(
      dropboxWebhook,
      undefined,
      notificationPayload(VALID_SIGNATURE),
      { signingSecret: SIGNING_SECRET },
    );
    expect(result.branch).toBe("Notification");
    expect(result.payload.rawBody.data).toBe(RAW_BODY);
    expect(result).not.toHaveProperty("response");
  });
  test("a mismatched signature throws", async () => {
    await expect(
      invokeTrigger(
        dropboxWebhook,
        undefined,
        notificationPayload("0".repeat(64)),
        { signingSecret: SIGNING_SECRET },
      ),
    ).rejects.toThrow(/Error validating message signature/);
  });
  test("a signature computed with a different secret throws", async () => {
    await expect(
      invokeTrigger(
        dropboxWebhook,
        undefined,
        notificationPayload(VALID_SIGNATURE),
        { signingSecret: "someOtherSigningSecret" },
      ),
    ).rejects.toThrow(/Error validating message signature/);
  });
  test("an absent x-dropbox-signature header throws", async () => {
    const payload = {
      ...defaultTriggerPayload(),
      headers: { "Content-Type": "application/json" },
      rawBody: { data: RAW_BODY, contentType: "application/json" },
    };
    await expect(
      invokeTrigger(dropboxWebhook, undefined, payload, {
        signingSecret: SIGNING_SECRET,
      }),
    ).rejects.toThrow(/Error validating message signature/);
  });
});
describe("dropboxWebhook verification request", () => {
  test("echoes the challenge as text/plain and branches to Verification Request", async () => {
    const payload = {
      ...defaultTriggerPayload(),
      queryParameters: { challenge: "exampleChallengeToken" },
    };
    const { result } = await invokeTrigger(dropboxWebhook, undefined, payload, {
      signingSecret: SIGNING_SECRET,
    });
    expect(result.branch).toBe("Verification Request");
    const { response } = result as typeof result & {
      response?: {
        statusCode: number;
        contentType: string;
        body: string;
      };
    };
    expect(response).toEqual({
      statusCode: 200,
      contentType: "text/plain",
      body: "exampleChallengeToken",
    });
  });
  test("the challenge branch returns before any signature check", async () => {
    const payload = {
      ...notificationPayload("0".repeat(64)),
      queryParameters: { challenge: "exampleChallengeToken" },
    };
    const { result } = await invokeTrigger(dropboxWebhook, undefined, payload, {
      signingSecret: SIGNING_SECRET,
    });
    expect(result.branch).toBe("Verification Request");
  });
});
describe("dropboxWebhook simulated test execution", () => {
  test("skips signature verification and branches to Notification", async () => {
    const { result } = await invokeTrigger(
      dropboxWebhook,
      { isSimulatedTestExecution: true },
      notificationPayload("0".repeat(64)),
      { signingSecret: SIGNING_SECRET },
    );
    expect(result.branch).toBe("Notification");
    expect(result).not.toHaveProperty("response");
  });
  test("a challenge still wins over the simulated-execution short-circuit", async () => {
    const payload = {
      ...defaultTriggerPayload(),
      queryParameters: { challenge: "exampleChallengeToken" },
    };
    const { result } = await invokeTrigger(
      dropboxWebhook,
      { isSimulatedTestExecution: true },
      payload,
      { signingSecret: SIGNING_SECRET },
    );
    expect(result.branch).toBe("Verification Request");
  });
});
