import { action, outputSchema } from "@prismatic-io/spectral";
import { createRecordOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { createOpportunityInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const createOpportunity = action({
  display: {
    label: "Create Opportunity",
    description:
      "Create a Salesforce opportunity record representing a sale or pending deal.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      version,
      dynamicValues,
      fieldValues,
      stage,
      accountId,
      opportunityType,
      closeDate,
      name,
      additionalFields,
      connection,
    },
  ) => {
    const salesforceClient = await createSalesforceClient(connection, version);

    const payload = {
      Name: name,
      description: additionalFields.description,
      stageName: stage,
      closeDate: closeDate,
      StageName: stage,
      Amount: additionalFields.amount,
      Type: opportunityType,
      NextStep: additionalFields.nextStep,
      LeadSource: additionalFields.leadSource,
      AccountId: accountId,
      probability: additionalFields.probability,
      ...dynamicValues,
      ...fieldValues,
    };

    if (context.debug.enabled) {
      context.logger.debug("Payload", payload);
    }

    const command = await salesforceClient
      .sobject("Opportunity")
      .create(payload);
    const response = await executeSFAction(context, command);

    return {
      data: response,
    };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    genericCreateUpdateExamplePayload,
  inputs: createOpportunityInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createRecordOutputSchema,
  }),
  examplePayload: genericCreateUpdateExamplePayload,
});
