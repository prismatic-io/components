export const API_BASE_URL = "https://api.monday.com/v2";
export const CURRENT_API_VERSION = "2026-07";

export const MAX_LIMIT = 500;
export const BATCH_SIZE = 50;

export const WEBHOOK_BRANCH_CHALLENGE = "Challenge Verification";
export const WEBHOOK_BRANCH_NOTIFICATION = "Notification";
export const WEBHOOK_JWT_ALGORITHMS: Record<string, string> = {
  HS256: "sha256",
};
export const WEBHOOK_JWT_CLOCK_SKEW_SECONDS = 60;
