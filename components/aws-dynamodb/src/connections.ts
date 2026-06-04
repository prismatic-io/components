import { connection } from "@prismatic-io/spectral";
import { assumeRoleConnection } from "aws-utils";

export const accessKeySecretPair = connection({
  key: "apiKeySecret",
  display: {
    description: "Authenticates requests to Amazon DynamoDB using an API Key and API Secret.",
    label: "Access Key and Secret",
  },
  inputs: {
    accessKeyId: {
      label: "Access Key ID",
      placeholder: "Enter Access Key ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "An AWS IAM Access Key ID. Learn how to create access keys in the [AWS IAM documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).",
      example: "AKIAIOSFODNN7EXAMPLE",
    },
    secretAccessKey: {
      label: "Secret Access Key",
      placeholder: "Enter Secret Access Key",
      type: "password",
      required: true,
      shown: true,
      comments:
        "An AWS IAM Secret Access Key. Learn how to create access keys in the [AWS IAM documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).",
      example: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    },
  },
});

export default [accessKeySecretPair, assumeRoleConnection];
