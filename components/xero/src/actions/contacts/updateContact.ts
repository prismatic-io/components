import { action, input } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import {
  contactId,
  contactName,
  contactNumber,
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
  connectionInput,
  country,
  region,
  additionalFields,
} from "../../inputs";
import { createContactAdditionalFields } from "../../constants";
import { updateContactExamplePayload } from "../../examplePayloads";

export const updateContact = action({
  display: {
    label: "Update Contact",
    description: "Update the information and metadata of a contact by Id",
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
    const { data } = await client.post(`/contacts`, {
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
  inputs: {
    contactId,
    contactNumber,
    contactName: { ...contactName, required: false },
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
    additionalFields: input({
      ...additionalFields,
      example: JSON.stringify(createContactAdditionalFields, null, 2),
      comments:
        additionalFields.comments +
        " See [Xero API documentation](https://developer.xero.com/documentation/api/accounting/contacts#post-contacts) for additional fields.",
    }),
    xeroConnection: connectionInput,
  },
  examplePayload: updateContactExamplePayload,
});
