import campaignActions from "./campaign";
import conversionActions from "./conversions";
import customerActions from "./customer";
import localServicesActions from "./localServices";
import generalActions from "./misc";
import searchActions from "./search";
import userActions from "./user";

export default {
  ...campaignActions,
  ...searchActions,
  ...conversionActions,
  ...customerActions,
  ...localServicesActions,
  ...generalActions,
  ...userActions,
};
