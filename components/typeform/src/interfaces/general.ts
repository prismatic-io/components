import type { Connection } from "@prismatic-io/spectral";

export interface FetchAllData<T> {
  data: {
    items: T[];
  };
}

export interface GenericListData<T> {
  items: T[];
  page_count: number;
  total_items: number;
}

export interface Trigger {
  connection: Connection;
  formId: string;
  secret: string;
  formResponse: boolean;
  formResponsePartial: boolean;
}
