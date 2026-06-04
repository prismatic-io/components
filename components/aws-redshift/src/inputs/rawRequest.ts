import { input, util } from "@prismatic-io/spectral";
import { RAW_REQUEST_ACTION_OPTIONS } from "../constants";
import { awsConnection, awsRegion } from "./common";

const body = input({
  label: "Body",
  type: "code",
  language: "json",
  required: true,
  comments:
    "The JSON payload sent to the selected Redshift Data API operation. The required fields vary by action — refer to the AWS Redshift Data API documentation for the expected structure of each operation.",
  example: JSON.stringify(
    {
      WorkgroupName: "my-workgroup",
      Database: "analytics",
      Sql: "SELECT * FROM users WHERE status = 'active'",
      SecretArn: "arn:aws:secretsmanager:us-east-1:123456789012:secret:redshift-credentials",
    },
    null,
    2,
  ),
  clean: util.types.toString,
});

const action = input({
  label: "Action",
  type: "string",
  required: true,
  comments:
    "The Redshift Data API operation to invoke. Determines which API method is called with the provided body.",
  example: "RedshiftData.ExecuteStatement",
  placeholder: "Enter the action",
  model: RAW_REQUEST_ACTION_OPTIONS,
  clean: util.types.toString,
});

export const rawRequestInputs = {
  awsConnection,
  awsRegion,
  body,
  action,
};
