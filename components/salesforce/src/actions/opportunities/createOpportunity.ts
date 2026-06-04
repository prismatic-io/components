import { action, util } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { createOpportunityInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const createOpportunity = action({
  display: {
    label: "Create Opportunity",
    description: "Create a Salesforce opportunity record representing a sale or pending deal.",
  },
  perform: async (
    context,
    {
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

    const payload = {
      Name: name,
      description: description,
      stageName: stage,
      closeDate: closeDate,
      StageName: stage,
      Amount: amount,
      Type: opportunityType,
      NextStep: nextStep,
      LeadSource: leadSource,
      AccountId: accountId,
      probability: probability,
      ...dynamicValues,
      ...fieldValues,
    };

    if (context.debug.enabled) {
      context.logger.debug("Payload", payload);
    }

    const command = await salesforceClient.sobject("Opportunity").create(payload);
    const response = await executeSFAction(context, command);

    return {
      data: response,
    };
  },
  inputs: createOpportunityInputs,
  examplePayload: genericCreateUpdateExamplePayload,
});
