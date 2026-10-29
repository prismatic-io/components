import cardsActions from "./cards";
import collectionsActions from "./collections";
import foldersActions from "./folders";
import groupsActions from "./groups";
import miscActions from "./misc";
import searchActions from "./search";
import teamsActions from "./teams";
import webhooksActions from "./webhooks";

export default {
  ...miscActions,
  ...searchActions,
  ...cardsActions,
  ...collectionsActions,
  ...foldersActions,
  ...teamsActions,
  ...groupsActions,
  ...webhooksActions,
};
