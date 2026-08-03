import { trigger } from "@prismatic-io/spectral";
import { TriggerBranches } from "../constants";
import { metaAdsAdAccountTriggerInputs } from "../inputs";
import {
  onInstanceDelete,
  onInstanceDeploy,
  performFunction,
  validateFields,
} from "../util";
export const metaAdsAdAccountTrigger = trigger({
  display: {
    label: "Ad Account",
    description:
      "Receive data from the Ad Account in real time with webhook subscriptions.",
  },
  allowsBranching: true,
  staticBranchNames: [
    TriggerBranches.Notification,
    TriggerBranches.URLValidation,
  ],
  inputs: metaAdsAdAccountTriggerInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  perform: performFunction,
  webhookLifecycleHandlers: {
    create: async (context, params) => {
      const {
        connection,
        version,
        verifyToken,
        adAccountFields,
        adAccountFieldsJSON,
      } = params;
      const fields =
        adAccountFields.length > 0 ? adAccountFields : adAccountFieldsJSON;
      validateFields(fields);
      await onInstanceDeploy(context, {
        connection,
        version,
        verifyToken,
        object: "ad_account",
        fields,
      });
    },
    delete: async (context, params) => {
      const { connection, version, adAccountFields, adAccountFieldsJSON } =
        params;
      const fields =
        adAccountFields.length > 0 ? adAccountFields : adAccountFieldsJSON;
      validateFields(fields);
      await onInstanceDelete(context, {
        connection,
        version,
        object: "ad_account",
        fields,
      });
    },
  },
});
