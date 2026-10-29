import webinars from "./webinars";
import registrants from "./registrants";
import attendees from "./attendees";
import userSubscriptions from "./userSubscriptions";
import webhooks from "./webhooks";
import misc from "./misc";

export default {
  ...webinars,
  ...registrants,
  ...attendees,
  ...userSubscriptions,
  ...webhooks,
  ...misc,
};
