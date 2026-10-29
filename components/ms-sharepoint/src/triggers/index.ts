import { drivePollingTrigger } from "./drivePollingTrigger";
import { folderPollingTrigger } from "./folderPollingTrigger";
import { instanceDeployWebhook } from "./instanceDeployWebhook";
import { pollSiteChanges } from "./pollSiteChanges";
import { webhook } from "./webhook";

export default {
  webhook,
  instanceDeployWebhook,
  pollSiteChanges,
  drivePollingTrigger,
  folderPollingTrigger,
};
