import { connection } from "@prismatic-io/spectral";
import { awsRegions } from "aws-utils";
export const awsAccessKeySecret = connection({
  key: "awsAccessKeySecret",
  display: {
    label: "IAM Access Key and Secret",
    description:
      "Authenticates to an Amazon MSK cluster that uses IAM access control with an AWS IAM access key and secret.",
  },
  inputs: {
    accessKeyId: {
      label: "Access Key ID",
      placeholder: "Enter AWS IAM Access Key ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "AWS IAM Access Key ID used for programmatic access. Create access keys in the [AWS IAM Console](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) under Security Credentials.",
      example: "AKIAIOSFODNN7EXAMPLE",
    },
    secretAccessKey: {
      label: "Secret Access Key",
      placeholder: "Enter AWS IAM Secret Access Key",
      type: "password",
      required: true,
      shown: true,
      comments:
        "AWS IAM Secret Access Key paired with the Access Key ID. This value is only shown once when created in the [AWS IAM Console](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).",
      example: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    },
    awsRegion: {
      label: "AWS Region",
      placeholder: "Select AWS Region",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The AWS Region of the Amazon MSK cluster, used to sign the authentication token.",
      example: "us-east-1",
      model: awsRegions.map((region) => ({ label: region, value: region })),
    },
    caCert: {
      label: "CA Certificate",
      placeholder: "Paste a CA certificate in PEM format",
      type: "text",
      required: false,
      shown: true,
      comments:
        "Certificate Authority (CA) certificate in PEM format. Leave blank to trust the Amazon-issued broker certificates through the default trust store.",
      example:
        "-----BEGIN CERTIFICATE-----\nMIIDdzCCAl+gAwIBAgIEAgAAuTANBgkqhkiG9w0BAQUFADBaMQswCQYDVQQGEwJJ\n-----END CERTIFICATE-----",
    },
    avroEnabled: {
      label: "Enable Avro Deserialization",
      type: "boolean",
      required: false,
      shown: true,
      comments:
        "Enable Confluent Schema Registry Avro decoding for consumed messages.",
      default: "false",
    },
    schemaRegistryUrl: {
      label: "Schema Registry URL",
      placeholder: "https://psrc-xxxxx.region.confluent.cloud",
      type: "string",
      required: false,
      shown: true,
      comments:
        "The Confluent Schema Registry endpoint, such as `https://psrc-xxxxx.region.confluent.cloud`, shown in the Confluent Cloud console on the environment's Schema Registry page.",
      example: "https://psrc-4v5jk.us-east-1.aws.confluent.cloud",
    },
    schemaRegistryApiKey: {
      label: "Schema Registry API Key",
      placeholder: "Enter Schema Registry API key",
      type: "password",
      required: false,
      shown: true,
      comments:
        "API key for authenticating with the Schema Registry. Create one in the Confluent Cloud console under the environment's Schema Registry API keys.",
      example: "ABCDEFGHIJKLMNOP",
    },
    schemaRegistryApiSecret: {
      label: "Schema Registry API Secret",
      placeholder: "Enter Schema Registry API secret",
      type: "password",
      required: false,
      shown: true,
      comments:
        "API secret paired with the Schema Registry API key. It is shown once, when the key is created in the Confluent Cloud console.",
      example:
        "cfltAbCdEfGhIjKlMnOpQrStUvWxYz0123456789AbCdEfGhIjKlMnOpQrStUvWx",
    },
  },
});
