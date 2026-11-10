import { buildRawRequestAction } from "@prismatic-io/spectral/http";
import activities from "./activities";
import conversations from "./conversations";

export default {
  ...activities,
  ...conversations,
  rawRequest: buildRawRequestAction(""),
};
