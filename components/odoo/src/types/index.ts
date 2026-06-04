import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type Odoo from "odoo-await";

export interface Model {
  id: number;
  name: string;
  model: string;
  state: string;
  modules: string;
  display_name: string;
}

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

export interface CustomRecord {
  id: number;
  [key: string]: unknown;
}

export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}

export interface OdooRecord extends CustomRecord {
  create_date?: string;
  write_date?: string;
}
