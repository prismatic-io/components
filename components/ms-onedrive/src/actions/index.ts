import drives from "./drives";
import files from "./files";
import groups from "./groups";
import misc from "./misc";
import sites from "./sites";
import subscriptions from "./subscriptions";
import users from "./users";

export default {
  ...drives,
  ...files,
  ...groups,
  ...misc,
  ...sites,
  ...subscriptions,
  ...users,
};
