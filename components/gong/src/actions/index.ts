import calls from "./calls";
import engagement from "./engagement";
import folders from "./folders";
import { listWorkspaces } from "./listWorkspaces";
import meetings from "./meetings";
import rawRequest from "./rawRequest";
import references from "./references";
import users from "./users";

export default {
  ...calls,
  ...users,
  ...folders,
  ...meetings,
  ...references,
  ...engagement,
  listWorkspaces,
  rawRequest,
};
