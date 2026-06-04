import { action } from "@prismatic-io/spectral";
import { subscribeToRecordChangesInputs } from "../../inputs";
import { subscribeToRecordChangesExamplePayload } from "../../examplePayloads";
import { createFlowRecordSubscription } from "../../helpers";
import { generatePrefixedHash } from "../../util";
import { createSalesforceClient } from "../../client";

export const subscribeToRecordChanges = action({
  display: {
    label: "Subscribe to Record Changes",
    description: "Subscribe to Record Changes in Salesforce using an outbound message action.",
  },
  inputs: subscribeToRecordChangesInputs,
  perform: async (
    context,
    {
      version,
      prefix,
      endpointUrl,
      triggerObject,
      triggerOn,
      fields,
      dynamicFields,
      flowMetadata,
      filterFormula,
      connection,
    },
  ) => {
    const client = await createSalesforceClient(connection, version);
    const instanceId = context.instance.id;
    const flowId = context.flow.id;
    const name = generatePrefixedHash(prefix, instanceId, flowId);

    const data = await createFlowRecordSubscription(context, {
      version,
      client,
      endpointUrl,
      triggerObject,
      triggerOn,
      fields,
      dynamicFields,
      flowMetadata,
      filterFormula,
      name,
    });

    return {
      data,
    };
  },
  examplePayload: subscribeToRecordChangesExamplePayload,
});
