import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { createCustomerInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const createCustomer = action({
  display: {
    label: "Create Customer",
    description: "Create a Salesforce customer.",
  },
  perform: async (
    context,
    {
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

    const command = salesforceClient.sobject("Customer").create(payload);
    const response = await executeSFAction(context, command);

    return {
      data: response,
    };
  },
  inputs: createCustomerInputs,
  examplePayload: genericCreateUpdateExamplePayload,
});
