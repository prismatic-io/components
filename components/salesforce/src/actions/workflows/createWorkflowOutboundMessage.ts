import { action, util } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { createWorkflowOutboundMessageInputs } from "../../inputs";
import {
  createWorkflowOutboundMessageFunction,
  getIntegrationUser,
  processOutboundMessageFields,
  toFullNameIdentifier,
} from "../../util";
import { genericCreateUpdateFullNameExamplePayload } from "../../examplePayloads";

export const createWorkflowOutboundMessage = action({
  display: {
    label: "Create Outbound Message",
    description: "Create an Outbound Message in Salesforce.",
  },
  inputs: createWorkflowOutboundMessageInputs,
  perform: async (
    context,
    {
      version,
      recordType,
      name,
      description,
      endpointUrl,
      integrationUserEmail,
      fields,
      dynamicFields,
      connection,
    },
  ) => {
    if (context.debug.enabled) {
      context.logger.debug("Payload", {
        recordType,
        name,
        description,
        endpointUrl,
        integrationUserEmail,
        fields,
        dynamicFields,
      });
    }

    const client = await createSalesforceClient(connection, version);

    const integrationUser = await getIntegrationUser(client, integrationUserEmail);

    const result = await createWorkflowOutboundMessageFunction(client, {
      apiVersion: util.types.toNumber(version) || util.types.toNumber(client.version),
      fullName: toFullNameIdentifier(recordType, name),
      name,
      description,
      endpointUrl,
      integrationUser,
      fields: processOutboundMessageFields(fields, dynamicFields),
    });
    return { data: result };
  },
  examplePayload: genericCreateUpdateFullNameExamplePayload,
});
