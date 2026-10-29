import contactsActions from "./contacts";
import invoiceActions from "./invoices";
import userActions from "./users";
import workItemActions from "./workitems";
import misc from "./misc";
import webhooks from "./webhooks";

export default {
  ...contactsActions,
  ...invoiceActions,
  ...userActions,
  ...workItemActions,
  ...misc,
  ...webhooks,
};
