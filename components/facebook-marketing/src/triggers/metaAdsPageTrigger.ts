import { trigger } from "@prismatic-io/spectral";
import { TriggerBranches } from "../constants";
import { metaAdsPageTriggerInputs } from "../inputs";
import {
  onInstanceDelete,
  onInstanceDeploy,
  performFunction,
  validateFields,
} from "../util";
export const metaAdsPageTrigger = trigger({
  display: {
    label: "Page",
    description:
      "Receive data from the Page in real time with webhook subscriptions.",
  },
  allowsBranching: true,
  staticBranchNames: [
    TriggerBranches.Notification,
    TriggerBranches.URLValidation,
  ],
  inputs: metaAdsPageTriggerInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  perform: performFunction,
  webhookLifecycleHandlers: {
    create: async (context, params) => {
      const { connection, version, verifyToken, pageFields, pageFieldsJSON } =
        params;
      const fields = pageFields.length > 0 ? pageFields : pageFieldsJSON;
      validateFields(fields);
      await onInstanceDeploy(context, {
        connection,
        version,
        verifyToken,
        object: "page",
        fields,
      });
    },
    delete: async (context, params) => {
      const { connection, version, pageFields, pageFieldsJSON } = params;
      const fields = pageFields.length > 0 ? pageFields : pageFieldsJSON;
      validateFields(fields);
      await onInstanceDelete(context, {
        connection,
        version,
        object: "page",
        fields,
      });
    },
  },
});
