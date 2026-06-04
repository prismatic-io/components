import { action } from "@prismatic-io/spectral";
import {
  connectionInput,
  manageableBy,
  position,
  topicDescription,
  topicId,
  topicName,
  userSegmentId,
} from "../../inputs";
import { rawHttpClient } from "../../auth";
import type { Topic } from "../../types";
import { updateTopicPayload } from "../../examplePayloads";

export const updateTopic = action({
  display: {
    label: "Update Topic",
    description: "Update a topic in the Help Center.",
  },
  perform: async (
    context,
    {
      zendeskConnection,
      topicId,
      topicDescription,
      manageableBy,
      position,
      userSegmentId,
      topicName,
    },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const payload = {
      topic: {
        manageable_by: manageableBy || undefined,
        description: topicDescription || undefined,
        position: position || undefined,
        name: topicName || undefined,
        user_segment_id: userSegmentId || undefined,
      },
    };

    const { data } = await client.put<{ topic: Topic }>(
      `/community/topics/${topicId}`,
      payload,
    );

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    topicId,
    topicName,
    userSegmentId: {
      ...userSegmentId,
      required: false,
      comments: "The user segment ID to associate with the topic.",
    },
    position: {
      ...position,
      comments: "The position of the topic in the list of topics.",
    },
    topicDescription,
    manageableBy,
  },
  examplePayload: {
    data: updateTopicPayload,
  },
});
