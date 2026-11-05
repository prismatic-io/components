import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient, getVersionFromConnection } from "../../client";
import { updateCustomerExamplePayload } from "../../examplePayloads";
import { updateCustomerInputs } from "../../inputs";

export const updateCustomer = action({
  display: {
    label: "Update Customer",
    description: "Updates a customer profile.",
  },
  perform: async (
    context,
    {
      squareConnection,
      customerId,
      address,
      birthday,
      companyName,
      emailAddress,
      familyName,
      givenName,
      nickname,
      note,
      phoneNumber,
      referenceId,
      taxIds,
    },
  ) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);
    const version = getVersionFromConnection(squareConnection);
    const euCountries = [
      "BE",
      "BG",
      "CZ",
      "DK",
      "DE",
      "EE",
      "IE",
      "EL",
      "ES",
      "FR",
      "HR",
      "IT",
      "CY",
      "LV",
      "LT",
      "LU",
      "HU",
      "MT",
      "NL",
      "AT",
      "PL",
      "PT",
      "RO",
      "SI",
      "SK",
      "FI",
      "SE",
      "UK",
    ];

    if (address?.country && !euCountries.includes(address.country)) {
      taxIds = null;
    }

    const updateBody = {
      address,
      birthday,
      company_name: companyName,
      email_address: emailAddress,
      family_name: familyName,
      given_name: givenName,
      nickname,
      note,
      phone_number: phoneNumber,
      reference_id: referenceId,
      tax_ids: taxIds,
      version,
    };

    const response = await client.put(`/v2/customers/${customerId}`, updateBody);

    return {
      data: response.data,
    };
  },
  inputs: updateCustomerInputs,
  examplePayload: updateCustomerExamplePayload,
});
