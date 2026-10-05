import {
  dateTimeSchema,
  requestChargedSchema,
  retentionModeSchema,
} from "./shared";
export const getObjectLockConfigurationOutputSchema = {
  type: "object" as const,
  properties: {
    ObjectLockConfiguration: {
      type: "object" as const,
      properties: {
        ObjectLockEnabled: { type: "string", enum: ["Enabled"] },
        Rule: {
          type: "object" as const,
          properties: {
            DefaultRetention: {
              type: "object" as const,
              properties: {
                Mode: retentionModeSchema,
                Days: { type: "number" },
                Years: { type: "number" },
              },
              required: [],
            },
          },
          required: [],
        },
      },
      required: [],
    },
  },
  required: ["ObjectLockConfiguration"],
};
export const getObjectRetentionOutputSchema = {
  type: "object" as const,
  properties: {
    Retention: {
      type: "object" as const,
      properties: {
        Mode: retentionModeSchema,
        RetainUntilDate: dateTimeSchema,
      },
      required: [],
    },
  },
  required: ["Retention"],
};
export const putObjectLockConfigurationOutputSchema = {
  type: "object" as const,
  properties: {
    RequestCharged: requestChargedSchema,
  },
  required: [],
};
export const putObjectRetentionOutputSchema = {
  type: "object" as const,
  properties: {
    RequestCharged: requestChargedSchema,
  },
  required: [],
};
