import application from "./application";
import change from "./change";
import group from "./group";
import misc from "./misc";
import subscription from "./subscription";
import user from "./user";

export default {
  ...user,
  ...group,
  ...application,
  ...change,
  ...subscription,
  ...misc,
};
