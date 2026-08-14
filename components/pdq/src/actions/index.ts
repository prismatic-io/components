import deployments from "./deployments";
import devices from "./devices";
import groups from "./groups";
import misc from "./misc";
import packages from "./packages";
export default {
  ...deployments,
  ...devices,
  ...groups,
  ...packages,
  ...misc,
};
