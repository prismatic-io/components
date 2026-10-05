import { generateKeyPairSync, sign } from "node:crypto";
import type { SnsMessage } from "../types";
import {
  assertSnsUrl,
  buildSnsStringToSign,
  verifySnsMessageSignature,
} from "./snsMessages";
const CERT_URL =
  "https://sns.us-west-2.amazonaws.com/SimpleNotificationService-example.pem";
const { publicKey, privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
});
const publicKeyPem = publicKey
  .export({ type: "spki", format: "pem" })
  .toString();
const notification: SnsMessage = {
  Type: "Notification",
  MessageId: "22b80b92-fdea-4c2c-8f9d-bdfb0c7bf324",
  TopicArn: "arn:aws:sns:us-west-2:123456789012:MyTopic",
  Subject: "Amazon S3 Notification",
  Message: '{"Records":[]}',
  Timestamp: "2024-03-08T17:35:10.123Z",
  SignatureVersion: "2",
  Signature: "",
  SigningCertURL: CERT_URL,
};
const confirmation: SnsMessage = {
  Type: "SubscriptionConfirmation",
  MessageId: "165545c9-2a5c-472c-8df2-7ff2be2b3b1b",
  Token: "example-token",
  TopicArn: "arn:aws:sns:us-west-2:123456789012:MyTopic",
  Message: "You have chosen to subscribe to the topic.",
  SubscribeURL:
    "https://sns.us-west-2.amazonaws.com/?Action=ConfirmSubscription&Token=example-token",
  Timestamp: "2024-03-08T17:35:10.123Z",
  SignatureVersion: "2",
  Signature: "",
  SigningCertURL: CERT_URL,
};
const signed = (message: SnsMessage, version: "1" | "2" = "2"): SnsMessage => {
  const unsigned = { ...message, SignatureVersion: version };
  const algorithm = version === "1" ? "sha1" : "sha256";
  const signature = sign(
    algorithm,
    Buffer.from(buildSnsStringToSign(unsigned)),
    privateKey,
  );
  return { ...unsigned, Signature: signature.toString("base64") };
};
describe("buildSnsStringToSign", () => {
  test("builds a Notification string in byte-sort order with Subject and a single trailing newline", () => {
    expect(buildSnsStringToSign(notification)).toBe(
      [
        "Message",
        notification.Message,
        "MessageId",
        notification.MessageId,
        "Subject",
        notification.Subject,
        "Timestamp",
        notification.Timestamp,
        "TopicArn",
        notification.TopicArn,
        "Type",
        "Notification",
        "",
      ].join("\n"),
    );
  });
  test("omits Subject from a Notification that has none", () => {
    const { Subject: _subject, ...withoutSubject } = notification;
    expect(buildSnsStringToSign(withoutSubject)).not.toContain("Subject\n");
  });
  test("builds a SubscriptionConfirmation string with SubscribeURL and Token", () => {
    expect(buildSnsStringToSign(confirmation)).toBe(
      [
        "Message",
        confirmation.Message,
        "MessageId",
        confirmation.MessageId,
        "SubscribeURL",
        confirmation.SubscribeURL,
        "Timestamp",
        confirmation.Timestamp,
        "Token",
        confirmation.Token,
        "TopicArn",
        confirmation.TopicArn,
        "Type",
        "SubscriptionConfirmation",
        "",
      ].join("\n"),
    );
  });
});
describe("assertSnsUrl", () => {
  test.each([
    ["https://sns.us-east-1.amazonaws.com/cert.pem"],
    ["https://sns.us-gov-west-1.amazonaws.com/cert.pem"],
    ["https://sns.cn-north-1.amazonaws.com.cn/cert.pem"],
  ])("accepts %s", (url) => {
    expect(assertSnsUrl(url, "SigningCertURL").hostname).toBe(
      new URL(url).hostname,
    );
  });
  test.each([
    ["http://sns.us-east-1.amazonaws.com/cert.pem"],
    ["https://attacker.example.com/cert.pem"],
    ["https://sns.us-east-1.amazonaws.com.attacker.example.com/cert.pem"],
    ["https://sns.us-east-1.amazonaws.com@attacker.example.com/cert.pem"],
    ["https://s3.us-east-1.amazonaws.com/cert.pem"],
    ["not a url"],
    [undefined],
  ])("rejects %s", (url) => {
    expect(() => assertSnsUrl(url, "SigningCertURL")).toThrow(
      "SigningCertURL must be an HTTPS URL on an Amazon SNS domain",
    );
  });
});
describe("verifySnsMessageSignature", () => {
  const fetchCertificate = vi.fn(async () => publicKeyPem);
  beforeEach(() => {
    fetchCertificate.mockClear();
  });
  test.each([
    ["1"],
    ["2"],
  ] as const)("accepts a message signed with SignatureVersion %s", async (version) => {
    await expect(
      verifySnsMessageSignature(
        signed(notification, version),
        fetchCertificate,
      ),
    ).resolves.toBeUndefined();
    expect(fetchCertificate).toHaveBeenCalledWith(CERT_URL);
  });
  test("accepts a signed SubscriptionConfirmation", async () => {
    await expect(
      verifySnsMessageSignature(signed(confirmation), fetchCertificate),
    ).resolves.toBeUndefined();
  });
  test("rejects a message whose content changed after signing", async () => {
    const tampered = {
      ...signed(notification),
      Message: '{"Records":["forged"]}',
    };
    await expect(
      verifySnsMessageSignature(tampered, fetchCertificate),
    ).rejects.toThrow("Amazon SNS message signature is invalid");
  });
  test("rejects an unsigned message", async () => {
    await expect(
      verifySnsMessageSignature(notification, fetchCertificate),
    ).rejects.toThrow("Amazon SNS message signature is invalid");
  });
  test("rejects a certificate URL outside Amazon SNS without downloading it", async () => {
    const foreignCert = {
      ...signed(notification),
      SigningCertURL: "https://attacker.example.com/cert.pem",
    };
    await expect(
      verifySnsMessageSignature(foreignCert, fetchCertificate),
    ).rejects.toThrow(
      "SigningCertURL must be an HTTPS URL on an Amazon SNS domain",
    );
    expect(fetchCertificate).not.toHaveBeenCalled();
  });
  test("rejects an unsupported SignatureVersion", async () => {
    const unsupported = { ...signed(notification), SignatureVersion: "3" };
    await expect(
      verifySnsMessageSignature(unsupported, fetchCertificate),
    ).rejects.toThrow('Unsupported Amazon SNS SignatureVersion "3"');
  });
});
