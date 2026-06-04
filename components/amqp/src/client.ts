import { type ActionLogger, type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { connect } from "amqplib";
import { amqpConnection } from "./connections";

export const createClient = async (
  connection: Connection,
  debug: boolean,
  logger: ActionLogger,
) => {
  if (connection.key !== amqpConnection.key) {
    throw new ConnectionError(connection, `Unsupported authorization method ${connection.key}.`);
  }

  const { host, port, password, protocol, username, vhost } = connection.fields;
  try {
    const client = await connect({
      hostname: util.types.toString(host),
      port: util.types.toNumber(port),
      password: util.types.toString(password),
      username: util.types.toString(username),
      protocol: util.types.toString(protocol),
      vhost: util.types.toString(vhost),
    });

    if (debug) {
      client.on("error", (err) => logger.error("AMQP connection error:", err));
      client.on("close", () => logger.info("AMQP connection closed"));
      client.on("blocked", (reason) => logger.warn("AMQP connection blocked:", reason));
      client.on("unblocked", () => logger.info("AMQP connection unblocked"));
    }

    return client;
  } catch (err) {
    throw new ConnectionError(
      connection,
      `An error occurred connecting to the AMQP server. Verify that your configured endpoint, port, vhost, protocol and username/password are valid and that the server is publicly accessible. Full error from AMQP: ${err}`,
    );
  }
};
