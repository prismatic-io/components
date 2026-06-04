import { Pagination } from "./Pagination";

export type XeroResponse<T, K extends string> = {
  Id: string;
  Status: string;
  ProviderName: string;
  DateTimeUTC: string;
  pagination?: Pagination;
} & Record<K, T[]>;
