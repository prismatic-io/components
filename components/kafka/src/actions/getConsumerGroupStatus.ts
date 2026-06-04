import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { getConsumerGroupStatusInputs } from "../inputs";
import type {
  ConsumerGroupMember,
  ConsumerGroupStatus,
  PartitionLag,
  TopicLag,
} from "../types/consumer";
import { getConsumerGroupStatusExamplePayload } from "../examplePayloads";

export const getConsumerGroupStatus = action({
  display: {
    label: "Get Consumer Group Status",
    description:
      "Get the status and lag information for a consumer group. Specify topics for better performance, or leave empty to check all topics.",
  },
  perform: async (
    context,
    { connection, clientId, brokers, consumerGroupId, topicsToCheck },
  ) => {
    const kafka = createClient(
      {
        clientId,
        brokers,
        connection,
      },
      context.debug.enabled,
    );

    const admin = kafka.admin();

    try {
      await admin.connect();

      const groupId = consumerGroupId;

      
      const groups = await admin.describeGroups([groupId]);
      const group = groups.groups[0];

      
      let topicsToProcess: string[];

      if (topicsToCheck && topicsToCheck.length > 0) {
        
        topicsToProcess = topicsToCheck;
      } else {
        
        const allTopics = await admin.listTopics();
        topicsToProcess = allTopics.filter(
          (topic) => !topic.startsWith("__") && !topic.startsWith("_"),
        );
      }

      const topicsWithLag: TopicLag[] = [];

      
      const allOffsets = await Promise.all(
        topicsToProcess.map(async (topic) => ({
          topic,
          partitions:
            (
              await admin.fetchOffsets({
                groupId,
                topics: [topic],
                resolveOffsets: true,
              })
            )[0]?.partitions ?? [],
        })),
      );

      for (const topicOffsetInfo of allOffsets) {
        try {
          const { topic, partitions: offsetPartitions } = topicOffsetInfo;

          if (offsetPartitions && offsetPartitions.length > 0) {
            
            const topicOffsets = await admin.fetchTopicOffsets(topic);

            const partitionsWithLag: PartitionLag[] = offsetPartitions.map(
              (offsetInfo) => {
                const currentOffset =
                  topicOffsets.find((o) => o.partition === offsetInfo.partition)
                    ?.offset || "0";
                const committedOffset = offsetInfo.offset || "0";
                const lag =
                  util.types.toBigInt(currentOffset) -
                  util.types.toBigInt(committedOffset);

                return {
                  partition: offsetInfo.partition,
                  committedOffset,
                  currentOffset,
                  lag: util.types.toString(lag),
                };
              },
            );

            const totalLag = partitionsWithLag.reduce(
              (sum, p) => sum + util.types.toBigInt(p.lag),
              util.types.toBigInt(0),
            );

            topicsWithLag.push({
              topic,
              partitions: partitionsWithLag,
              totalLag: util.types.toString(totalLag),
            });
          }
        } catch (_e) {
          
        }
      }

      await admin.disconnect();

      const result: ConsumerGroupStatus = {
        groupId,
        state: group.state,
        protocolType: group.protocolType,
        protocol: group.protocol,
        members: group.members.map(
          (m): ConsumerGroupMember => ({
            memberId: m.memberId,
            clientId: m.clientId,
            clientHost: m.clientHost,
          }),
        ),
        topicsWithOffsets: topicsWithLag,
        totalLag: util.types.toString(
          topicsWithLag.reduce(
            (sum, t) => sum + util.types.toBigInt(t.totalLag),
            util.types.toBigInt(0),
          ),
        ),
      };

      return {
        data: result,
      };
    } catch (error) {
      await admin.disconnect().catch(() => {});
      throw error;
    }
  },
  inputs: getConsumerGroupStatusInputs,
  examplePayload: getConsumerGroupStatusExamplePayload,
});

export default getConsumerGroupStatus;
