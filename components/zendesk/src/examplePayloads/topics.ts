import type { Topic } from "../types";
import { paginationAttributes } from "./general";
const createTopicRaw = {
  topic: {
    name: "How to make fish stew",
    id: 37486578,
    description: "A guide to making the perfect fish stew",
  },
};
const getTopicRaw = createTopicRaw;
const listTopicsRaw = {
  ...paginationAttributes,
  topics: [
    {
      html_url:
        "https://example.zendesk.com/hc/en-us/community/topics/10-Using-Help-Center-Tips-Tricks",
      id: 10,
      name: "Using Help Center - Tips & Tricks",
      url: "https://example.zendesk.com/api/v2/community/topics/10.json",
    },
    {
      html_url:
        "https://example.zendesk.com/hc/en-us/community/topics/11-Using-Help-Center-Getting-Started-Guide",
      id: 11,
      name: "Using Help Center - Getting Started Guide",
      url: "https://example.zendesk.com/api/v2/community/topics/11.json",
    },
  ],
};
const updateTopicRaw = createTopicRaw;
export const createTopicExamplePayload: {
  data: {
    topic: Topic;
  };
} = {
  data: createTopicRaw,
};
export const deleteTopicExamplePayload = { data: "" };
export const getTopicExamplePayload: {
  data: {
    topic: Topic;
  };
} = {
  data: getTopicRaw,
};
export const listTopicsExamplePayload = { data: listTopicsRaw };
export const updateTopicExamplePayload: {
  data: {
    topic: Topic;
  };
} = {
  data: updateTopicRaw,
};
