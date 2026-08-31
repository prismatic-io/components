import files from "./files";
import folders from "./folders";
import misc from "./misc";
import objects from "./objects";
import sharedLinks from "./sharedLinks";
import users from "./users";
import webhooks from "./webhooks";
export default {
  ...files,
  ...folders,
  ...objects,
  ...sharedLinks,
  ...users,
  ...webhooks,
  ...misc,
};
