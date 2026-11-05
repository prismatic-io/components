import type { Connection as PrismaticConnection } from "@prismatic-io/spectral";
import type { Connection, Schema } from "jsforce";

export interface FlowMetadata {
  fullName: string;
  label?: string;
  description?: string;
  processType?: string;
  status?: "Active" | "Draft" | "Obsolete" | "InvalidDraft";
  runInMode?: "DefaultMode" | "SystemModeWithoutSharing" | "SystemModeWithSharing";
  [key: string]: unknown;
}

export type FlowTriggerInstanceState =
  | {
      flowFullName?: string;
      outboundMessageFullName?: string;
    }
  | undefined;

export type CreateFlowRecordSubscriptionParams = {
  version: string;
  name: string;
  endpointUrl: string;
  flowMetadata?: object;
  triggerObject: string;
  triggerOn: string;
  filterFormula?: string;
  fields?: string[];
  dynamicFields?: unknown;
  client: Connection<Schema>;
};

export type OnInstanceDeployFlowFunctionParams = {
  version: string;
  prefix: string;
  triggerObject: string;
  triggerOn: string;
  fields: string[];
  flowMetadata?: object;
  filterFormula?: string;
  connection: PrismaticConnection;
};

export type OnInstanceDeleteFlowFunctionParams = {
  version: string;
  prefix: string;
  connection: PrismaticConnection;
  triggerObject: string;
};
