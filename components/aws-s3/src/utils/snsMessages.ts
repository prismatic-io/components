import { verify } from "node:crypto";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import type { SnsCertificateFetcher, SnsMessage } from "../types";
const SNS_HOSTNAME = /^sns\.[a-z0-9-]+\.amazonaws\.com(\.cn)?$/;
const SIGNED_FIELDS: Record<string, (keyof SnsMessage)[]> = {
  Notification: [
    "Message",
    "MessageId",
    "Subject",
    "Timestamp",
    "TopicArn",
    "Type",
  ],
  SubscriptionConfirmation: [
    "Message",
    "MessageId",
    "SubscribeURL",
    "Timestamp",
    "Token",
    "TopicArn",
    "Type",
  ],
  UnsubscribeConfirmation: [
    "Message",
    "MessageId",
    "SubscribeURL",
    "Timestamp",
    "Token",
    "TopicArn",
    "Type",
  ],
};
const SIGNATURE_ALGORITHMS: Record<string, string> = {
  "1": "sha1",
  "2": "sha256",
};
export const assertSnsUrl = (value: unknown, field: string): URL => {
  let url: URL | undefined;
  try {
    url = new URL(String(value));
  } catch {
    url = undefined;
  }
  if (url?.protocol !== "https:" || !SNS_HOSTNAME.test(url.hostname)) {
    throw new Error(`${field} must be an HTTPS URL on an Amazon SNS domain.`);
  }
  return url;
};
const downloadCertificate = async (certificateUrl: string): Promise<string> => {
  const { data } = await createClient({
    baseUrl: certificateUrl,
    responseType: "text",
  }).get("");
  return data;
};
export const verifySnsMessageSignature = async (
  message: SnsMessage,
  fetchCertificate: SnsCertificateFetcher = downloadCertificate,
): Promise<void> => {
  const algorithm = SIGNATURE_ALGORITHMS[message.SignatureVersion];
  if (!algorithm) {
    throw new Error(
      `Unsupported Amazon SNS SignatureVersion "${message.SignatureVersion}".`,
    );
  }
  const certificateUrl = assertSnsUrl(message.SigningCertURL, "SigningCertURL");
  const certificate = await fetchCertificate(certificateUrl.href);
  const isValid =
    typeof message.Signature === "string" &&
    message.Signature.length > 0 &&
    verify(
      algorithm,
      Buffer.from(buildSnsStringToSign(message)),
      certificate,
      Buffer.from(message.Signature, "base64"),
    );
  if (!isValid) {
    throw new Error(
      "Amazon SNS message signature is invalid; the message was rejected.",
    );
  }
};
export const buildSnsStringToSign = (message: Partial<SnsMessage>): string =>
  (SIGNED_FIELDS[message.Type] ?? [])
    .filter((field) => message[field] !== undefined)
    .map((field) => `${field}\n${message[field]}\n`)
    .join("");
