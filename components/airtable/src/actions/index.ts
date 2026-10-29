import baseActions from "./bases";
import miscActions from "./misc";
import recordActions from "./records";
import userActions from "./users";
import webhookActions from "./webhooks";

export default {
  ...baseActions,
  ...recordActions,
  ...userActions,
  ...miscActions,
  ...webhookActions,
};
