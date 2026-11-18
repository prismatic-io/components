import { odataCollectionSchema } from "./common";

const detectedAppSchema = {
  type: "object" as const,
  properties: {
    "@odata.type": { type: "string" },
    id: { type: "string" },
    displayName: { type: ["string", "null"] },
    version: { type: ["string", "null"] },
    sizeInByte: { type: ["integer", "null"] },
    deviceCount: { type: ["integer", "null"] },
    publisher: { type: ["string", "null"] },
    platform: {
      type: ["string", "null"],
      enum: [
        "unknown",
        "windows",
        "windowsMobile",
        "windowsHolographic",
        "ios",
        "macOS",
        "chromeOS",
        "androidOSP",
        "androidDeviceAdministrator",
        "androidWorkProfile",
        "androidDedicatedAndFullyManaged",
        "unknownFutureValue",
        null,
      ],
    },
  },
};

export const getDetectedAppOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    ...detectedAppSchema.properties,
  },
  required: ["id"],
};

export const listDetectedAppsOutputSchema = {
  type: "object" as const,
  properties: {
    ...odataCollectionSchema.properties,
    value: { type: "array", items: detectedAppSchema },
  },
  required: ["value"],
};
