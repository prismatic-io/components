import { createDestination } from "./create";
import { deleteDestination } from "./delete";
import { getDestination } from "./get";
import { listDestinations } from "./list";
import destinationSubscriptions from "./subscriptions";
import { updateDestination } from "./update";

export default {
  createDestination,
  getDestination,
  listDestinations,
  deleteDestination,
  updateDestination,
  ...destinationSubscriptions,
};
