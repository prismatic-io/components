import { action, util } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { updateLeadInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const updateLead = action({
  display: {
    label: "Update Lead",
    description: "Update a Salesforce lead record.",
  },
  perform: async (
    context,
    {
      recordId,
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

    const payload = {
      Id: recordId,
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
      AnnualRevenue: revenue ? util.types.toInt(revenue) : undefined,
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
  inputs: updateLeadInputs,
  examplePayload: genericCreateUpdateExamplePayload,
});
