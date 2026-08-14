import { metaSchema } from "./common";
export const packageSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    latestPackageVersionId: { type: "string" },
    latestVersion: { type: "string" },
    name: { type: "string" },
    publisher: { type: "string" },
    source: { type: "string", enum: ["pdq", "custom"] },
  },
  required: ["id"],
};
export const getPackageOutputSchema = {
  type: "object" as const,
  properties: {
    data: packageSchema,
  },
};
export const listPackagesOutputSchema = {
  type: "object" as const,
  properties: {
    data: { type: "array", items: packageSchema },
    meta: metaSchema,
  },
};
