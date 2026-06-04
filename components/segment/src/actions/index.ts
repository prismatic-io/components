import catalogs_metadata from "./catalogs_metadata";
import destinations from "./destinations";
import functions from "./functions";
import { getEventsVolumeFromWorkspace } from "./getEventsVolumeFromWorkspace";
import rawRequest from "./rawRequest";
import sources from "./sources";
import transformations from "./transformations";
import users from "./users";
import warehouses from "./warehouses";

export default {
  ...catalogs_metadata,
  ...destinations,
  ...functions,
  ...sources,
  ...transformations,
  ...users,
  ...warehouses,
  getEventsVolumeFromWorkspace,
  rawRequest,
};
