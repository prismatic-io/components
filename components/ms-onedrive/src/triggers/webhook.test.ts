import {
  defaultTriggerPayload,
  invokeTrigger,
} from "@prismatic-io/spectral/testing";
import { TriggerBranches } from "../enums";
import { webhookExamplePayload } from "../examplePayloads";
import { webhook } from "./webhook";

const VALIDATION_TOKEN =
  "Validation: Testing client application reachability for subscription Request-Id: b4a3e5ab-1f5c-4a7d-9b0e-3c2f6d8e1a40";

describe("webhook", () => {
  test("answers Graph's URL validation with the token as plain text", async () => {
    const { result } = await invokeTrigger(
      webhook,
      {},
      {
        ...defaultTriggerPayload(),
        queryParameters: { validationToken: VALIDATION_TOKEN },
      },
    );

    expect(result?.branch).toBe(TriggerBranches.URLValidation);
    expect(result?.response).toEqual({
      statusCode: 200,
      contentType: "text/plain",
      body: VALIDATION_TOKEN,
    });
  });

  test("passes a change notification through on the Notification branch", async () => {
    const payload = {
      ...defaultTriggerPayload(),
      body: webhookExamplePayload.payload.body,
    };

    const { result } = await invokeTrigger(webhook, {}, payload);

    expect(result?.branch).toBe(TriggerBranches.Notification);
    expect(result?.payload).toEqual(payload);
  });
});
