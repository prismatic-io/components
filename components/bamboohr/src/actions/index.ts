import companyFilesActions from "./companyFiles";
import employeeFilesActions from "./employeeFiles";
import employeeActions from "./employees";
import miscActions from "./misc";
import tabularDataActions from "./tabularData";
import timeOffActions from "./timeOff";
import webhookActions from "./webhooks";

export default {
  ...companyFilesActions,
  ...employeeActions,
  ...employeeFilesActions,
  ...miscActions,
  ...tabularDataActions,
  ...timeOffActions,
  ...webhookActions,
};
