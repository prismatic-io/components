import assets from "./assets";
import bulk from "./bulk";
import contentTypes from "./contentTypes";
import entries from "./entries";
import environments from "./environments";
import { rawRequest } from "./misc/rawRequest";
import organizations from "./organizations";
import spaces from "./spaces";

import upload from "./upload";
import webhooks from "./webhooks";
export default {
  ...spaces,
  ...environments,
  ...organizations,
  ...contentTypes,
  ...entries,
  
  ...upload,
  ...assets,
  ...webhooks,
  ...bulk,
  rawRequest,
};
