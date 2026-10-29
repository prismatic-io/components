import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import { awsRegion as awsRegionOriginal } from "aws-utils";

export const awsRegion = input({ ...awsRegionOriginal, required: true });

export const awsConnection = input({
  label: "AWS Connection",
  type: "connection",
  required: true,
  comments: "Select the AWS connection to use for Redshift Data API access.",
});

export const databaseName = input({
  label: "Database Name",
  type: "string",
  required: true,
  comments:
    "The name of the database to connect to. This parameter is required when authenticating using either Secrets Manager or temporary credentials.",
  example: "analytics",
  placeholder: "Enter the database name",
  clean: util.types.toString,
});

export const clusterIdentifier = input({
  label: "Cluster Identifier",
  type: "string",
  required: false,
  comments:
    "The identifier of the Redshift cluster. Required for cluster connections using either Secrets Manager or temporary credentials.",
  example: "my-redshift-cluster",
  placeholder: "Enter the cluster identifier",
  clean: toOptionalString,
});

export const workgroupName = input({
  label: "Workgroup Name",
  type: "string",
  required: false,
  comments:
    "The name of the Redshift serverless workgroup. This parameter is required when connecting to a serverless workgroup and authenticating using either Secrets Manager or temporary credentials.",
  example: "my-workgroup",
  placeholder: "Enter the workgroup name",
  clean: toOptionalString,
});

export const statementId = input({
  label: "Statement ID",
  type: "string",
  required: true,
  comments:
    "The unique identifier of the executed SQL statement returned by the Redshift Data API.",
  example: "12345678-1234-1234-1234-123456789012",
  placeholder: "Enter the statement ID",
  clean: util.types.toString,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  comments:
    "When enabled, automatically fetches all pages of results. Next Token and Max Results inputs are ignored when this is enabled.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export const statementName = input({
  label: "Statement Name",
  type: "string",
  required: false,
  comments:
    "A descriptive label assigned to the SQL statement to help identify it when listing or filtering statements later.",
  example: "GetActiveUsers",
  placeholder: "Enter the statement name",
  clean: toOptionalString,
});
