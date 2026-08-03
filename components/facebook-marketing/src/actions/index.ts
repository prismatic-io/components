import adAccountsActions from "./adAccounts";
import adCreativesActions from "./adCreatives";
import adSetsActions from "./adSets";
import adsActions from "./ads";
import businessesActions from "./businesses";
import campaignsActions from "./campaigns";
import conversionsActions from "./conversions";
import miscActions from "./misc";
import usersActions from "./users";
import webhooksActions from "./webhooks";
export default {
  ...adsActions,
  ...adSetsActions,
  ...adCreativesActions,
  ...campaignsActions,
  ...adAccountsActions,
  ...usersActions,
  ...conversionsActions,
  ...businessesActions,
  ...miscActions,
  ...webhooksActions,
};
