import account from "./account";
import assets from "./assets";
import brands from "./brands";
import folder from "./folder";
import libraries from "./libraries";
import misc from "./misc";
import webhooks from "./webhooks";
import workspaceProjects from "./workspaceProjects";

export default {
  ...account,
  ...assets,
  ...brands,
  ...libraries,
  ...webhooks,
  ...workspaceProjects,
  ...folder,
  ...misc,
};
