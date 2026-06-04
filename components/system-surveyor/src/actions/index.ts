import elementProfiles from "./elementProfiles";
import misc from "./misc";
import reports from "./reports";
import sites from "./sites";
import surveys from "./surveys";
import teams from "./teams";
import webhooks from "./webhooks";

export default {
  ...elementProfiles,
  ...misc,
  ...reports,
  ...sites,
  ...surveys,
  ...teams,
  ...webhooks,
};
