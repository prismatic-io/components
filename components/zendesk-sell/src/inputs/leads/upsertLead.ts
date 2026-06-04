import { input, util } from "@prismatic-io/spectral";
import { connection } from "../common";

export const upsertLeadInputs = {
  connection,
  creatorId: input({
    label: "Creator ID",
    comments: "User ID. Returns all leads created by that user.",
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
    comments: "User ID. Returns all leads owned by that user.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  sourceId: input({
    label: "Source ID",
    placeholder: "Enter Source ID",
    example: "12345678",
    comments: "ID of the Source.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  firstName: input({
    label: "First Name",
    placeholder: "Enter first name",
    comments: "First name of the lead.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  lastName: input({
    label: "Last Name",
    placeholder: "Enter last name",
    example: "Doe",
    comments: "Last name of the lead.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  organizationName: input({
    label: "Organization Name",
    placeholder: "Enter organization name",
    example: "Acme Corporation",
    comments: "Organization name of the lead.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  status: input({
    label: "Status",
    comments: "Status of the lead.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  email: input({
    label: "Email",
    comments: "Email address of the lead.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  phone: input({
    label: "Phone",
    comments: "Phone number of the lead.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  mobile: input({
    label: "Mobile",
    comments: "Mobile phone number of the lead.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  addressCity: input({
    label: "Address[city]",
    comments: "City name.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  addressPostalCode: input({
    label: "Address[postal Code]",
    comments: "Zip or Postal code",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  addressCountry: input({
    label: "Address[country]",
    comments: "Country name.",
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

  filterableCustomFields: input({
    label: "Filter",
    type: "string",
    collection: "keyvaluelist",
    required: true,
    comments: "Filterable custom field.",
    example: "key: custom_fields[referral_website] value: https://www.test.com",
  }),

  inclusive: input({
    label: "Inclusive",
    comments:
      "Indicates how filters should be combine. true value, the default, uses AND logic. false value uses OR logic to combine filters.",
    type: "string",
    default: "",
    model: [
      { label: "", value: "" },
      { label: "True", value: "true" },
      { label: "False", value: "false" },
    ],
    required: false,
    clean: util.types.toString,
  }),
};
