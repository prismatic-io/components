import { connection } from "@prismatic-io/spectral";
import { supportedMechanismTypes } from "../types/connection";
export const basic = connection({
  key: "basic",
  display: {
    label: "Basic Username/Password",
    description:
      "Basic Username and Password connection with optional SSL/TLS support.",
  },
  inputs: {
    username: {
      label: "Username",
      placeholder: "Username",
      type: "string",
      required: true,
      shown: true,
      comments: "Username.",
    },
    password: {
      label: "Password",
      placeholder: "Password",
      type: "password",
      required: true,
      shown: true,
      comments: "Password.",
    },
    authMechanism: {
      label: "Authentication Mechanism",
      type: "string",
      model: supportedMechanismTypes.map((value) => ({ label: value, value })),
      comments: "Desired authorization method for passing username/password.",
      required: true,
    },
    sslEnabled: {
      label: "Enable SSL/TLS",
      type: "boolean",
      default: "false",
      comments: "Enable SSL/TLS for secure connections.",
    },
    caCert: {
      label: "CA Certificate",
      type: "text",
      required: false,
      comments:
        "Certificate Authority (CA) certificate in PEM format. Required for SSL connections.",
    },
    clientCert: {
      label: "Client Certificate",
      type: "text",
      required: false,
      comments:
        "Client certificate in PEM format (if required by the Kafka cluster).",
    },
    clientKey: {
      label: "Client Key",
      type: "text",
      required: false,
      comments:
        "Client private key in PEM format (if required by the Kafka cluster).",
    },
    avroEnabled: {
      label: "Enable Avro Deserialization",
      type: "boolean",
      default: "false",
      comments:
        "Enable Confluent Schema Registry Avro decoding for consumed messages.",
    },
    schemaRegistryUrl: {
      label: "Schema Registry URL",
      type: "string",
      required: false,
      comments:
        "The Confluent Schema Registry endpoint (e.g., https://psrc-xxxxx.region.confluent.cloud).",
    },
    schemaRegistryApiKey: {
      label: "Schema Registry API Key",
      type: "string",
      required: false,
      comments: "API key for authenticating with the Schema Registry.",
    },
    schemaRegistryApiSecret: {
      label: "Schema Registry API Secret",
      type: "password",
      required: false,
      comments: "API secret for authenticating with the Schema Registry.",
    },
  },
});
