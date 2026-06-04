import type { DataSetSchema } from "./DataSetSchema";

export type CreateDataSetBody = {
  name: string;
  description: string;
  rows?: number;
  schema: DataSetSchema;
};
