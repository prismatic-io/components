import accountsActions from "./accounts";
import adGroupsActions from "./adGroups";
import adsActions from "./ads";
import audiencesActions from "./audiences";
import budgetsActions from "./budgets";
import campaignsActions from "./campaigns";
import clientLinksActions from "./clientLinks";
import conversionsActions from "./conversions";
import customersActions from "./customers";
import keywordsActions from "./keywords";
import miscActions from "./misc";
import usersActions from "./users";

export default {
  ...accountsActions,
  ...adGroupsActions,
  ...adsActions,
  ...audiencesActions,
  ...budgetsActions,
  ...campaignsActions,
  ...clientLinksActions,
  ...conversionsActions,
  ...customersActions,
  ...keywordsActions,
  ...miscActions,
  ...usersActions,
};
