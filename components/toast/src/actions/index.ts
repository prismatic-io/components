import deposit from "./deposit";
import employee from "./employee";
import entry from "./entry";
import job from "./job";
import misc from "./misc";
import restaurant from "./restaurant";
import shift from "./shift";

export default {
  ...deposit,
  ...employee,
  ...entry,
  ...job,
  ...misc,
  ...restaurant,
  ...shift,
};
