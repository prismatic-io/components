import accountsActions from "./accounts";
import bulkSendActions from "./bulkSend";
import contactsActions from "./contacts";
import envelopesActions from "./envelopes";
import foldersActions from "./folders";
import miscActions from "./misc";
import signaturesActions from "./signatures";
import templatesActions from "./templates";
import usersActions from "./users";
import webhooksActions from "./webhooks";

export default {
  ...accountsActions,
  ...signaturesActions,
  ...bulkSendActions,
  ...templatesActions,
  ...foldersActions,
  ...envelopesActions,
  ...usersActions,
  ...contactsActions,
  ...webhooksActions,
  ...miscActions,
};
