import accounts from "./accounts";
import agreements from "./agreements";
import groups from "./groups";
import misc from "./misc";
import resources from "./resources";
import transientDocuments from "./transientDocuments";
import users from "./users";
import webhooks from "./webhooks";

export default {
  ...accounts,
  ...agreements,
  ...groups,
  ...misc,
  ...resources,
  ...transientDocuments,
  ...users,
  ...webhooks,
};
