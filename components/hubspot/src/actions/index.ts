import associationsActions from "./associations";
import companiesActions from "./companies";
import contactsActions from "./contacts";
import crmDataActions from "./crmData";
import customObjectsActions from "./customObjects";
import dealsActions from "./deals";
import engagementsActions from "./engagements";
import lineItemsActions from "./lineItems";
import miscActions from "./misc";
import productsActions from "./products";
import propertiesActions from "./properties";
import searchActions from "./search";
import webhookActions from "./webhook";
export default {
  ...associationsActions,
  ...companiesActions,
  ...contactsActions,
  ...crmDataActions,
  ...customObjectsActions,
  ...dealsActions,
  ...engagementsActions,
  ...lineItemsActions,
  ...miscActions,
  ...productsActions,
  ...propertiesActions,
  ...searchActions,
  ...webhookActions,
};
