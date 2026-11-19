import companyActions from "./companies";
import employeeActions from "./employees";
import miscActions from "./misc";
import payScheduleActions from "./paySchedules";
import terminationActions from "./terminations";
import webhooksActions from "./webhooks";

export default {
  ...companyActions,
  ...employeeActions,
  ...miscActions,
  ...payScheduleActions,
  ...terminationActions,
  ...webhooksActions,
};
