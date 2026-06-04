import { type MqttClient, type MqttProtocol, connectAsync } from "mqtt";
import {
  type ActionLogger,
  type Connection,
  ConnectionError,
  util,
} from "@prismatic-io/spectral/dist/";
import { validateConnection } from "./utils";

export const createClient = async (
  connection: Connection,
  debug: boolean,
  logger: ActionLogger,
): Promise<MqttClient> => {
  validateConnection(connection);

  const username = connection.fields.username
    ? util.types.toString(connection.fields.username)
    : undefined;

  const password = connection.fields.password
    ? util.types.toString(connection.fields.password)
    : undefined;

  const port = connection.fields.port
    ? util.types.toNumber(connection.fields.port)
    : undefined;

  const host = util.types.toString(connection.fields.host);

  try {
    const client = await connectAsync({
      connectTimeout: 20000,
      username,
      password,
      protocol: util.types.toString(connection.fields.protocol) as MqttProtocol,
      port,
      host,
    });

    if (debug) {
      client.on("connect", () => logger.debug("MQTT connected"));
      client.on("reconnect", () => logger.debug("MQTT reconnecting"));
      client.on("close", () => logger.debug("MQTT connection closed"));
      client.on("error", (err) => logger.error("MQTT error:", err));
      client.on("packetsend", (packet) =>
        logger.debug("MQTT packet sent:", JSON.stringify(packet)),
      );
      client.on("packetreceive", (packet) =>
        logger.debug("MQTT packet received:", JSON.stringify(packet)),
      );
    }

    return client;
  } catch (error) {
    throw new ConnectionError(
      connection,
      `Can't connect to MQTT server: ${error}`,
    );
  }
};
