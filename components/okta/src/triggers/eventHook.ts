import { trigger } from "@prismatic-io/spectral";
import { triggerEventHookInputs } from "../inputs/webhooks";
import {
  createEventHookTrigger,
  deleteEventHookTrigger,
  eventHookPerformFN,
} from "../util/eventHooks";

export const eventHook = trigger({
  display: {
    label: "Event Hook",
    description: "Receive event hooks from Okta when a specified event occurs.",
  },
  inputs: triggerEventHookInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  allowsBranching: true,
  staticBranchNames: ["Notification", "URL Validation"],
  perform: eventHookPerformFN,
  webhookLifecycleHandlers: {
    create: createEventHookTrigger,
    delete: deleteEventHookTrigger,
  },
});
