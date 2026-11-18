import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import { TriggerBranches } from "../constants";
import { webhookExamplePayload } from "../examplePayloads";
import { webhook } from "./webhook";

describe("webhook perform", () => {
  test("passes a change notification through on the Notification branch", async () => {
    const { payload } = webhookExamplePayload;
    const { result } = await invokeTrigger(webhook, {}, payload);
    expect(result).toEqual({ payload, branch: TriggerBranches.Notification });
  });

  test("echoes the validation token as text/plain on the URL Validation branch", async () => {
    const payload = {
      ...webhookExamplePayload.payload,
      queryParameters: { validationToken: "token-123" },
    };
    const { result } = await invokeTrigger(webhook, {}, payload);
    expect(result).toEqual({
      payload,
      response: {
        statusCode: 200,
        contentType: "text/plain",
        body: "token-123",
      },
      branch: TriggerBranches.URLValidation,
    });
  });
});
