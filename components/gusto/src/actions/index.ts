import companyActions from "./companies";
import employeeActions from "./employees";
import payScheduleActions from "./paySchedules";
import terminationActions from "./terminations";
import webhooksActions from "./webhooks";

import rawRequest from "./rawRequest";

export default {
  ...companyActions,
  ...employeeActions,
  ...payScheduleActions,
  ...terminationActions,
  ...webhooksActions,
  rawRequest,
};
