import { awsAccessKeySecret } from "./connections/awsAccessKeySecret";
import { awsAssumeRole } from "./connections/awsAssumeRole";
export const CONSUME_TIMEOUT_MS = 10000;
export const INTERNAL_TOPIC_PREFIX = "__";
export const SUPPORTED_MECHANISM_TYPES = [
  "plain",
  "scram-sha-256",
  "scram-sha-512",
] as const;
export const MSK_IAM_CONNECTION_KEYS: string[] = [
  awsAccessKeySecret.key,
  awsAssumeRole.key,
];
export const ROLE_SESSION_NAME = "integration-session";
export const TOKEN_REFRESH_MARGIN_MS = 60000;
