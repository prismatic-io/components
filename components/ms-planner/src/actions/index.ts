import buckets from "./buckets";
import misc from "./misc";
import plans from "./plans";
import tasks from "./tasks";

export default {
  ...plans,
  ...buckets,
  ...tasks,
  ...misc,
};
