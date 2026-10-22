import customerActions from "./customers";
import miscActions from "./misc";
import productActions from "./products";
export default {
  ...customerActions,
  ...miscActions,
  ...productActions,
};
