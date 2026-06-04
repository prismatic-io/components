import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { updateCustomerInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";

export const updateCustomer = action({
  display: {
    label: "Update Customer",
    description: "Update an existing customer record.",
  },
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
  inputs: updateCustomerInputs,
  examplePayload: genericCreateUpdateExamplePayload,
});
