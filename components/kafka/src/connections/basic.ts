import { connection } from "@prismatic-io/spectral";
import { SUPPORTED_MECHANISM_TYPES } from "../constants";

export const basic = connection({
  key: "basic",
  display: {
    label: "Basic Authentication",
    description:
      "Authenticate using a username and password, with optional SSL/TLS support.",
  },
  inputs: {
    username: {
      label: "Username",
      placeholder: "Username",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The SASL username used to authenticate with the Kafka brokers, issued by the cluster administrator or the managed Kafka provider's console.",
      example: "kafka-user",
    },
    password: {
      label: "Password",
      placeholder: "Password",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The SASL password paired with the username, issued alongside it by the cluster administrator or the managed Kafka provider's console.",
      example: "kafka-password",
    },
    authMechanism: {
      label: "Authentication Mechanism",
      type: "string",
      required: true,
      shown: true,
      comments: "Desired authorization method for passing username/password.",
      model: SUPPORTED_MECHANISM_TYPES.map((value) => ({
        label: value,
        value,
      })),
    },
    sslEnabled: {
      label: "Enable SSL/TLS",
      type: "boolean",
      required: false,
      shown: true,
      comments: "Enable SSL/TLS for secure connections.",
      default: "false",
    },
    caCert: {
      label: "CA Certificate",
      placeholder: "Paste a CA certificate in PEM format",
      type: "text",
      required: false,
      shown: true,
      comments:
        "Certificate Authority (CA) certificate in PEM format. Leave blank to use the default trust store when the brokers present a publicly trusted certificate.",
      example:
        "-----BEGIN CERTIFICATE-----\nMIIDdzCCAl+gAwIBAgIEAgAAuTANBgkqhkiG9w0BAQUFADBaMQswCQYDVQQGEwJJ\n-----END CERTIFICATE-----",
    },
    clientCert: {
      label: "Client Certificate",
      placeholder: "Paste a client certificate in PEM format",
      type: "text",
      required: false,
      shown: true,
      comments:
        "Client certificate in PEM format (if required by the Kafka cluster).",
      example:
        "-----BEGIN CERTIFICATE-----\nMIIDdzCCAl+gAwIBAgIEAgAAuTANBgkqhkiG9w0BAQUFADBaMQswCQYDVQQGEwJJ\n-----END CERTIFICATE-----",
    },
    clientKey: {
      label: "Client Key",
      placeholder: "Paste a client private key in PEM format",
      type: "text",
      required: false,
      shown: true,
      comments:
        "Client private key in PEM format (if required by the Kafka cluster).",
      example:
        "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7VJTUt9Us8cKB\n-----END PRIVATE KEY-----",
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
