import applications from "./applications";
import attachments from "./attachments";
import candidates from "./candidates";
import jobs from "./jobs";
import misc from "./misc";
import users from "./users";

export default {
  ...users,
  ...candidates,
  ...applications,
  ...attachments,
  ...jobs,
  ...misc,
};
