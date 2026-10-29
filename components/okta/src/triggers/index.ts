import { eventHook } from "./eventHook";
import { newSystemLogsPollingTrigger } from "./newSystemLogsPollingTrigger";
import { newUsersPollingTrigger } from "./newUsersPollingTrigger";
import { updatedUsersPollingTrigger } from "./updatedUsersPollingTrigger";

export default {
  eventHook,
  newUsersPollingTrigger,
  updatedUsersPollingTrigger,
  newSystemLogsPollingTrigger,
};
