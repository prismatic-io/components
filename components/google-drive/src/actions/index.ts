import changesActions from "./changes";
import driveActivityActions from "./driveActivity";
import drivesActions from "./drives";
import filesActions from "./files";
import foldersActions from "./folders";
import miscActions from "./misc";
import webhooksActions from "./webhooks";
export default {
  ...filesActions,
  ...foldersActions,
  ...drivesActions,
  ...changesActions,
  ...webhooksActions,
  ...driveActivityActions,
  ...miscActions,
};
