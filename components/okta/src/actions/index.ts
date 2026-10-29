import applications from "./applications";
import eventHooks from "./eventHooks";
import groups from "./groups";
import misc from "./misc";
import policies from "./policies";
import users from "./users";

export default {
  ...applications,
  ...eventHooks,
  ...groups,
  ...misc,
  ...policies,
  ...users,
};
