import drive from "./drive";
import lists from "./lists";
import sites from "./sites";
import listSharedDocuments from "./listShared";
import subscriptions from "./subscriptions";
import users from "./users";
import webhooks from "./webhooks";
import { rawRequest } from "./rawRequest";
import { listChanges } from "./listChanges";
import folders from "./folders";
import files from "./files";
import items from "./items";
export default {
  ...drive,
  ...lists,
  ...sites,
  ...listSharedDocuments,
  ...subscriptions,
  ...users,
  ...webhooks,
  rawRequest,
  listChanges,
  ...folders,
  ...files,
  ...items,
};
