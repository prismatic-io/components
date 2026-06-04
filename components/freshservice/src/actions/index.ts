import agents from "./agents";
import assets from "./assets";
import misc from "./misc";


import problems from "./problems";
import requesters from "./requesters";
import serviceRequest from "./serviceRequest";
import software from "./software";
import tickets from "./tickets";
import workspaces from "./workspaces";

export default {
  ...problems,
  ...tickets,
  ...requesters,
  ...agents,
  ...assets,
  ...software,
  ...serviceRequest,
  
  ...misc,
  ...workspaces,
};
