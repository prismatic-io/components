import boards from "./boards";
import comments from "./comments";
import issues from "./issues";
import misc from "./misc";
import projects from "./projects";
import users from "./users";
import utilities from "./utilities";
import versions from "./versions";
import webhooks from "./webhooks";

export default {
  ...boards,
  ...comments,
  ...issues,
  ...projects,
  ...users,
  ...utilities,
  ...versions,
  ...webhooks,
  ...misc,
};
