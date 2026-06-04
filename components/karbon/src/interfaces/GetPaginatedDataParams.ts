import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { Pagination } from "./Pagination";

export interface GetPaginatedDataParams {
  client: HttpClient;
  endpoint: string;
  getAllData: boolean;
  pagination: Pagination;
  $orderby?: string;
  $filter?: string;
}
