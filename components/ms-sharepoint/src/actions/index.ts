import drives from "./drives";
import files from "./files";
import folders from "./folders";
import items from "./items";
import lists from "./lists";
import misc from "./misc";
import sites from "./sites";
import subscriptions from "./subscriptions";
import users from "./users";

export default {
  ...drives,
  ...files,
  ...folders,
  ...items,
  ...lists,
  ...misc,
  ...sites,
  ...subscriptions,
  ...users,
};
