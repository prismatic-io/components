import consumerGroupsActions from "./consumerGroups";
import messagesActions from "./messages";
import topicsActions from "./topics";
export default {
  ...consumerGroupsActions,
  ...messagesActions,
  ...topicsActions,
};
