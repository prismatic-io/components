import type { ConnectionInput } from "@prismatic-io/spectral";

export interface ConnectionParams {
  key: string;
  defaultScopes?: string;
  additionalInputs?: Record<string, ConnectionInput>;
}
