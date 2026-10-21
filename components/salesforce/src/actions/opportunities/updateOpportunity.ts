import { action, outputSchema } from "@prismatic-io/spectral";
import { updateRecordOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { updateOpportunityInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";
export const updateOpportunity = action({
  display: {
    label: "Update Opportunity",
    description: "Update an existing opportunity record.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      recordId,
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
    const command = salesforceClient.sobject("Opportunity").update({
      Id: recordId,
      Name: name,
      description: additionalFields.description,
      stageName: stage,
      closeDate: closeDate,
      Amount: additionalFields.amount,
      AccountId: accountId,
      probability: additionalFields.probability,
      NextStep: additionalFields.nextStep,
      Type: opportunityType,
      LeadSource: additionalFields.leadSource,
      ...dynamicValues,
      ...fieldValues,
    });
    const response = await executeSFAction(context, command);
    return {
      data: response,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => genericCreateUpdateExamplePayload,
  inputs: updateOpportunityInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateRecordOutputSchema,
  }),
  examplePayload: genericCreateUpdateExamplePayload,
});
