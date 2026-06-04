import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { createCustomerExamplePayload } from "../../examplePayloads";
import { createCustomerInputs } from "../../inputs";

export const createCustomer = action({
  display: {
    label: "Create Customer",
    description: "Creates a new customer profile.",
  },
  perform: async (
    context,
    {
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
      idempotencyKey,
      squareConnection,
    },
  ) => {
    
    if (!givenName && !familyName && !companyName && !emailAddress && !phoneNumber) {
      throw new Error(
        "At least one of `given_name`, `family_name`, `company_name`, `email_address`, or `phone_number` is required for a customer.",
      );
    }

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

    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const requestBody = {
      idempotency_key: idempotencyKey,
      given_name: givenName,
      family_name: familyName,
      company_name: companyName,
      email_address: emailAddress,
      address,
      phone_number: phoneNumber,
      reference_id: referenceId,
      note,
      birthday,
      tax_ids: taxIds,
      nickname,
    };

    const response = await client.post("/v2/customers", requestBody);

    return {
      data: response.data,
    };
  },
  inputs: createCustomerInputs,
  examplePayload: createCustomerExamplePayload,
});
