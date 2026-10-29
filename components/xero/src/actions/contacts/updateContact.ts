import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { updateContactInputs } from "../../inputs";
import { updateContactExamplePayload } from "../../examplePayloads";

export const updateContact = action({
  display: {
    label: "Update Contact",
    description: "Update the information and metadata of a contact by ID.",
  },
  perform: async (
    context,
    {
      xeroConnection,
      contactId,
      contactNumber,
      contactName,
      firstName,
      lastName,
      email,
      accountsPayableTaxType,
      accountsReceivableTaxType,
      bankAccountDetails,
      defaultCurrency,
      taxNumber,
      contactStatus,
      city,
      addressType,
      address,
      postalCode,
      country,
      region,
      additionalFields,
    },
  ) => {
    const client = await getXeroClient(xeroConnection, context.debug.enabled);
    const { data } = await client.post("/contacts", {
      ContactID: contactId,
      ContactNumber: contactNumber,
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
    });
    return { data };
  },
  inputs: updateContactInputs,
  examplePayload: updateContactExamplePayload,
});
