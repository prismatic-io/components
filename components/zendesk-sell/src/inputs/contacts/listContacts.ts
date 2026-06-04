import { input, util } from "@prismatic-io/spectral";
import { connection, fetchAll } from "../common";

export const listContactsInputs = {
  connection,
  fetchAll,
  sortBy: input({
    label: "Sort By",
    comments:
      "A field to sort by. You can sort by filterable custom fields as well.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  ids: input({
    label: "IDs",
    comments:
      "Comma-separated list of the IDs for the contacts you want to be returned in your request.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  creatorId: input({
    label: "Creator ID",
    comments: "User ID. Returns all contacts created by that user.",
    placeholder: "Enter Creator ID",
    example: "12345678",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  ownerId: input({
    label: "Owner ID",
    placeholder: "Enter Owner ID",
    example: "12345678",
    comments: "User ID. Returns all contacts owned by that user.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  isOrganization: input({
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
  }),

  contactId: input({
    label: "Contact ID",
    placeholder: "Enter Contact ID",
    example: "87654321",
    comments:
      "The unique identifier of the organization that the contact belongs to.",
    type: "string",
    required: false,
    clean: util.types.toString,
    dataSource: "selectContact",
  }),

  name: input({
    label: "Name",
    placeholder: "Enter name",
    comments: "Name of the contact.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  firstName: input({
    label: "First Name",
    placeholder: "Enter first name",
    comments: "First name of the contact.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  lastName: input({
    label: "Last Name",
    placeholder: "Enter last name",
    example: "Doe",
    comments: "Last name of the contact.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  email: input({
    label: "Email",
    comments: "Email address of the contact.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  phone: input({
    label: "Phone",
    comments: "Phone number of the contact.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  mobile: input({
    label: "Mobile",
    comments: "Mobile phone number of the contact.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  customerStatus: input({
    label: "Customer Status",
    comments:
      "Customer status of the contact. Possible values: none, current, past",
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
  }),

  prospectStatus: input({
    label: "Prospect Status",
    comments:
      "Prospect status of the contact. Possible values: none, current, lost",
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
  }),

  addressCity: input({
    label: "Address (City)",
    comments: "City name.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  addressPostalCode: input({
    label: "Address (Postal Code)",
    comments: "Zip code or equivalent",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  addressCountry: input({
    label: "Address (Country)",
    comments: "Country name.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  addressState: input({
    label: "Address (State)",
    comments: "State/region name.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  billingAddress: input({
    label: "Billing Address",
    comments:
      "null if contact is neither a customer nor a prospect (see customer_status and prospect_status fields for details).",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  shippingAddress: input({
    label: "Shipping Address",
    comments:
      "null if contact is neither a customer nor a prospect (see customer_status and prospect_status fields for details).",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  customFields: input({
    label: "Custom Field",
    comments: "Filterable custom field key-value pairs.",
    placeholder: "Enter custom field key-value pairs",
    type: "string",
    collection: "keyvaluelist",
    required: false,
    example: "key: external_id value: SKU01",
  }),

  inclusive: input({
    label: "Inclusive",
    comments:
      "Indicates how filters should be combine. true value, the default, uses AND logic. false value uses OR logic to combine filters.",
    type: "string",
    default: "",
    model: [
      { label: "", value: "" },
      { label: "true", value: "true" },
      { label: "false", value: "false" },
    ],
    required: false,
    clean: util.types.toString,
  }),
  page: input({
    label: "Page",
    comments:
      "The page number to start from. Page numbering is 1-based and omitting the page parameter will return the first page.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  perPage: input({
    label: "Per Page",
    comments:
      "The number of records to return per page. Default limit is 25 and maximum number that can be returned is 100.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),
};
