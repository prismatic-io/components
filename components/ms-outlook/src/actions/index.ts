import attachments from "./attachments";
import calendars from "./calendars";
import events from "./events";
import lookups from "./lookups";
import mailFolders from "./mailFolders";
import messages from "./messages";
import misc from "./misc";
import subscriptions from "./subscriptions";
import users from "./users";

export default {
  ...attachments,
  ...calendars,
  ...events,
  ...lookups,
  ...mailFolders,
  ...messages,
  ...misc,
  ...subscriptions,
  ...users,
};
