import miscActions from "./misc";
import modelActions from "./models";
import recordActions from "./records";

export default { ...recordActions, ...modelActions, ...miscActions };
