import { createEventsProvider } from "./createEventsProvider";
import { createWebhook } from "./createWebhook";
import { deleteEventsProvider } from "./deleteEventsProvider";
import { deleteInstancedWebhooks } from "./deleteInstancedWebhooks";
import { deleteRegistration } from "./deleteRegistration";
import { getEventsProvider } from "./getEventsProvider";
import { listAllRegistrations } from "./listAllRegistrations";
import { listEventsProviders } from "./listEventsProviders";
import { rawRequest } from "./rawRequest";
import { updateEventsProvider } from "./updateEventsProvider";

export default {
  listEventsProviders,
  getEventsProvider,
  createEventsProvider,
  deleteEventsProvider,
  updateEventsProvider,
  createWebhook,
  listAllRegistrations,
  deleteRegistration,
  deleteInstancedWebhooks,
  rawRequest,
};
