import type { ActionLogger, Connection } from "@prismatic-io/spectral";

export interface CreateDynamoClientParams {
  awsConnection: Connection;
  region: string;
  debug?: boolean;
  logger?: ActionLogger;
}
