import type { DataSetSchema } from "./DataSetSchema";

export type UpdateDataSetBody = {
  name?: string;
  description?: string;
  pdpEnabled?: boolean;
  schema?: DataSetSchema;
};
