import type { ActionContext, Connection, DataSourceContext } from "@prismatic-io/spectral";

export interface AuthCredentials {
  UserName: string;
  Password: string;
  CompanyDB?: string;
  CompanyName?: string;
}

export type Generic =
  | number
  | string
  | boolean
  | Record<string, unknown>
  | Record<string, unknown>[];

export type Records = Record<string, Generic>;

export interface MapPicklist {
  data: Records[];
  keyName: string;
  keyLabel: string;
  orderKey: string;
}

export interface LoginClientParams {
  credentials: AuthCredentials;
  context: ActionContext | DataSourceContext;
  debug: boolean;
  connection: Connection;
}
export interface CustomAxiosClient {
  context: ActionContext | DataSourceContext;
  debug: boolean;
  connection: Connection;
  cookie?: string[];
}
