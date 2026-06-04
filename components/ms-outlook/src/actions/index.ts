import calendars from "./calendars";
import events from "./events";
import lookups from "./lookups";
import mailFolders from "./mailFolders";
import messages from "./messages";
import misc from "./misc";
import subscriptions from "./subscriptions";
import users from "./users";

export default {
  ...calendars,
  ...events,
  ...lookups,
  ...mailFolders,
  ...messages,
  ...misc,
  ...subscriptions,
  ...users,
};
