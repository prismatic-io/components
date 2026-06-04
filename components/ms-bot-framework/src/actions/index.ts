import { buildRawRequestAction } from "@prismatic-io/spectral/dist/clients/http";
import activities from "./activities";
import conversations from "./conversations";

export default {
  ...activities,
  ...conversations,
  
  
  rawRequest: buildRawRequestAction(""),
};
