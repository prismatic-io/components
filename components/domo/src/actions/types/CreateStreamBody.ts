import type { DataSetSchema } from "./DataSetSchema";

export type CreateStreamBody = {
  dataSet?: {
    name?: string;
    description?: string;
    schema?: DataSetSchema;
    updateMethod?: string;
  };
};
