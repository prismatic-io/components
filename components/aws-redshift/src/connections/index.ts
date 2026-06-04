import { connection } from "@prismatic-io/spectral";
import { assumeRoleConnection } from "aws-utils";

export const accessKeySecretPair = connection({
  key: "awsAccessKeySecret",
  display: {
    label: "Access Key and Secret",
    description: "Authenticate requests to AWS using an Access Key and Secret Key.",
  },
  inputs: {
    accessKeyId: {
      label: "Access Key ID",
      type: "string",
      required: true,
      comments: "The AWS Access Key ID used to authenticate requests to the Redshift Data API.",
      example: "AKIAIOSFODNN7EXAMPLE",
      placeholder: "Enter the AWS Access Key ID",
    },
    secretAccessKey: {
      label: "Secret Access Key",
      type: "password",
      required: true,
      comments: "The AWS Secret Access Key paired with the Access Key ID for request signing.",
      example: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    },
  },
});

export default [accessKeySecretPair, assumeRoleConnection];
