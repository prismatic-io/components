import connections from "./connections";

export const API_URL = "https://graph.microsoft.com/v1.0";

export const CONNECTION_KEYS = connections.map((connection) => connection.key);

export const SUCCESS_RESPONSE = { success: true } as const;

export enum TriggerBranches {
  Notification = "Notification",
  URLValidation = "URL Validation",
}

export const MAX_MINUTES_EXPIRATION_USERS_GROUPS_SUBSCRIPTION = 41760;

export enum SubscriptionResources {
  Users = "users",
  Groups = "groups",
}
