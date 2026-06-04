import deployments from "./deployments";
import devices from "./devices";
import groups from "./groups";
import packages from "./packages";
import { rawRequest } from "./rawRequest";

export default {
  ...deployments,
  ...devices,
  ...groups,
  ...packages,
  rawRequest,
};
