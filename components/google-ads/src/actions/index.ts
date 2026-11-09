import audienceActions from "./audiences";
import campaignActions from "./campaign";
import conversionActions from "./conversions";
import customerActions from "./customer";
import localServicesActions from "./localServices";
import generalActions from "./misc";
import mutateActions from "./mutate";
import searchActions from "./search";
import userActions from "./user";

export default {
  ...campaignActions,
  ...mutateActions,
  ...searchActions,
  ...conversionActions,
  ...audienceActions,
  ...customerActions,
  ...localServicesActions,
  ...generalActions,
  ...userActions,
};
