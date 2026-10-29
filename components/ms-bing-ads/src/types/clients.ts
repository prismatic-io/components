import type { Connection } from "@prismatic-io/spectral";
import type { Client } from "soap";

export type Arg = unknown;

export type Args = Record<string, Arg>;

export interface GetClientProps {
  connection: Connection;
  soapHeaders?: Record<string, string | number | boolean>;
  timeout?: number;
  wsdl: string;
}

export interface GetMethodProps {
  args?: Args;
  client: Client;
  rawXml?: string;
  soapAction: string;
  targetNamespace?: string;
  debug?: boolean;
}

export interface GetRestClientProps {
  connection: Connection;
  debug?: boolean;
  accountId?: string;
  customerId?: string;
}
