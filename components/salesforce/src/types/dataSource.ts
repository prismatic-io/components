import type { DataSourceContext, Element } from "@prismatic-io/spectral";
import type { Connection, Schema } from "jsforce";

export interface GetRecordDataSource {
  context: DataSourceContext;
  salesforceClient: Connection<Schema>;
  recordType: string;
  labelKey?: string;
  valueKey?: string;
  sortValueInput?: string;
}

export type ElementWithLabel = Omit<Element, "label"> & { label: string };
