import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { updateAccountInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const updateAccount = action({
  display: {
    label: "Update Account",
    description: "Update an existing account record.",
  },
  perform: async (
    context,
    {
      recordId,
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
      Id: recordId,
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

    const command = salesforceClient.sobject("Account").update(object);
    const response = await executeSFAction(context, command);

    return {
      data: response,
    };
  },
  inputs: updateAccountInputs,
  examplePayload: genericCreateUpdateExamplePayload,
});
