








import surveysActions from "./surveys";
import collectorsActions from "./collectors";
import responsesActions from "./responses";
import contactsActions from "./contacts";
import contactListsActions from "./contactLists";
import webhooksActions from "./webhooks";
import usersActions from "./users";
import miscActions from "./misc";

export default {
  ...surveysActions,
  ...collectorsActions,
  ...responsesActions,
  ...contactsActions,
  ...contactListsActions,
  ...webhooksActions,
  ...usersActions,
  ...miscActions,
};
