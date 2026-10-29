import { action, outputSchema } from "@prismatic-io/spectral";
import { updateRecordOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { updateCustomerInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";

export const updateCustomer = action({
  display: {
    label: "Update Customer",
    description: "Update an existing customer record.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      recordId,
      version,
      connection,
      customerStatusType,
      lastReferenceDate,
      lastViewedDate,
      name,
      ownerId,
      partyId,
      totalLifeTimeValue,
    },
  ) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const payload = {
      Id: recordId,
      CustomerStatusType: customerStatusType,
      LastReferenceDate: lastReferenceDate,
      LastViewedDate: lastViewedDate,
      Name: name,
      OwnerId: ownerId,
      PartyId: partyId,
      TotalLifeTimeValue: totalLifeTimeValue,
    };
    if (context.debug.enabled) {
      context.logger.debug("Payload", payload);
    }
    const response = await salesforceClient.sobject("Customer").update(payload);
    return {
      data: response,
    };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    genericCreateUpdateExamplePayload,
  inputs: updateCustomerInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateRecordOutputSchema,
  }),
  examplePayload: genericCreateUpdateExamplePayload,
});
