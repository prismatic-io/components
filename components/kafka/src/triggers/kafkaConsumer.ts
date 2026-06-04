import { trigger, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { kafkaConsumerInputs } from "../inputs";
import type { KafkaMessage } from "../types/consumer";

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
    } = params;

    const kafka = createClient(
      {
        clientId,
        brokers,
        connection,
      },
      context.debug.enabled,
    );

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

            messages.push({
              topic,
              partition,
              offset: message.offset,
              key: message.key ? util.types.toString(message.key) : null,
              value: message.value ? util.types.toString(message.value) : null,
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
});
