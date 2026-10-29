import { createTopic, setTopicIamPolicy } from "./create";
import { deleteTopic } from "./delete";
import { getTopic } from "./get";
import { listTopics } from "./list";
import { updateTopic } from "./update";

export default {
  createTopic,
  updateTopic,
  getTopic,
  listTopics,
  deleteTopic,
  setTopicIamPolicy,
};
