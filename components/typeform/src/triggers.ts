import { trigger } from "@prismatic-io/spectral";
import {
  connection,
  formId,
  formResponse,
  formResponsePartial,
  secret,
} from "./inputs";
import { performFunction, onInstanceDeploy, onInstanceDelete } from "./util";

const formTrigger = trigger({
  display: {
    label: "Typeform Webhook Trigger",
    description:
      "Receive webhook notifications from Typeform when responses are submitted to a specified form.",
  },
  inputs: {
    connection,
    formId,
    secret,
    formResponse,
    formResponsePartial,
  },
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  perform: performFunction,
  webhookLifecycleHandlers: {
    create: onInstanceDeploy,
    delete: onInstanceDelete,
  },
});

export default {
  formTrigger,
};
