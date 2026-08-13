import { SchemaRegistry } from "@kafkajs/confluent-schema-registry";
import { type Connection, util } from "@prismatic-io/spectral";
import type { DeserializedValue } from "../types/consumer";
export const createSchemaRegistryClient = (
  connection: Connection,
): SchemaRegistry => {
  const { schemaRegistryUrl, schemaRegistryApiKey, schemaRegistryApiSecret } =
    connection.fields;
  const url = util.types.toString(schemaRegistryUrl);
  return new SchemaRegistry({
    host: url,
    auth: schemaRegistryApiKey
      ? {
          username: util.types.toString(schemaRegistryApiKey),
          password: util.types.toString(schemaRegistryApiSecret),
        }
      : undefined,
  });
};
export const deserializeBuffer = async (
  registry: SchemaRegistry,
  buffer: Buffer,
  logger: {
    warn: (message: string) => void;
  },
): Promise<DeserializedValue> => {
  try {
    return (await registry.decode(buffer)) as Record<string, unknown>;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown decode error";
    logger.warn(
      `Avro deserialization failed, falling back to string: ${message}`,
    );
    return buffer.toString();
  }
};
