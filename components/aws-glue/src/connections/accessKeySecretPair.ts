import { connection } from "@prismatic-io/spectral";

export const accessKeySecretPair = connection({
  key: "apiKeySecret",
  display: {
    label: "Access Key and Secret",
    description:
      "Authenticate requests to AWS Glue using an Access Key and Secret.",
  },
  inputs: {
    accessKeyId: {
      label: "Access Key ID",
      placeholder: "Access Key ID",
      type: "string",
      required: true,
      shown: true,
      comments: "The AWS IAM Access Key ID used to authenticate requests.",
      example: "AKIAIOSFODNN7EXAMPLE",
    },
    secretAccessKey: {
      label: "Secret Access Key",
      placeholder: "Secret Access Key",
      type: "password",
      required: true,
      shown: true,
      comments: "The AWS IAM Secret Access Key used to authenticate requests.",
      example: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    },
  },
});
