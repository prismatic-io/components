import { action, util } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { createLeadInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const createLead = action({
  display: {
    label: "Create Lead",
    description: "Create a Salesforce lead record.",
  },
  perform: async (
    context,
    {
      version,
      dynamicValues,
      fieldValues,
      firstName,
      lastName,
      company,
      title,
      phone,
      email,
      leadSource,
      rating,
      website,
      street,
      state,
      city,
      postalCode,
      employeeCount,
      description,
      revenue,
      leadStatus,
      connection,
    },
  ) => {
    const salesforceClient = await createSalesforceClient(connection, version);

    const command = salesforceClient.sobject("Lead").create({
      Company: company,
      FirstName: firstName,
      LastName: lastName,
      Title: title,
      Phone: phone,
      Email: email,
      Rating: rating,
      Website: website,
      Street: street,
      State: state,
      City: city,
      PostalCode: postalCode,
      NumberOfEmployees: employeeCount,
      description: description,
      LeadSource: leadSource,
      AnnualRevenue: util.types.toInt(revenue),
      status: leadStatus,
      ...dynamicValues,
      ...fieldValues,
    });
    const response = await executeSFAction(context, command);
    return {
      data: response,
    };
  },
  inputs: createLeadInputs,
  examplePayload: genericCreateUpdateExamplePayload,
});
