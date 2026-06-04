import { trigger } from "@prismatic-io/spectral";
import { calendarChangeEventsPayload } from "../examplePayloads";
import {
  calendarChangeEventsCreate,
  calendarChangeEventsDelete,
  calendarChangeEventsPerform,
} from "../helpers";
import { calendarChangeEventsInputs } from "../inputs";

export const calendarChangeEvents = trigger({
  display: {
    label: "Calendar Change Events",
    description:
      "Receive change notifications for a Google Calendar. Automatically creates and manages a Google Calendar push notification subscription when the instance is deployed, and removes the subscription when the instance is deleted.",
  },
  perform: calendarChangeEventsPerform,
  inputs: calendarChangeEventsInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "valid",
  allowsBranching: true,
  staticBranchNames: ["Push Notifications", "Log Messages"],
  examplePayload: calendarChangeEventsPayload,
  webhookLifecycleHandlers: {
    create: calendarChangeEventsCreate,
    delete: calendarChangeEventsDelete,
  },
});
