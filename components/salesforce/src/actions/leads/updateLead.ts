import { action, util, outputSchema } from "@prismatic-io/spectral";
import { updateRecordOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { updateLeadInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const updateLead = action({
  display: {
    label: "Update Lead",
    description: "Update a Salesforce lead record.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      recordId,
      version,
      dynamicValues,
      fieldValues,
      nameAndContact = {},
      company,
      leadStatus,
      email,
      address = {},
      additionalFields = {},
      connection,
    },
  ) => {
    const salesforceClient = await createSalesforceClient(connection, version);

    const payload = {
      Id: recordId,
      Company: company,
      FirstName: nameAndContact.firstName,
      LastName: nameAndContact.lastName,
      Title: additionalFields.title,
      Phone: nameAndContact.phone,
      Email: email,
      Rating: additionalFields.rating,
      Website: nameAndContact.website,
      Street: address.street,
      State: address.state,
      City: address.city,
      PostalCode: address.postalCode,
      Country: address.country,
      NumberOfEmployees: additionalFields.employeeCount,
      description: additionalFields.description,
      LeadSource: additionalFields.leadSource,
      AnnualRevenue: additionalFields.revenue
        ? util.types.toInt(additionalFields.revenue)
        : undefined,
      status: leadStatus,
      ...dynamicValues,
      ...fieldValues,
    };

    if (context.debug.enabled) {
      context.logger.debug("Payload", payload);
    }

    const command = salesforceClient.sobject("Lead").update(payload);
    const response = await executeSFAction(context, command);
    return {
      data: response,
    };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    genericCreateUpdateExamplePayload,
  inputs: updateLeadInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateRecordOutputSchema,
  }),
  examplePayload: genericCreateUpdateExamplePayload,
});
