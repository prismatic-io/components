import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { RedshiftDataClient, StatusString } from "@aws-sdk/client-redshift-data";
import type { Credentials } from "aws-utils";

export interface RedshiftDataApiClientResult {
  client: HttpClient;
  credentials: Credentials;
  host: string;
}

export interface GetAllStatementsParams {
  client: RedshiftDataClient;
  databaseName: string;
  status: StatusString;
  workgroupName: string | undefined;
  clusterIdentifier: string | undefined;
  statementName: string | undefined;
}
