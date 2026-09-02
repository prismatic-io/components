import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { toOptionalString, valueListInputClean } from "../util";
import {
  additionalProperties,
  archived,
  associationsList,
  connectionInput,
  dynamicValues,
  fetchAll,
  fieldValues,
  idProperty,
  pagination,
  propertiesWithHistory,
  timeout,
} from "./common";
import { batchInputs } from "./engagements";
const contactId = input({
  label: "Contact ID",
  type: "string",
  required: true,
  placeholder: "Enter Contact ID",
  example: "9989223",
  dataSource: "selectContact",
  comments: "The unique identifier of the contact.",
  clean: util.types.toString,
});
const contactCompany = input({
  label: "Company",
  type: "string",
  required: true,
  placeholder: "Enter company name",
  example: "Acme Inc.",
  comments: "The name of the company the contact is associated with.",
  clean: util.types.toString,
});
const contactEmail = input({
  label: "Email",
  type: "string",
  required: true,
  example: "john.doe@example.com",
  placeholder: "Enter email address",
  comments:
    "The email of the contact. Getting contacts by email performs a search function and will return a successful output even when no results are found.",
  clean: util.types.toString,
});
const contactFirstName = input({
  label: "First Name",
  type: "string",
  required: true,
  placeholder: "Enter first name",
  example: "John",
  comments: "The contact's given name, mapped to the firstname property.",
  clean: util.types.toString,
});
const contactlastName = input({
  label: "Last Name",
  type: "string",
  required: true,
  placeholder: "Enter last name",
  example: "Doe",
  comments: "The contact's family name, mapped to the lastname property.",
  clean: util.types.toString,
});
const phone = input({
  label: "Phone",
  type: "string",
  required: true,
  placeholder: "Enter phone number",
  example: "(877) 929-0687",
  comments: "The primary phone number for the contact.",
  clean: util.types.toString,
});
const website = input({
  label: "Website",
  type: "string",
  required: true,
  placeholder: "Enter website",
  example: "www.example.com",
  comments: "The contact's website, such as a company or personal homepage.",
  clean: util.types.toString,
});
const contactUpdateCompany = input({
  label: "Company",
  type: "string",
  required: false,
  placeholder: "Enter company name",
  example: "Acme Inc.",
  comments: "The updated company association for the contact.",
  clean: toOptionalString,
});
const contactUpdateEmail = input({
  label: "Email",
  type: "string",
  required: false,
  example: "john.doe@example.com",
  placeholder: "Enter email address",
  comments: "The updated email address for the contact.",
  clean: toOptionalString,
});
const contactUpdateFirstName = input({
  label: "First Name",
  type: "string",
  required: false,
  placeholder: "Enter first name",
  example: "John",
  comments: "The updated given name for the contact.",
  clean: toOptionalString,
});
const contactUpdatelastName = input({
  label: "Last Name",
  type: "string",
  required: false,
  placeholder: "Enter last name",
  example: "Doe",
  comments: "The updated family name for the contact.",
  clean: toOptionalString,
});
const updatePhone = input({
  label: "Phone",
  type: "string",
  required: false,
  placeholder: "Enter phone number",
  example: "(877) 929-0687",
  comments: "The updated primary phone number for the contact.",
  clean: toOptionalString,
});
const updateWebsite = input({
  label: "Website",
  type: "string",
  required: false,
  placeholder: "Enter website",
  example: "www.example.com",
  comments: "The updated website URL for the contact.",
  clean: toOptionalString,
});
const contactIds = input({
  label: "Contact Ids",
  type: "string",
  collection: "valuelist",
  required: true,
  comments: "A list of contact IDs.",
  dataSource: "selectContact",
  clean: valueListInputClean,
});
export const listContactsInputs = {
  hubspotConnection: connectionInput,
  additionalProperties,
  associationsList,
  archived,
  timeout,
  fetchAll,
  pagination,
};
export const createContactInputs = {
  contactFirstName,
  contactlastName,
  contactCompany: {
    ...contactCompany,
    required: false,
    clean: toOptionalString,
  },
  contactInfo: structuredObjectInput({
    label: "Contact Information",
    required: false,
    comments: "Optional contact channel fields: email, phone, and website.",
    inputs: {
      phone: { ...phone, required: false, clean: toOptionalString },
      contactEmail: {
        ...contactEmail,
        required: false,
        clean: toOptionalString,
      },
      website: { ...website, required: false, clean: toOptionalString },
    },
  }),
  fieldValues,
  dynamicValues,
  timeout,
  hubspotConnection: connectionInput,
};
export const updateContactInputs = {
  contactId,
  contactUpdateFirstName,
  contactUpdatelastName,
  contactUpdateCompany,
  contactInfo: structuredObjectInput({
    label: "Contact Information",
    required: false,
    comments: "Updated contact channel fields: email, phone, and website.",
    inputs: {
      contactUpdateEmail,
      updatePhone,
      updateWebsite,
    },
  }),
  fieldValues,
  dynamicValues,
  timeout,
  hubspotConnection: connectionInput,
};
export const deleteContactInputs = {
  contactId,
  timeout,
  hubspotConnection: connectionInput,
};
export const getContactInputs = {
  contactId: { ...contactId, required: false, clean: toOptionalString },
  contactEmail: { ...contactEmail, required: false, clean: toOptionalString },
  additionalProperties,
  associationsList,
  archived,
  timeout,
  hubspotConnection: connectionInput,
};
export const createBatchContactsInputs = {
  hubspotConnection: connectionInput,
  batchInputs: {
    ...batchInputs,
    label: "Batch Contacts",
    comments:
      "An array of contact objects to create. See [HubSpot Contacts API](https://developers.hubspot.com/docs/api/crm/contacts) for properties.",
    example: JSON.stringify(
      [
        {
          associations: [
            {
              types: [
                {
                  associationCategory: "HUBSPOT_DEFINED",
                  associationTypeId: 0,
                },
              ],
              to: {
                id: "string",
              },
            },
          ],
          properties: {
            email: "bcooper@biglytics.net",
            phone: "(877) 929-0687",
            company: "Biglytics",
            website: "biglytics.net",
            lastname: "Cooper",
            firstname: "Bryan",
          },
        },
      ],
      null,
      2,
    ),
  },
  timeout,
};
export const getBatchContactsInputs = {
  hubspotConnection: connectionInput,
  propertiesWithHistory,
  properties: {
    ...propertiesWithHistory,
    label: "Property",
  },
  idProperty: { ...idProperty, comments: "An ID property to search by" },
  contactIds: { ...contactIds, required: false },
  archived,
  timeout,
};
export const updateBatchContactsInputs = {
  hubspotConnection: connectionInput,
  batchInputs: {
    ...batchInputs,
    label: "Batch Contacts",
    comments:
      "An array of contact objects to update. See [HubSpot Contacts API](https://developers.hubspot.com/docs/api/crm/contacts) for properties.",
    example: JSON.stringify(
      [
        {
          idProperty: "my_unique_property_name",
          id: "string",
          properties: {
            email: "bcooper@biglytics.net",
            phone: "(877) 929-0687",
            company: "Biglytics",
            website: "biglytics.net",
            lastname: "Cooper",
            firstname: "Bryan",
          },
        },
      ],
      null,
      2,
    ),
  },
  timeout,
};
export const archiveBatchContactsInputs = {
  contactIds,
  timeout,
  hubspotConnection: connectionInput,
};
