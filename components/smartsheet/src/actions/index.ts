import * as contacts from "./contacts";
import * as events from "./events";
import * as favorites from "./favorites";
import * as folders from "./folders";
import * as groups from "./groups";
import * as home from "./home";
import { rawRequest } from "./misc";
import * as reports from "./reports";
import * as rows from "./rows";
import * as search from "./search";
import * as sheets from "./sheets";
import * as templates from "./templates";
import * as users from "./users";
import * as webhooks from "./webhooks";
import * as workspaces from "./workspaces";

export default {
  ...contacts,
  ...events,
  ...favorites,
  ...folders,
  ...groups,
  ...home,
  ...reports,
  ...rows,
  ...search,
  ...sheets,
  ...templates,
  ...users,
  ...webhooks,
  ...workspaces,
  rawRequest,
};
