import apps from "./apps";
import channels from "./channels";
import teams from "./teams";
import users from "./users";
import webhooks from "./webhooks";
import rawRequest from "./rawRequest";
import webinars from "./webinars";

export default {
  ...apps,
  ...channels,
  ...teams,
  ...users,
  ...webhooks,
  ...webinars,
  rawRequest,
};
