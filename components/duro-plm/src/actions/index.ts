import company from "./company";
import components from "./components";
import misc from "./misc";
import orders from "./orders";
import users from "./users";

export default {
  ...company,
  ...components,
  ...misc,
  ...orders,
  ...users,
};
