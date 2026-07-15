import contactsActions from "./contacts";
import customFieldsActions from "./customFields";
import emailsActions from "./emails";
import listsActions from "./lists";
import miscActions from "./misc";
import webhooksActions from "./webhooks";
export default {
  ...emailsActions,
  ...contactsActions,
  ...listsActions,
  ...customFieldsActions,
  ...miscActions,
  ...webhooksActions,
};
