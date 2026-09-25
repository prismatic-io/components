import {
  cursorLinksSchema,
  cursorMetaSchema,
  offsetPaginationProperties,
} from "./pagination";
export const topicSchema = {
  type: "object" as const,
  properties: {
    created_at: { type: "string" },
    description: { type: ["string", "null"] },
    follower_count: { type: "integer" },
    html_url: { type: "string" },
    id: { type: "integer" },
    manageable_by: { type: "string", enum: ["staff", "managers"] },
    name: { type: "string" },
    position: { type: "integer" },
    updated_at: { type: "string" },
    url: { type: "string" },
    user_segment_id: { type: ["integer", "null"] },
  },
  required: ["name"],
};
export const createTopicOutputSchema = {
  type: "object" as const,
  properties: { topic: topicSchema },
  required: ["topic"],
};
export const deleteTopicOutputSchema = { type: "string" as const };
export const getTopicOutputSchema = {
  type: "object" as const,
  properties: { topic: topicSchema },
  required: ["topic"],
};
export const listTopicsOutputSchema = {
  type: "object" as const,
  properties: {
    topics: { type: "array", items: topicSchema },
    meta: cursorMetaSchema,
    links: cursorLinksSchema,
    ...offsetPaginationProperties,
  },
  required: ["topics"],
};
export const updateTopicOutputSchema = {
  type: "object" as const,
  properties: { topic: topicSchema },
  required: ["topic"],
};
