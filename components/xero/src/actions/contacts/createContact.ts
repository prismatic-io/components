import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { createContactInputs } from "../../inputs";
import { createContactExamplePayload } from "../../examplePayloads";

export const createContact = action({
  display: {
    label: "Create Contact",
    description: "Create a new contact.",
  },
  perform: async (
    context,
    {
      xeroConnection,
      contactName,
      firstName,
      lastName,
      email,
      addressType,
      address,
      city,
      postalCode,
      country,
      region,
      bankAccountDetails,
      contactStatus,
      taxNumber,
      accountsReceivableTaxType,
      accountsPayableTaxType,
      defaultCurrency,
      additionalFields,
    },
  ) => {
    const client = await getXeroClient(xeroConnection, context.debug.enabled);
    const { data } = await client.post("/contacts", {
      Contacts: [
        {
          Name: contactName,
          FirstName: firstName,
          LastName: lastName,
          EmailAddress: email,
          Addresses: [
            {
              AddressType: addressType,
              AddressLine1: address,
              City: city,
              PostalCode: postalCode,
              Country: country,
              Region: region,
            },
          ],
          contactStatus: contactStatus,
          BankAccountDetails: bankAccountDetails,
          TaxNumber: taxNumber,
          AccountsReceivableTaxType: accountsReceivableTaxType,
          AccountsPayableTaxType: accountsPayableTaxType,
          DefaultCurrency: defaultCurrency,
          ...(additionalFields || {}),
        },
      ],
    });
    return { data };
  },
  inputs: createContactInputs,
  examplePayload: createContactExamplePayload,
});
