const { createClientMock, getMock } = vi.hoisted(() => ({
  createClientMock: vi.fn(),
  getMock: vi.fn(),
}));
vi.mock("@prismatic-io/spectral/dist/clients/http", () => ({
  createClient: createClientMock,
}));
import { generateKeyPairSync, sign } from "node:crypto";
import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import { snsS3NotificationWebhookExamplePayload } from "../examplePayloads";
import type { SnsMessage } from "../types";
import { buildSnsStringToSign } from "../utils";
import { snsS3NotificationWebhook } from "./snsS3NotificationWebhook";
const CERT_URL =
  "https://sns.us-west-2.amazonaws.com/SimpleNotificationService-example.pem";
const SUBSCRIBE_URL =
  "https://sns.us-west-2.amazonaws.com/?Action=ConfirmSubscription&TopicArn=arn:aws:sns:us-west-2:123456789012:MyTopic&Token=example-token";
const { publicKey, privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
});
const publicKeyPem = publicKey
  .export({ type: "spki", format: "pem" })
  .toString();
const signed = (
  message: Omit<
    SnsMessage,
    "Signature" | "SignatureVersion" | "SigningCertURL"
  >,
) => {
  const unsigned = {
    ...message,
    SignatureVersion: "2",
    SigningCertURL: CERT_URL,
    Signature: "",
  };
  const signature = sign(
    "sha256",
    Buffer.from(buildSnsStringToSign(unsigned)),
    privateKey,
  );
  return { ...unsigned, Signature: signature.toString("base64") };
};
const notification = signed(
  snsS3NotificationWebhookExamplePayload.payload.body
    .data as unknown as SnsMessage,
);
const confirmation = signed({
  Type: "SubscriptionConfirmation",
  MessageId: "165545c9-2a5c-472c-8df2-7ff2be2b3b1b",
  Token: "example-token",
  TopicArn: "arn:aws:sns:us-west-2:123456789012:MyTopic",
  Message: "You have chosen to subscribe to the topic.",
  SubscribeURL: SUBSCRIBE_URL,
  Timestamp: "2024-03-08T17:35:10.123Z",
});
const payloadWithBody = (body: string) => ({
  ...snsS3NotificationWebhookExamplePayload.payload,
  rawBody: { data: Buffer.from(body) },
  body: { data: body },
});
describe("snsS3NotificationWebhook", () => {
  beforeEach(() => {
    createClientMock.mockReset();
    getMock.mockReset();
    getMock.mockResolvedValue({ status: 200, data: "" });
    createClientMock.mockImplementation(({ baseUrl }: { baseUrl: string }) =>
      baseUrl === CERT_URL
        ? { get: async () => ({ data: publicKeyPem }) }
        : { get: getMock },
    );
  });
  test("Notification: verifies the signature and routes the parsed body to the Notification branch", async () => {
    const payload = payloadWithBody(JSON.stringify(notification));
    const { result } = await invokeTrigger(
      snsS3NotificationWebhook,
      {},
      payload,
    );
    expect(result).toEqual({
      branch: "Notification",
      payload: { ...payload, body: { data: notification } },
    });
    expect(createClientMock).toHaveBeenCalledWith({
      baseUrl: CERT_URL,
      responseType: "text",
    });
    expect(getMock).not.toHaveBeenCalled();
  });
  test("SubscriptionConfirmation: verifies the signature, GETs the SubscribeURL and routes to the Subscribe branch", async () => {
    const payload = payloadWithBody(JSON.stringify(confirmation));
    const { result } = await invokeTrigger(
      snsS3NotificationWebhook,
      {},
      payload,
    );
    expect(createClientMock).toHaveBeenCalledWith({ baseUrl: SUBSCRIBE_URL });
    expect(getMock).toHaveBeenCalledWith("");
    expect(result).toEqual({
      branch: "Subscribe",
      payload: { ...payload, body: { data: confirmation } },
    });
  });
  test("rejects a forged SubscriptionConfirmation without calling its SubscribeURL", async () => {
    const forged = {
      ...confirmation,
      SubscribeURL: "https://sns.us-west-2.amazonaws.com/?forged",
    };
    const payload = payloadWithBody(JSON.stringify(forged));
    await expect(
      invokeTrigger(snsS3NotificationWebhook, {}, payload),
    ).rejects.toThrow("Amazon SNS message signature is invalid");
    expect(getMock).not.toHaveBeenCalled();
  });
  test("rejects a SubscribeURL outside Amazon SNS without calling it", async () => {
    const foreign = signed({
      ...confirmation,
      SubscribeURL: "https://attacker.example.com/confirm",
    });
    const payload = payloadWithBody(JSON.stringify(foreign));
    await expect(
      invokeTrigger(snsS3NotificationWebhook, {}, payload),
    ).rejects.toThrow(
      "SubscribeURL must be an HTTPS URL on an Amazon SNS domain",
    );
    expect(getMock).not.toHaveBeenCalled();
  });
  test("rejects an unsigned Notification", async () => {
    const { Signature: _signature, ...unsigned } = notification;
    const payload = payloadWithBody(JSON.stringify(unsigned));
    await expect(
      invokeTrigger(snsS3NotificationWebhook, {}, payload),
    ).rejects.toThrow("Amazon SNS message signature is invalid");
  });
  test("rejects an unknown message type before any outbound call", async () => {
    const payload = payloadWithBody(
      JSON.stringify({ ...notification, Type: "Other" }),
    );
    await expect(
      invokeTrigger(snsS3NotificationWebhook, {}, payload),
    ).rejects.toThrow(
      'Message type was not "Notification" or "SubscriptionConfirmation", but "Other" instead.',
    );
    expect(createClientMock).not.toHaveBeenCalled();
  });
  describe("Topic ARN", () => {
    test("accepts a Notification whose TopicArn matches the configured value", async () => {
      const payload = payloadWithBody(JSON.stringify(notification));
      const { result } = await invokeTrigger(
        snsS3NotificationWebhook,
        {},
        payload,
        {
          expectedTopicArn: notification.TopicArn,
        },
      );
      expect(result).toEqual({
        branch: "Notification",
        payload: { ...payload, body: { data: notification } },
      });
    });
    test("rejects a Notification whose TopicArn does not match the configured value", async () => {
      const payload = payloadWithBody(JSON.stringify(notification));
      await expect(
        invokeTrigger(snsS3NotificationWebhook, {}, payload, {
          expectedTopicArn: "arn:aws:sns:us-west-2:123456789012:SomeOtherTopic",
        }),
      ).rejects.toThrow(/TopicArn .* did not match the configured Topic ARN/);
    });
    test("accepts any signed topic when the input is unset", async () => {
      const payload = payloadWithBody(JSON.stringify(notification));
      const { result } = await invokeTrigger(
        snsS3NotificationWebhook,
        {},
        payload,
        {
          expectedTopicArn: "",
        },
      );
      expect(result).toEqual({
        branch: "Notification",
        payload: { ...payload, body: { data: notification } },
      });
    });
    test("rejects a SubscriptionConfirmation from a foreign topic without calling its SubscribeURL", async () => {
      const payload = payloadWithBody(JSON.stringify(confirmation));
      await expect(
        invokeTrigger(snsS3NotificationWebhook, {}, payload, {
          expectedTopicArn: "arn:aws:sns:us-west-2:123456789012:SomeOtherTopic",
        }),
      ).rejects.toThrow(/TopicArn .* did not match the configured Topic ARN/);
      expect(getMock).not.toHaveBeenCalled();
    });
  });
});
