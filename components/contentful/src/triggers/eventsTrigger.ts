import { trigger } from "@prismatic-io/spectral";
import { eventsTriggerInputs } from "../inputs";
import {
  instanceDeleteFunctionality,
  instanceDeployFunctionality,
} from "../util";

export const eventsTrigger = trigger({
  display: {
    label: "Event Subscription",
    description:
      "Receive event notifications from Contentful. Automatically creates and manages a webhook subscription for selected topics when the instance is deployed, and removes the subscription when the instance is deleted.",
  },
  perform: async (_context, payload) => {
    
    return { payload };
  },
  inputs: eventsTriggerInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  onInstanceDeploy: instanceDeployFunctionality,
  onInstanceDelete: instanceDeleteFunctionality,
});
