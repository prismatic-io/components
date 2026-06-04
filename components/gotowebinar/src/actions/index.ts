import webinars from "./webinars";
import registrants from "./registrants";
import { rawRequest } from "./rawRequest";
import attendees from "./attendees";
import userSubscriptions from "./userSubscriptions";
import webhooks from "./webhooks";

export default {
  ...webinars,
  ...registrants,
  ...attendees,
  ...userSubscriptions,
  ...webhooks,
  rawRequest,
};
