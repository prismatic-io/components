import { action, util } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { updateOpportunityInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const updateOpportunity = action({
  display: {
    label: "Update Opportunity",
    description: "Update an existing opportunity record.",
  },
  perform: async (
    context,
    {
      recordId,
      nextStep,
      version,
      dynamicValues,
      fieldValues,
      amount,
      stage,
      accountId,
      opportunityType,
      closeDate,
      leadSource,
      probability,
      description,
      name,
      connection,
    },
  ) => {
    const salesforceClient = await createSalesforceClient(connection, version);

    const command = salesforceClient.sobject("Opportunity").update({
      Id: recordId,
      Name: name,
      description: description,
      stageName: stage,
      closeDate: closeDate,
      Amount: amount,
      AccountId: accountId,
      probability: probability,
      NextStep: nextStep,
      Type: opportunityType,
      LeadSource: leadSource,
      ...dynamicValues,
      ...fieldValues,
    });
    const response = await executeSFAction(context, command);

    return {
      data: response,
    };
  },
  inputs: updateOpportunityInputs,
  examplePayload: genericCreateUpdateExamplePayload,
});
