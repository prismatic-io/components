import { trigger } from "@prismatic-io/spectral";
import { TriggerBranches } from "./constants";
import {
  adAccountFields,
  adAccountFieldsJSON,
  pageFields,
  pageFieldsJSON,
  verifyToken,
  version,
  webhookConnection,
} from "./inputs";
import {
  onInstanceDelete,
  onInstanceDeploy,
  performFunction,
  validateFields,
} from "./util";

export const metaAdsPageTrigger = trigger({
  display: {
    label: "Page Trigger",
    description:
      "Receive data from the Page in real time with webhook subscriptions.",
  },
  allowsBranching: true,
  staticBranchNames: [
    TriggerBranches.Notification,
    TriggerBranches.URLValidation,
  ],
  inputs: {
    version,
    verifyToken,
    pageFields,
    pageFieldsJSON,
    connection: webhookConnection,
  },
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

export const metaAdsAdAccountTrigger = trigger({
  display: {
    label: "Ad Account Trigger",
    description:
      "Receive data from the Ad Account in real time with webhook subscriptions.",
  },
  allowsBranching: true,
  staticBranchNames: [
    TriggerBranches.Notification,
    TriggerBranches.URLValidation,
  ],
  inputs: {
    version,
    verifyToken,
    adAccountFields,
    adAccountFieldsJSON,
    connection: webhookConnection,
  },
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

export default { metaAdsPageTrigger, metaAdsAdAccountTrigger };
