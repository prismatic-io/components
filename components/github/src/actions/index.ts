import git from "./git";
import issues from "./issues";
import misc from "./misc";
import orgs from "./orgs";
import pulls from "./pulls";
import reposWebhooks from "./reposWebhooks";
import users from "./users";
import workflows from "./workflows";
export default {
  ...git,
  ...issues,
  ...misc,
  ...orgs,
  ...pulls,
  ...reposWebhooks,
  ...users,
  ...workflows,
};
