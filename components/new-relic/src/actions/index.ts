import logsActions from "./logs";
import eventsActions from "./events";
import metricsActions from "./metrics";
import miscActions from "./misc";
export default {
  ...logsActions,
  ...eventsActions,
  ...metricsActions,
  ...miscActions,
};
