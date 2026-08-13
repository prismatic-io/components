import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type Odoo from "odoo-await";
export interface Pagination {
  client: HttpClient;
  model: string;
  fetchAll: boolean;
  params?: Record<string, unknown>;
  filter?: unknown[];
  fields?: string[];
}
export interface LegacyPagination {
  client: Odoo;
  model: string;
  fetchAll: boolean;
  params?: Record<string, unknown>;
  filter?: unknown;
  fields?: string[];
}
