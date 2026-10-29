import boardActions from "./boards";
import itemActions from "./items";
import miscActions from "./misc";
import webhookActions from "./webhooks";

export default {
  ...boardActions,
  ...miscActions,
  ...itemActions,
  ...webhookActions,
};
