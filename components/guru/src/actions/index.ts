import miscActions from "./misc";
import searchActions from "./search";

import cardsActions from "./cards";
import collectionsActions from "./collections";
import foldersActions from "./folders";
import teamsActions from "./teams";
import groupsActions from "./groups";
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
