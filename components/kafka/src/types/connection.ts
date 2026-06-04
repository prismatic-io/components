export const supportedMechanismTypes = [
  "plain",
  "scram-sha-256",
  "scram-sha-512",
] as const;

export type SupportedMechanismTypes = (typeof supportedMechanismTypes)[number];
