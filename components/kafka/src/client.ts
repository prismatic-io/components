import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import {
  Kafka,
  type KafkaConfig,
  logLevel as KafkaLogLevel,
  type SASLOptions,
} from "kafkajs";
import { basic } from "./connections/basic";
import { SUPPORTED_MECHANISM_TYPES } from "./constants";
import type { CreateClientProps } from "./types/client";
import type { SupportedMechanismTypes } from "./types/connection";
import {
  createMskOauthBearerProvider,
  isMskIamConnection,
  normalizeLineBreaks,
} from "./utils";
const getMskIamPayload = (
  { clientId, brokers }: CreateClientProps,
  connection: Connection,
): KafkaConfig => {
  const region = util.types.toString(connection.fields.awsRegion).trim();
  if (!region) {
    throw new ConnectionError(
      connection,
      "AWS Region is required when using an Amazon MSK IAM connection.",
    );
  }
  const caCert = util.types.toString(connection.fields.caCert);
  return {
    clientId,
    brokers,
    ssl: caCert ? { ca: normalizeLineBreaks(caCert) } : true,
    sasl: {
      mechanism: "oauthbearer",
      oauthBearerProvider: createMskOauthBearerProvider(connection, region),
    },
  };
};
export const getPayload = (props: CreateClientProps): KafkaConfig => {
  const { clientId, brokers, connection } = props;
  if (!connection) {
    return { clientId, brokers };
  }
  if (isMskIamConnection(connection)) {
    return getMskIamPayload(props, connection);
  }
  if (connection.key !== basic.key) {
    throw new ConnectionError(
      connection,
      `Unknown Connection type provided: '${connection.key}'.`,
    );
  }
  const mechanism = util.types.toString(
    connection.fields.authMechanism,
  ) as SupportedMechanismTypes;
  if (!SUPPORTED_MECHANISM_TYPES.includes(mechanism)) {
    throw new ConnectionError(
      connection,
      `Invalid Authentication Mechanism specified: '${mechanism}'.`,
    );
  }
  const config: KafkaConfig = {
    clientId,
    brokers,
  };
  const sslEnabled = util.types.toBool(connection.fields.sslEnabled);
  const caCert = util.types.toString(connection.fields.caCert);
  const clientCert = util.types.toString(connection.fields.clientCert);
  const clientKey = util.types.toString(connection.fields.clientKey);
  if (sslEnabled) {
    config.ssl = {};
    if (caCert) {
      config.ssl.ca = normalizeLineBreaks(caCert);
    }
    if (clientCert && clientKey) {
      config.ssl.cert = normalizeLineBreaks(clientCert);
      config.ssl.key = normalizeLineBreaks(clientKey);
    }
  }
  const username = connection.fields.username
    ? util.types.toString(connection.fields.username).trim()
    : "";
  const password = connection.fields.password
    ? util.types.toString(connection.fields.password).trim()
    : "";
  const hasClientCerts = clientCert && clientKey;
  if (username && password && !hasClientCerts) {
    config.sasl = {
      mechanism,
      username,
      password,
    } as SASLOptions;
  }
  return config;
};
export const createClient = (props: CreateClientProps, debug: boolean) => {
  const payload = getPayload(props);
  if (debug) {
    payload.logLevel = KafkaLogLevel.DEBUG;
  }
  return new Kafka(payload);
};
