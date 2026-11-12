import {
  createConnection,
  invokeTrigger,
} from "@prismatic-io/spectral/testing";
import type { TriggerPayload } from "@prismatic-io/spectral";
import { accountTrigger } from "./accountTrigger";
import { docusignOauthConnection } from "../connections";
import { accountTriggerExamplePayload } from "../examplePayloads";
import { computeHash } from "../util";

const connectKey = "test-connect-key";
const rawBody = JSON.stringify(accountTriggerExamplePayload.payload.body.data);
const validSignature = computeHash({ secret: connectKey, payload: rawBody });
const params = {
  connectKey,
  connection: createConnection(docusignOauthConnection, {}),
  webhookEvents: ["envelope-sent"],
};

const buildPayload = (headers: Record<string, string>): TriggerPayload => ({
  ...accountTriggerExamplePayload.payload,
  headers: { "content-type": "application/json", ...headers },
  rawBody: { data: rawBody, contentType: "application/json" },
});

describe("accountTrigger.perform", () => {
  it("accepts a valid HMAC signature and returns the payload unchanged", async () => {
    const payload = buildPayload({ "x-docusign-signature-1": validSignature });
    const { result } = await invokeTrigger(accountTrigger, {}, payload, params);
    expect(result?.payload).toEqual(payload);
  });

  it("accepts a valid signature in any x-docusign-signature-N header", async () => {
    const wrongSignature = computeHash({ secret: "other", payload: rawBody });
    const payload = buildPayload({
      "x-docusign-signature-1": wrongSignature,
      "X-DocuSign-Signature-2": validSignature,
    });
    const { result } = await invokeTrigger(accountTrigger, {}, payload, params);
    expect(result?.payload).toEqual(payload);
  });

  it("throws when the signature does not match", async () => {
    const wrongSignature = computeHash({ secret: "other", payload: rawBody });
    await expect(
      invokeTrigger(
        accountTrigger,
        {},
        buildPayload({ "x-docusign-signature-1": wrongSignature }),
        params,
      ),
    ).rejects.toThrow("Invalid or missing signature.");
  });

  it("rejects a wrong-length signature as invalid", async () => {
    await expect(
      invokeTrigger(
        accountTrigger,
        {},
        buildPayload({ "x-docusign-signature-1": "c2hvcnQ=" }),
        params,
      ),
    ).rejects.toThrow("Invalid or missing signature.");
  });

  it("throws when no signature header is present", async () => {
    await expect(
      invokeTrigger(accountTrigger, {}, buildPayload({}), params),
    ).rejects.toThrow("Invalid or missing signature.");
  });

  it("skips signature verification on a simulated test execution", async () => {
    const payload = buildPayload({});
    const { result } = await invokeTrigger(
      accountTrigger,
      { isSimulatedTestExecution: true },
      payload,
      params,
    );
    expect(result?.payload).toEqual(payload);
  });
});
