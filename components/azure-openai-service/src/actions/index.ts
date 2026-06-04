import chatActions from "./chat";
import completions from "./completions";
import imageActions from "./images";
import rawRequestAction from "./rawRequest";

export default {
  ...chatActions,
  ...imageActions,
  ...rawRequestAction,
  ...completions,
};
