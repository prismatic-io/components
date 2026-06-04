import boards from "./boards";
import issues from "./issues";
import priorities from "./priorities";
import projects from "./projects";
import versions from "./versions";
import webhooks from "./webhooks";

export default {
  ...projects,
  ...issues,
  ...boards,
  ...webhooks,
  ...priorities,
  ...versions,
};
