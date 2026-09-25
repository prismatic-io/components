import { cleanNumber } from "../util";
import {
  connectionInput,
  fetchAll,
  manageableBy,
  pagination,
  position,
  topicDescription,
  topicId,
  topicName,
  userSegmentId,
} from "./common";
export const createTopicInputs = {
  zendeskConnection: connectionInput,
  topicName,
  topicDescription,
};
export const deleteTopicInputs = {
  zendeskConnection: connectionInput,
  topicId,
};
export const getTopicInputs = {
  zendeskConnection: connectionInput,
  topicId,
};
export const listTopicsInputs = {
  zendeskConnection: connectionInput,
  fetchAll,
  pagination,
};
export const updateTopicInputs = {
  zendeskConnection: connectionInput,
  topicId,
  topicName,
  userSegmentId: {
    ...userSegmentId,
    required: false,
    comments: "The user segment ID to associate with the topic.",
    clean: cleanNumber,
  },
  position: {
    ...position,
    comments: "The position of the topic in the list of topics.",
  },
  topicDescription,
  manageableBy,
};
