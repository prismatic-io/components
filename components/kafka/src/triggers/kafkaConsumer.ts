import { trigger, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { kafkaConsumerExamplePayload } from "../examplePayloads";
import { kafkaConsumerInputs } from "../inputs";
import type { DeserializedValue, KafkaMessage } from "../types/consumer";
import { createSchemaRegistryClient, deserializeBuffer } from "../utils";
export const kafkaConsumer = trigger({
  display: {
    label: "Kafka Consumer",
    description: "Consume messages from Kafka topics on a schedule.",
  },
  perform: async (context, payload, params) => {
    const {
      connection,
      clientId,
      brokers,
      consumerGroupId,
      topics,
      fromBeginning,
      maxMessages,
      autoCommit,
      sessionTimeout,
      heartbeatInterval,
      deserializeKeys,
    } = params;
    const kafka = createClient(
      {
        clientId,
        brokers,
        connection,
      },
      context.debug.enabled,
    );
    const avroEnabled = util.types.toBool(connection.fields.avroEnabled);
    const registry =
      avroEnabled && connection.fields.schemaRegistryUrl
        ? createSchemaRegistryClient(connection)
        : undefined;
    const consumer = kafka.consumer({
      groupId: consumerGroupId,
      sessionTimeout,
      heartbeatInterval,
    });
    try {
      await consumer.connect();
      const topicsToSubscribe = topics;
      await Promise.all(
        topicsToSubscribe.map((topic) =>
          consumer.subscribe({
            topic,
            fromBeginning,
          }),
        ),
      );
      const messages: KafkaMessage[] = [];
      let messageCount = 0;
      const consumePromise = new Promise<void>((resolve) => {
        let resolved = false;
        const resolveOnce = () => {
          if (!resolved) {
            resolved = true;
            resolve();
          }
        };
        consumer.run({
          autoCommit,
          eachMessage: async ({ topic, partition, message }) => {
            if (messageCount >= maxMessages) {
              resolveOnce();
              return;
            }
            let key: DeserializedValue | null = null;
            let value: DeserializedValue | null = null;
            if (registry && message.value) {
              value = await deserializeBuffer(
                registry,
                message.value,
                context.logger,
              );
            } else if (message.value) {
              value = util.types.toString(message.value);
            }
            if (registry && deserializeKeys && message.key) {
              key = await deserializeBuffer(
                registry,
                message.key,
                context.logger,
              );
            } else if (message.key) {
              key = util.types.toString(message.key);
            }
            messages.push({
              topic,
              partition,
              offset: message.offset,
              key,
              value,
              timestamp: message.timestamp,
              headers: message.headers,
            });
            messageCount++;
            if (messageCount >= maxMessages) {
              resolveOnce();
            }
          },
        });
        setTimeout(() => resolveOnce(), 10000);
      });
      await consumePromise;
      await consumer.stop();
      await consumer.disconnect();
      return {
        payload: {
          ...payload,
          body: {
            data: {
              messages,
              messageCount: messages.length,
              consumerGroupId,
              topics: topicsToSubscribe,
            },
          },
        },
      };
    } catch (error) {
      await consumer.disconnect().catch(() => {});
      throw error;
    }
  },
  inputs: kafkaConsumerInputs,
  scheduleSupport: "required",
  synchronousResponseSupport: "invalid",
  examplePayload: kafkaConsumerExamplePayload,
});
