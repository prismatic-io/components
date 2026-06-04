import assetsActions from "./assets";
import customerActions from "./customer";
import integrationEventsActions from "./integrationEvents";
import miscActions from "./misc";
import opsAlertsActions from "./opsAlerts";
import opsSchedulesActions from "./opsSchedules";
import organizationActions from "./organization";
import queueActions from "./queue";
import requestActions from "./request";
import requestTypeActions from "./requesttype";
import serviceDeskActions from "./servicedesk";

export default {
  ...serviceDeskActions,
  ...requestActions,
  ...organizationActions,
  ...customerActions,
  ...requestTypeActions,
  ...queueActions,
  ...integrationEventsActions,
  ...opsAlertsActions,
  ...opsSchedulesActions,
  ...assetsActions,
  ...miscActions,
};
