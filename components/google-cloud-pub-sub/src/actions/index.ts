import policies from "./policies";
import rawRequest from "./rawRequest";
import subscriptions from "./subscriptions";
import topics from "./topics";

export default {
  ...topics,
  ...subscriptions,
  ...policies,
  rawRequest,
};
