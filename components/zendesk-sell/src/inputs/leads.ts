import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { connection, fetchAll } from "./common";

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

const address = input({
  label: "Address",
  comments: "The physical address of the lead in JSON format.",
  type: "code",
  language: "json",
  example: JSON.stringify(
    {
      line1: "2726 Smith Street",
      city: "Hyannis",
      postal_code: "02601",
      state: "MA",
      country: "US",
    },
    null,
    2,
  ),
  required: false,
  clean: util.types.toString,
});

const organizationName = input({
  label: "Organization Name",
  placeholder: "Enter organization name",
  example: "Acme Corporation",
  comments:
    "The company name. Required when the lead is an organization (when Last Name is empty).",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const organizationNameFilter = input({
  label: "Organization Name",
  placeholder: "Enter organization name",
  example: "Acme Corporation",
  comments: "Filters results to organization leads with this company name.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const firstName = input({
  label: "First Name",
  placeholder: "Enter first name",
  comments: "The given name of an individual lead.",
  example: "John",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const firstNameFilter = input({
  label: "First Name",
  placeholder: "Enter first name",
  example: "John",
  comments: "Filters results to leads with this given name.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const lastName = input({
  label: "Last Name",
  placeholder: "Enter last name",
  example: "Doe",
  comments: "The family name of an individual lead.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const lastNameFilter = input({
  label: "Last Name",
  placeholder: "Enter last name",
  example: "Doe",
  comments: "Filters results to leads with this family name.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const leadId = input({
  label: "Lead ID",
  comments: "The unique identifier of the lead.",
  placeholder: "Enter lead ID",
  example: "12345678",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectLead",
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

const status = input({
  label: "Status",
  comments: "The pipeline stage the lead is in, such as New or Working.",
  placeholder: "Enter status",
  example: "New",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const statusFilter = input({
  label: "Status",
  comments: "Filters results to leads in this status (e.g. New).",
  placeholder: "Enter status",
  example: "New",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const title = input({
  label: "Title",
  placeholder: "Enter title",
  comments: "The lead's job title or role within their organization.",
  example: "CEO",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const description = input({
  label: "Description",
  placeholder: "Enter description",
  comments: "Free-form notes or background information about the lead.",
  example: "Key decision maker for enterprise software",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const industry = input({
  label: "Industry",
  placeholder: "Enter industry",
  comments: "The business sector the lead operates in.",
  example: "Technology",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const sourceIdAdditional = input({
  label: "Source ID",
  comments: "The unique identifier of the lead source.",
  placeholder: "Enter Source ID",
  example: "12345678",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const unqualifiedReasonId = input({
  label: "Unqualified Reason ID",
  comments: "The unique identifier of the reason the lead was unqualified.",
  placeholder: "Enter Unqualified Reason ID",
  example: "12345678",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const ownerId = input({
  label: "Owner ID",
  placeholder: "Enter Owner ID",
  example: "12345678",
  comments:
    "The unique identifier of the user who owns the lead. Defaults to the user who created the lead.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const ownerIdFilter = input({
  label: "Owner ID",
  placeholder: "Enter Owner ID",
  example: "12345678",
  comments: "User ID. Returns all leads owned by that user.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const creatorId = input({
  label: "Creator ID",
  comments: "User ID. Returns all leads created by that user.",
  placeholder: "Enter Creator ID",
  example: "12345678",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const ids = input({
  label: "IDs",
  comments: "Comma-separated list of lead IDs to be returned in a request.",
  placeholder: "Enter comma-separated IDs",
  example: "12345678,87654321",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const sourceId = input({
  label: "Source ID",
  placeholder: "Enter Source ID",
  example: "12345678",
  comments: "Filters results to leads that originated from this source.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const listEmail = input({
  label: "Email",
  comments: "Filters results to leads with this email address.",
  placeholder: "Enter email address",
  example: "john.doe@example.com",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const listPhone = input({
  label: "Phone",
  comments: "Filters results to leads with this phone number.",
  placeholder: "Enter phone number",
  example: "508-778-6516",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const listMobile = input({
  label: "Mobile",
  comments: "Filters results to leads with this mobile number.",
  placeholder: "Enter mobile phone number",
  example: "508-778-6516",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const addressCity = input({
  label: "City",
  comments: "Filters results to leads located in this city.",
  placeholder: "Enter city",
  example: "Hyannis",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const addressPostalCode = input({
  label: "Zip/Postal Code",
  comments: "Filters results to leads with this postal or ZIP code.",
  placeholder: "Enter ZIP or postal code",
  example: "02601",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const addressState = input({
  label: "State/Province",
  comments: "Filters results to leads located in this state or region.",
  placeholder: "Enter state or province",
  example: "MA",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const addressCountry = input({
  label: "Country",
  comments: "Filters results to leads located in this country.",
  placeholder: "Enter country",
  example: "US",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const page = input({
  label: "Page",
  comments:
    "Page number to start from. Page numbering starts at 1 and omitting the page parameter will return the first page.",
  placeholder: "Enter page number",
  example: "1",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const perPage = input({
  label: "Per Page",
  comments:
    "Number of records to return per page. The default limit is 25 and the maximum number that can be returned is 100.",
  placeholder: "Enter results per page",
  example: "25",
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

const inclusive = input({
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

const upsertAddressCity = input({
  label: "City",
  comments: "The city of the lead's physical address.",
  placeholder: "Enter city",
  example: "Hyannis",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const upsertAddressPostalCode = input({
  label: "Zip/Postal Code",
  comments: "The postal or ZIP code of the lead's physical address.",
  placeholder: "Enter ZIP or postal code",
  example: "02601",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const upsertAddressCountry = input({
  label: "Country",
  comments: "The country of the lead's physical address.",
  placeholder: "Enter country",
  example: "US",
  type: "string",
  required: false,
  clean: util.types.toString,
});

const filterableCustomFields = input({
  label: "Filters",
  comments: "Custom-field filters to match against.",
  type: "string",
  collection: "keyvaluelist",
  required: true,
  example: "key: custom_fields[referral_website] value: https://www.test.com",
});

const contactChannelInputs = {
  email: input({
    label: "Email",
    placeholder: "Enter email address",
    comments:
      "The primary email address used to reach the lead, such as work@example.com.",
    example: "john.doe@example.com",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  phone: input({
    label: "Phone",
    placeholder: "Enter phone number",
    comments:
      "The primary phone number for the lead, including area or country code.",
    example: "508-778-6516",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  mobile: input({
    label: "Mobile",
    placeholder: "Enter mobile phone number",
    comments: "The lead's mobile number, used for SMS and calls.",
    example: "508-778-6516",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  fax: input({
    label: "Fax",
    placeholder: "Enter fax number",
    comments:
      "The fax number for sending documents to the lead, including country code.",
    example: "+44-208-1234567",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  twitter: input({
    label: "Twitter",
    placeholder: "Enter Twitter username",
    comments: "The lead's Twitter handle, without the leading @ symbol.",
    example: "johndoe",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  facebook: input({
    label: "Facebook",
    placeholder: "Enter Facebook username",
    comments: "The lead's Facebook profile name or vanity URL slug.",
    example: "johndoe",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  linkedin: input({
    label: "LinkedIn",
    placeholder: "Enter LinkedIn username",
    comments:
      "The lead's LinkedIn profile name, used to link to their professional page.",
    example: "johndoe",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  skype: input({
    label: "Skype",
    placeholder: "Enter Skype username",
    comments: "The lead's Skype handle, used for voice and video calls.",
    example: "johndoe",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  website: input({
    label: "Website",
    placeholder: "Enter website URL",
    comments: "The lead's website, such as a company or personal homepage.",
    example: "www.example.com",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),
};

const contactInfo = structuredObjectInput({
  label: "Contact Information",
  required: false,
  comments: "Email, phone, and other contact channel details.",
  inputs: contactChannelInputs,
});

const listContactInfo = structuredObjectInput({
  label: "Contact Information",
  required: false,
  comments: "Email, phone, and other contact channel details.",
  inputs: {
    email: listEmail,
    phone: listPhone,
    mobile: listMobile,
  },
});

const upsertContactInfo = structuredObjectInput({
  label: "Contact Information",
  required: false,
  comments: "Email, phone, and other contact channel details.",
  inputs: {
    email: contactChannelInputs.email,
    phone: contactChannelInputs.phone,
    mobile: contactChannelInputs.mobile,
  },
});

const listAddress = structuredObjectInput({
  label: "Address",
  required: false,
  comments: "Street, city, state, postal code, and country.",
  inputs: {
    addressCity,
    addressPostalCode,
    addressState,
    addressCountry,
  },
});

const upsertAddresses = structuredObjectInput({
  label: "Addresses",
  required: false,
  comments: "Physical, billing, and shipping addresses.",
  inputs: {
    addressCity: upsertAddressCity,
    addressPostalCode: upsertAddressPostalCode,
    addressCountry: upsertAddressCountry,
  },
});

const listPagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page and page-size controls.",
  inputs: {
    page,
    perPage,
  },
});

const createUpdateAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields for the request. Includes: Status, Title, " +
    "Description, Industry, Owner ID, Source ID, and Unqualified Reason ID.",
  inputs: {
    status,
    title,
    description,
    industry,
    ownerId,
    sourceId: sourceIdAdditional,
    unqualifiedReasonId,
  },
});

const listAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields for the request. Includes: Sort By and Inclusive.",
  inputs: {
    sortBy,
    inclusive,
  },
});

const upsertAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields for the request. Includes: Status, Inclusive, " +
    "Creator ID, Owner ID, and Source ID.",
  inputs: {
    status,
    inclusive: upsertInclusive,
    creatorId,
    ownerId,
    sourceId: sourceIdAdditional,
  },
});

export const createLeadInputs = {
  connection,
  organizationName,
  firstName,
  lastName,
  address,
  contactInfo,
  customFields,
  tags,
  additionalFields: createUpdateAdditionalFields,
};

export const deleteLeadInputs = {
  connection,
  id: leadId,
};

export const getLeadInputs = {
  connection,
  id: leadId,
};

export const getLeadsStreamInputs = {
  connection,
  position,
  limit,
};

export const listLeadsInputs = {
  connection,

  fetchAll,

  organizationName: organizationNameFilter,

  firstName: firstNameFilter,

  lastName: lastNameFilter,

  status: statusFilter,

  ids,

  creatorId,

  ownerId: ownerIdFilter,

  sourceId,

  contactInfo: listContactInfo,

  address: listAddress,

  customFields,

  pagination: listPagination,

  additionalFields: listAdditionalFields,
};

export const updateLeadInputs = {
  connection,
  id: leadId,
  organizationName,
  firstName,
  lastName,
  address,
  contactInfo,
  customFields,
  tags,
  additionalFields: createUpdateAdditionalFields,
};

export const upsertLeadInputs = {
  connection,
  organizationName,
  firstName,
  lastName,
  contactInfo: upsertContactInfo,
  addresses: upsertAddresses,
  customFields,
  filterableCustomFields,
  additionalFields: upsertAdditionalFields,
};
