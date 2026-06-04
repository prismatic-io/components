import { ConnectionError, util } from "@prismatic-io/spectral";
import {
  Kafka,
  type KafkaConfig,
  type SASLOptions,
  logLevel as KafkaLogLevel,
} from "kafkajs";
import { basic } from "./connections/basic";
import type { CreateClientProps } from "./types/client";
import {
  type SupportedMechanismTypes,
  supportedMechanismTypes,
} from "./types/connection";
import { normalizeLineBreaks } from "./utils";

export const getPayload = ({
  clientId,
  brokers,
  connection,
}: CreateClientProps): KafkaConfig => {
  if (!connection) {
    return { clientId, brokers };
  }

  if (connection.key !== basic.key) {
    throw new ConnectionError(connection, "Unknown Connection type provided.");
  }

  const mechanism = util.types.toString(
    connection.fields.authMechanism,
  ) as SupportedMechanismTypes;
  if (!supportedMechanismTypes.includes(mechanism)) {
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

  if (sslEnabled) {
    config.ssl = {};

    if (connection.fields.caCert) {
      config.ssl.ca = normalizeLineBreaks(connection.fields.caCert);
    }

    if (connection.fields.clientCert && connection.fields.clientKey) {
      config.ssl.cert = normalizeLineBreaks(connection.fields.clientCert);
      config.ssl.key = normalizeLineBreaks(connection.fields.clientKey);
    }
  }

  
  const username = connection.fields.username
    ? util.types.toString(connection.fields.username).trim()
    : "";
  const password = connection.fields.password
    ? util.types.toString(connection.fields.password).trim()
    : "";
  const hasClientCerts =
    connection.fields.clientCert && connection.fields.clientKey;

  
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
