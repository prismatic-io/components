import { rawRequest } from "./misc";
import applications from "./applications";
import candidates from "./candidates";
import jobs from "./jobs";
import users from "./users";

export default {
  ...users,
  ...candidates,
  ...applications,
  ...jobs,
  rawRequest,
};
