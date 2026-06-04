import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { createAccountInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const createAccount = action({
  display: {
    label: "Create Account",
    description: "Create a Salesforce account record.",
  },
  perform: async (
    context,
    {
      version,
      dynamicValues,
      fieldValues,
      phone,
      website,
      type,
      industry,
      description,
      employeeCount,
      revenue,
      billingCity,
      billingPostalCode,
      billingState,
      billingStreet,
      billingCountry,
      street,
      state,
      country,
      name,
      city,
      postalCode,
      connection,
    },
  ) => {
    const salesforceClient = await createSalesforceClient(connection, version);

    const object = {
      name: name,
      phone: phone,
      Website: website,
      Type: type,
      industry: industry,
      description: description,
      NumberOfEmployees: employeeCount,
      AnnualRevenue: revenue,
      BillingCity: billingCity,
      BillingCountry: billingCountry,
      BillingPostalCode: billingPostalCode,
      BillingState: billingState,
      BillingStreet: billingStreet,
      ShippingCity: city,
      ShippingCountry: country,
      ShippingPostalCode: postalCode,
      ShippingState: state,
      ShippingStreet: street,
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
  inputs: createAccountInputs,
  examplePayload: genericCreateUpdateExamplePayload,
});
