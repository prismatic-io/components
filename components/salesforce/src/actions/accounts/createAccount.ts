import { action, outputSchema } from "@prismatic-io/spectral";
import { createRecordOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { createAccountInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const createAccount = action({
  display: {
    label: "Create Account",
    description: "Create a Salesforce account record.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
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

    const command = salesforceClient.sobject("Account").create(object);
    const response = await executeSFAction(context, command);

    return {
      data: response,
    };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    genericCreateUpdateExamplePayload,
  inputs: createAccountInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createRecordOutputSchema,
  }),
  examplePayload: genericCreateUpdateExamplePayload,
});
