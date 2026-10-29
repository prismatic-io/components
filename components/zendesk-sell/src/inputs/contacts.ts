import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { connection, fetchAll } from "./common";

const exampleAddressJson = JSON.stringify(
  {
    line1: "2726 Smith Street",
    city: "Hyannis",
    postal_code: "02601",
    state: "MA",
    country: "US",
  },
  null,
  2,
);

const contactId = input({
  label: "Contact ID",
  comments: "The unique identifier of the contact.",
  placeholder: "Enter contact ID",
  example: "12345678",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectContact",
});

const customFields = input({
  label: "Custom Fields",
  comments: "Custom field key-value pairs.",
  placeholder: "Enter custom field key-value pairs",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  example: "key: external_id value: SKU01",
});

const tags = input({
  label: "Tags",
  comments: "Tags to apply.",
  placeholder: "Enter tags",
  type: "string",
  collection: "valuelist",
  required: false,
  example: "important",
});

const filterableCustomFields = input({
  label: "Filters",
  comments: "Custom-field filters to match against.",
  type: "string",
  collection: "keyvaluelist",
  required: true,
  example: "key: custom_fields[referral_website] value: https://www.test.com",
});

const isOrganizationCreate = input({
  label: "Is Organization",
  comments:
    "This value can be set only during creation and cannot be changed later.",
  placeholder: "Select organization type",
  type: "string",
  default: "",
  model: [
    { label: "", value: "" },
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ],
  required: false,
  clean: util.types.toString,
});

const isOrganizationList = input({
  label: "Is Organization",
  comments:
    "Indicates whether or not this contact refers to an organization or an individual.",
  type: "string",
  default: "",
  model: [
    { label: "", value: "" },
    { label: "true", value: "true" },
    { label: "false", value: "false" },
  ],
  required: false,
  clean: util.types.toString,
});

const createOrgName = input({
  label: "Organization Name",
  comments: "Required only when Is Organization is set to true.",
  placeholder: "Enter organization name",
  example: "Acme Corporation",
  type: "string",
  required: true,
  clean: util.types.toString,
});

const orgName = input({
  label: "Organization Name",
  comments: "The full company name, used when the contact is an organization.",
  placeholder: "Enter organization name",
  example: "Acme Corporation",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const orgNameFilter = input({
  label: "Organization Name",
  comments: "Filters results to organization contacts with this company name.",
  placeholder: "Enter organization name",
  example: "Acme Corporation",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const firstName = input({
  label: "First Name",
  comments:
    "Set only when Is Organization is set to false (the contact is an individual).",
  placeholder: "Enter first name",
  example: "John",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const firstNameFilter = input({
  label: "First Name",
  comments: "Filters results to contacts with this given name.",
  placeholder: "Enter first name",
  example: "John",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const createLastName = input({
  label: "Last Name",
  comments:
    "Required only when Is Organization is set to false (the contact is an individual).",
  placeholder: "Enter last name",
  example: "Doe",
  type: "string",
  required: true,
  clean: util.types.toString,
});

const lastName = input({
  label: "Last Name",
  comments:
    "Set only when Is Organization is set to false (the contact is an individual).",
  placeholder: "Enter last name",
  example: "Doe",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const lastNameFilter = input({
  label: "Last Name",
  comments: "Filters results to contacts with this family name.",
  placeholder: "Enter last name",
  example: "Doe",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const position = input({
  label: "Position",
  comments:
    "The client position in the Firehose stream. Possible values: top, tail, or a position string from a previous API response.",
  placeholder: "Enter stream position",
  example: "top",
  type: "string",
  required: true,
  clean: util.types.toString,
});

const limit = input({
  label: "Limit",
  comments: "The maximum number of events to return in a single response.",
  placeholder: "Enter limit",
  example: "100",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const page = input({
  label: "Page",
  comments:
    "The page number to start from. Page numbering is 1-based and omitting the page parameter will return the first page.",
  placeholder: "Enter page number",
  example: "1",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const perPage = input({
  label: "Per Page",
  comments:
    "The number of records to return per page. Default limit is 25 and maximum number that can be returned is 100.",
  placeholder: "Enter results per page",
  example: "25",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const addressCity = input({
  label: "City",
  comments: "The city of the contact's physical address.",
  placeholder: "Enter city",
  example: "Hyannis",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const addressPostalCode = input({
  label: "Zip/Postal Code",
  comments: "The postal or ZIP code of the contact's physical address.",
  placeholder: "Enter ZIP or postal code",
  example: "02601",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const addressCountry = input({
  label: "Country",
  comments: "The country of the contact's physical address.",
  placeholder: "Enter country",
  example: "US",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const addressCityFilter = input({
  label: "City",
  comments: "Filters results to contacts located in this city.",
  placeholder: "Enter city",
  example: "Hyannis",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const addressPostalCodeFilter = input({
  label: "Zip/Postal Code",
  comments: "Filters results to contacts with this postal or ZIP code.",
  placeholder: "Enter ZIP or postal code",
  example: "02601",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const addressCountryFilter = input({
  label: "Country",
  comments: "Filters results to contacts located in this country.",
  placeholder: "Enter country",
  example: "US",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const addressState = input({
  label: "State/Province",
  comments: "Filters results to contacts located in this state or region.",
  placeholder: "Enter state or province",
  example: "MA",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const billingAddressJson = input({
  label: "Billing Address",
  comments:
    "Billing address of the contact. Requires the contact to be a customer or prospect (see customer_status and prospect_status fields for details).",
  type: "code",
  language: "json",
  example: exampleAddressJson,
  required: false,
  clean: util.types.toString,
});

const shippingAddressJson = input({
  label: "Shipping Address",
  comments:
    "Shipping address of the contact. Requires the contact to be a customer or prospect (see customer_status and prospect_status fields for details).",
  type: "code",
  language: "json",
  example: exampleAddressJson,
  required: false,
  clean: util.types.toString,
});

const billingAddressString = input({
  label: "Billing Address",
  comments:
    "null if contact is neither a customer nor a prospect (see customer_status and prospect_status fields for details).",
  placeholder: "Enter billing address",
  example: "2726 Smith Street, Hyannis, MA 02601, US",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const shippingAddressString = input({
  label: "Shipping Address",
  comments:
    "null if contact is neither a customer nor a prospect (see customer_status and prospect_status fields for details).",
  placeholder: "Enter shipping address",
  example: "2726 Smith Street, Hyannis, MA 02601, US",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const addressInput = input({
  label: "Address",
  comments: "Physical address of the contact.",
  type: "code",
  language: "json",
  example: exampleAddressJson,
  required: false,
  clean: util.types.toString,
});

const contactChannelInputs = {
  email: input({
    label: "Email",
    comments:
      "The primary email address used to reach the contact, such as work@example.com.",
    placeholder: "Enter email address",
    example: "mark@designservices.com",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),
  phone: input({
    label: "Phone",
    comments:
      "The primary phone number for the contact, including area or country code.",
    placeholder: "Enter phone number",
    example: "508-778-6516",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),
  mobile: input({
    label: "Mobile",
    comments: "The contact's mobile number, used for SMS and calls.",
    placeholder: "Enter mobile phone number",
    example: "508-778-6516",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),
  fax: input({
    label: "Fax",
    comments:
      "The fax number for sending documents to the contact, including country code.",
    placeholder: "Enter fax number",
    example: "+44-208-1234567",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),
  twitter: input({
    label: "Twitter",
    comments: "The contact's Twitter handle, without the leading @ symbol.",
    placeholder: "Enter Twitter username",
    example: "mjohnson",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),
  facebook: input({
    label: "Facebook",
    comments: "The contact's Facebook profile name or vanity URL slug.",
    placeholder: "Enter Facebook username",
    example: "mjohnson",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),
  linkedin: input({
    label: "LinkedIn",
    comments:
      "The contact's LinkedIn profile name, used to link to their professional page.",
    placeholder: "Enter LinkedIn username",
    example: "mjohnson",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),
  skype: input({
    label: "Skype",
    comments: "The contact's Skype handle, used for voice and video calls.",
    placeholder: "Enter Skype username",
    example: "mjohnson",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),
  website: input({
    label: "Website",
    comments: "The contact's website, such as a company or personal homepage.",
    placeholder: "Enter website URL",
    example: "www.designservices.com",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),
};

const listEmail = input({
  label: "Email",
  comments: "Filters results to contacts with this email address.",
  placeholder: "Enter email address",
  example: "mark@designservices.com",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const listPhone = input({
  label: "Phone",
  comments: "Filters results to contacts with this phone number.",
  placeholder: "Enter phone number",
  example: "508-778-6516",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const listMobile = input({
  label: "Mobile",
  comments: "Filters results to contacts with this mobile number.",
  placeholder: "Enter mobile phone number",
  example: "508-778-6516",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const createCustomerStatus = input({
  label: "Customer Status",
  comments:
    "Customer status of the contact. Possible values: none, current, past.",
  placeholder: "Select customer status",
  example: "none",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const customerStatus = input({
  label: "Customer Status",
  comments:
    "Customer status of the contact. Possible values: none, current, past.",
  type: "string",
  default: "",
  model: [
    { label: "", value: "" },
    { label: "none", value: "none" },
    { label: "current", value: "current" },
    { label: "past", value: "past" },
  ],
  required: false,
  clean: util.types.toString,
});

const createProspectStatus = input({
  label: "Prospect Status",
  comments:
    "Prospect status of the contact. Possible values: none, current, lost.",
  placeholder: "Select prospect status",
  example: "current",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const prospectStatus = input({
  label: "Prospect Status",
  comments:
    "Prospect status of the contact. Possible values: none, current, lost.",
  type: "string",
  default: "",
  model: [
    { label: "", value: "" },
    { label: "none", value: "none" },
    { label: "current", value: "current" },
    { label: "lost", value: "lost" },
  ],
  required: false,
  clean: util.types.toString,
});

const title = input({
  label: "Title",
  comments: "Job title of the contact.",
  placeholder: "Enter job title",
  example: "CEO",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const description = input({
  label: "Description",
  comments: "Additional notes or details about the contact.",
  placeholder: "Enter description",
  example: "I know him via Tom",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const industry = input({
  label: "Industry",
  comments: "Industry classification of the contact.",
  placeholder: "Enter industry",
  example: "Design Services",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const ownerId = input({
  label: "Owner ID",
  comments:
    "The unique identifier of the user who owns or will own the contact.",
  placeholder: "Enter Owner ID",
  example: "12345678",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const ownerIdFilter = input({
  label: "Owner ID",
  comments: "User ID. Returns all contacts owned by that user.",
  placeholder: "Enter Owner ID",
  example: "12345678",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const additionalContactId = input({
  label: "Contact ID",
  comments:
    "Set only when Is Organization is set to false (the contact is an individual).",
  placeholder: "Enter Contact ID",
  example: "87654321",
  type: "string",
  required: false,
  clean: util.types.toString,
  dataSource: "selectContact",
});

const additionalContactIdFilter = input({
  label: "Contact ID",
  comments:
    "The unique identifier of the organization that the contact belongs to.",
  placeholder: "Enter Contact ID",
  example: "87654321",
  type: "string",
  required: false,
  clean: util.types.toString,
  dataSource: "selectContact",
});

const parentOrganizationId = input({
  label: "Parent Organization ID",
  comments:
    "The unique identifier of a contact that should be set as parent for this organization. Referenced contact also has to be an organization. It can be set only for organization contacts (is_organization set to true).",
  placeholder: "Enter Parent Organization ID",
  example: "11223344",
  type: "string",
  required: false,
  clean: util.types.toString,
  dataSource: "selectContact",
});

const creatorId = input({
  label: "Creator ID",
  comments: "User ID. Returns all contacts created by that user.",
  placeholder: "Enter Creator ID",
  example: "12345678",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const contactIds = input({
  label: "Contact IDs",
  comments:
    "Comma-separated list of the contact IDs to be returned in the request.",
  placeholder: "Enter comma-separated contact IDs",
  example: "12345678,87654321",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const sortBy = input({
  label: "Sort By",
  comments: "A field to sort by. Filterable custom fields can also be used.",
  placeholder: "Enter field to sort by",
  example: "first_name",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const listInclusive = input({
  label: "Inclusive",
  comments:
    "Indicates how filters should be combined. true value, the default, uses AND logic. false value uses OR logic to combine filters.",
  type: "string",
  default: "",
  model: [
    { label: "", value: "" },
    { label: "true", value: "true" },
    { label: "false", value: "false" },
  ],
  required: false,
  clean: util.types.toString,
});

const upsertInclusive = input({
  label: "Inclusive",
  comments:
    "Indicates how filters should be combined. true value, the default, uses AND logic. false value uses OR logic to combine filters.",
  type: "string",
  default: "",
  model: [
    { label: "", value: "" },
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ],
  required: false,
  clean: util.types.toString,
});

export const createContactInputs = {
  connection,
  isOrganization: isOrganizationCreate,
  name: createOrgName,
  firstName,
  lastName: createLastName,

  contactInfo: structuredObjectInput({
    label: "Contact Information",
    required: false,
    comments: "Email, phone, and other contact channel details.",
    inputs: contactChannelInputs,
  }),

  addresses: structuredObjectInput({
    label: "Addresses",
    required: false,
    comments: "Physical, billing, and shipping addresses.",
    inputs: {
      address: addressInput,
      billingAddress: billingAddressJson,
      shippingAddress: shippingAddressJson,
    },
  }),

  customFields,

  tags,

  additionalFields: structuredObjectInput({
    label: "Additional Fields",
    required: false,
    comments:
      "Additional optional fields for the request. Includes: Customer Status, " +
      "Prospect Status, Title, Description, Industry, Owner ID, Contact ID, and " +
      "Parent Organization ID.",
    inputs: {
      customerStatus: createCustomerStatus,
      prospectStatus: createProspectStatus,
      title,
      description,
      industry,
      ownerId,
      contactId: additionalContactId,
      parentOrganizationId,
    },
  }),
};

export const deleteContactInputs = {
  connection,
  id: contactId,
};

export const getContactInputs = {
  connection,
  id: contactId,
};

export const getContactsStreamInputs = {
  connection,
  position,
  limit,
};

export const listContactsInputs = {
  connection,
  fetchAll,

  isOrganization: isOrganizationList,
  name: orgNameFilter,
  firstName: firstNameFilter,
  lastName: lastNameFilter,

  contactInfo: structuredObjectInput({
    label: "Contact Information",
    required: false,
    comments: "Email, phone, and other contact channel details.",
    inputs: {
      email: listEmail,
      phone: listPhone,
      mobile: listMobile,
    },
  }),

  address: structuredObjectInput({
    label: "Primary Address",
    required: false,
    comments: "Street, city, state, postal code, and country.",
    inputs: {
      addressCity: addressCityFilter,
      addressPostalCode: addressPostalCodeFilter,
      addressCountry: addressCountryFilter,
      addressState,
    },
  }),

  otherAddresses: structuredObjectInput({
    label: "Other Addresses",
    required: false,
    comments: "Billing and shipping addresses.",
    inputs: {
      billingAddress: billingAddressString,
      shippingAddress: shippingAddressString,
    },
  }),

  customFields,

  pagination: structuredObjectInput({
    label: "Pagination",
    required: false,
    comments: "Page and page-size controls.",
    inputs: {
      page,
      perPage,
    },
  }),

  additionalFields: structuredObjectInput({
    label: "Additional Fields",
    required: false,
    comments:
      "Additional optional fields for the request. Includes: Customer Status, Prospect Status, Contact IDs, Creator ID, Owner ID, Contact ID, Sort By, and Inclusive.",
    inputs: {
      customerStatus,
      prospectStatus,
      ids: contactIds,
      creatorId,
      ownerId: ownerIdFilter,
      contactId: additionalContactIdFilter,
      sortBy,
      inclusive: listInclusive,
    },
  }),
};

export const updateContactInputs = {
  connection,
  id: contactId,

  name: orgName,
  firstName,
  lastName,

  contactInfo: structuredObjectInput({
    label: "Contact Information",
    required: false,
    comments: "Email, phone, and other contact channel details.",
    inputs: contactChannelInputs,
  }),

  addresses: structuredObjectInput({
    label: "Addresses",
    required: false,
    comments: "Physical, billing, and shipping addresses.",
    inputs: {
      address: addressInput,
      billingAddress: billingAddressJson,
      shippingAddress: shippingAddressJson,
    },
  }),

  customFields,

  tags,

  additionalFields: structuredObjectInput({
    label: "Additional Fields",
    required: false,
    comments:
      "Additional optional fields for the request. Includes: Customer Status, " +
      "Prospect Status, Title, Description, Industry, Owner ID, Contact ID, and " +
      "Parent Organization ID.",
    inputs: {
      customerStatus,
      prospectStatus: createProspectStatus,
      title,
      description,
      industry,
      ownerId,
      contactId: additionalContactId,
      parentOrganizationId,
    },
  }),
};

export const upsertContactInputs = {
  connection,
  isOrganization: isOrganizationCreate,

  name: orgName,
  firstName,
  lastName,

  contactInfo: structuredObjectInput({
    label: "Contact Information",
    required: false,
    comments: "Email, phone, and other contact channel details.",
    inputs: {
      email: contactChannelInputs.email,
      phone: contactChannelInputs.phone,
      mobile: contactChannelInputs.mobile,
    },
  }),

  addresses: structuredObjectInput({
    label: "Addresses",
    required: false,
    comments: "Physical, billing, and shipping addresses.",
    inputs: {
      addressCity,
      addressPostalCode,
      addressCountry,
      billingAddress: billingAddressJson,
      shippingAddress: shippingAddressJson,
    },
  }),

  customFields,

  filterableCustomFields,

  additionalFields: structuredObjectInput({
    label: "Additional Fields",
    required: false,
    comments:
      "Additional optional fields for the request. Includes: Customer Status, " +
      "Prospect Status, Inclusive, Creator ID, Owner ID, Contact ID, and Parent " +
      "Organization ID.",
    inputs: {
      customerStatus,
      prospectStatus,
      inclusive: upsertInclusive,
      creatorId,
      ownerId: ownerIdFilter,
      contactId: additionalContactIdFilter,
      parentOrganizationId,
    },
  }),
};
