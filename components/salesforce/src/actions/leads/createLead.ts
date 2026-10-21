import { action, util, outputSchema } from "@prismatic-io/spectral";
import { createRecordOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { createLeadInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";
export const createLead = action({
  display: {
    label: "Create Lead",
    description: "Create a Salesforce lead record.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
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
    const command = salesforceClient.sobject("Lead").create({
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
      AnnualRevenue: util.types.toInt(additionalFields.revenue),
      status: leadStatus,
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
  inputs: createLeadInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createRecordOutputSchema,
  }),
  examplePayload: genericCreateUpdateExamplePayload,
});
