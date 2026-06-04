import topicSubscriptions from "./topic";
import postSubscriptinos from "./post";
import sectionSubscriptions from "./section";
import articleSubscriptions from "./article";

export default {
  ...topicSubscriptions,
  ...postSubscriptinos,
  ...sectionSubscriptions,
  ...articleSubscriptions,
};
