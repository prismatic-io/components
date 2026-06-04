import { trigger } from "@prismatic-io/spectral";
import { baseChangesInputs } from "../inputs";
import {
  baseChangesCreate,
  baseChangesDelete,
  baseChangesPerform,
} from "../helpers";
import { baseChangesTriggerExamplePayload } from "../examplePayloads";





export const baseChanges = trigger({
  display: {
    label: "Base Change Notifications",
    description:
      "Receive base change notifications from Airtable. Automatically creates and manages a webhook subscription when the instance is deployed, and removes the subscription when the instance is deleted.",
  },
  webhookLifecycleHandlers: {
    create: baseChangesCreate,
    delete: baseChangesDelete,
  },
  perform: baseChangesPerform,
  inputs: baseChangesInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "valid",
  allowsBranching: true,
  staticBranchNames: ["Notification", "Refresh"],
  examplePayload: baseChangesTriggerExamplePayload,
});
