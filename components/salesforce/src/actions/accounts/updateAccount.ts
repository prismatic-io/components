import { action, outputSchema } from "@prismatic-io/spectral";
import { updateRecordOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { updateAccountInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";
export const updateAccount = action({
  display: {
    label: "Update Account",
    description: "Update an existing account record.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      recordId,
      version,
      dynamicValues,
      fieldValues,
      name,
      type,
      industry,
      shippingAddress = {},
      billingAddress = {},
      additionalFields = {},
      connection,
    },
  ) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const object = {
      Id: recordId,
      name: name,
      phone: additionalFields.phone,
      Website: additionalFields.website,
      Type: type,
      industry: industry,
      description: additionalFields.description,
      NumberOfEmployees: additionalFields.employeeCount,
      AnnualRevenue: additionalFields.revenue,
      BillingCity: billingAddress.billingCity,
      BillingCountry: billingAddress.billingCountry,
      BillingPostalCode: billingAddress.billingPostalCode,
      BillingState: billingAddress.billingState,
      BillingStreet: billingAddress.billingStreet,
      ShippingCity: shippingAddress.city,
      ShippingCountry: shippingAddress.country,
      ShippingPostalCode: shippingAddress.postalCode,
      ShippingState: shippingAddress.state,
      ShippingStreet: shippingAddress.street,
      ...dynamicValues,
      ...fieldValues,
    };
    if (context.debug.enabled) context.logger.debug("Payload", object);
    const command = salesforceClient.sobject("Account").update(object);
    const response = await executeSFAction(context, command);
    return {
      data: response,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => genericCreateUpdateExamplePayload,
  inputs: updateAccountInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateRecordOutputSchema,
  }),
  examplePayload: genericCreateUpdateExamplePayload,
});
