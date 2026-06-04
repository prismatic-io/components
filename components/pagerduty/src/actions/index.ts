import { buildRawRequestAction } from "@prismatic-io/spectral/dist/clients/http";
import { BASE_URL } from "../constants";
import changeEvents from "./changeEvents";
import events from "./events";
import incidents from "./incidents";
import notifications from "./notifications";
import priorities from "./priorities";
import services from "./services";
import templates from "./templates";
import users from "./users";
import webhooks from "./webhooks";

export default {
  ...changeEvents,
  ...events,
  ...incidents,
  ...notifications,
  ...priorities,
  ...services,
  ...templates,
  ...users,
  ...webhooks,
  rawRequest: buildRawRequestAction(BASE_URL),
};
