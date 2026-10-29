import meetings from "./meetings";
import misc from "./misc";
import recordings from "./recordings";
import users from "./users";
import webinars from "./webinars";

export default {
  ...meetings,
  ...misc,
  ...recordings,
  ...users,
  ...webinars,
};
