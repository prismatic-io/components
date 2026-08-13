import {
  defaultTriggerPayload,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import { TriggerBranches } from "../constants";
import { resourceTrigger } from "./resourceTrigger";
const notification = {
  value: [
    {
      subscriptionId: "0fc0d6db-0073-42e5-a186-853da75fb308",
      changeType: "updated",
      resource: "Users/6ea91a8d-e32e-41a1-b7bd-d2d185eed0e0",
    },
  ],
};
type ObservedTriggerResult = {
  branch: string;
  payload: {
    body: {
      data: unknown;
    };
  };
  response?: {
    statusCode: number;
    contentType: string;
    body: string;
  };
};
describe("resourceTrigger", () => {
  test("URL Validation branch echoes the validation token as a text/plain 200", async () => {
    const validationToken = "validation-token-value";
    const payload = {
      ...defaultTriggerPayload(),
      queryParameters: { validationToken },
    };
    const { result } = await invokeTrigger(resourceTrigger, {}, payload);
    const observed = result as unknown as ObservedTriggerResult;
    expect(observed.branch).toBe(TriggerBranches.URLValidation);
    expect(observed.response).toEqual({
      statusCode: 200,
      contentType: "text/plain",
      body: validationToken,
    });
    expect(result?.payload).toEqual(payload);
  });
  test("Notification branch returns the parsed webhook payload with no response", async () => {
    const base = defaultTriggerPayload();
    const payload = {
      ...base,
      queryParameters: {},
      body: { data: notification, contentType: "application/json" },
      rawBody: {
        data: Buffer.from(JSON.stringify(notification)),
        contentType: "application/json",
      },
    };
    const { result } = await invokeTrigger(resourceTrigger, {}, payload);
    const observed = result as unknown as ObservedTriggerResult;
    expect(observed.branch).toBe(TriggerBranches.Notification);
    expect(observed.payload.body.data).toEqual(notification);
    expect(observed.response).toBeUndefined();
  });
});
