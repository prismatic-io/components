import { input, util } from "@prismatic-io/spectral";
import { connection } from "../common";

export const createContactInputs = {
  connection,
  name: input({
    label: "Name",
    comments:
      "Required only if the contact is an organization. is_organization is set to true.",
    placeholder: "Enter organization name",
    example: "Acme Corporation",
    type: "string",
    required: true,
    clean: util.types.toString,
  }),

  firstName: input({
    label: "First Name",
    comments:
      "The field will be set only if the contact is an individual. is_organization is set to false.",
    placeholder: "Enter first name",
    example: "John",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  lastName: input({
    label: "Last Name",
    comments:
      "Required only if the contact is an individual. is_organization is set to false.",
    placeholder: "Enter last name",
    example: "Doe",
    type: "string",
    required: true,
    clean: util.types.toString,
  }),

  ownerId: input({
    label: "Owner ID",
    comments:
      "Defaults to the unique identifier of the user who created the contact.",
    placeholder: "Enter Owner ID",
    example: "12345678",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  isOrganization: input({
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
  }),

  contactId: input({
    label: "Contact ID",
    comments:
      "The field will be set only if the contact is an individual. is_organization is set to false.",
    placeholder: "Enter Contact ID",
    example: "87654321",
    type: "string",
    required: false,
    clean: util.types.toString,
    dataSource: "selectContact",
  }),

  parentOrganizationId: input({
    label: "Parent Organization ID",
    comments:
      "The unique identifier of a contact that should be set as parent for this organization. Referenced contact also has to be an organization. It can be set only for organization contacts (is_organization set to true).",
    placeholder: "Enter Parent Organization ID",
    example: "11223344",
    type: "string",
    required: false,
    clean: util.types.toString,
    dataSource: "selectContact",
  }),

  customerStatus: input({
    label: "Customer Status",
    comments:
      "Customer status of the contact. Possible values: none, current, past.",
    placeholder: "Select customer status",
    example: "none",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  prospectStatus: input({
    label: "Prospect Status",
    comments:
      "Prospect status of the contact. Possible values: none, current, lost.",
    placeholder: "Select prospect status",
    example: "current",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  title: input({
    label: "Title",
    comments: "Job title of the contact.",
    placeholder: "Enter job title",
    example: "CEO",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  description: input({
    label: "Description",
    comments: "Additional notes or details about the contact.",
    placeholder: "Enter description",
    example: "I know him via Tom",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  industry: input({
    label: "Industry",
    comments: "Industry classification of the contact.",
    placeholder: "Enter industry",
    example: "Design Services",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  website: input({
    label: "Website",
    comments: "Website URL of the contact.",
    placeholder: "Enter website URL",
    example: "www.designservices.com",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  email: input({
    label: "Email",
    comments: "Email address of the contact.",
    placeholder: "Enter email address",
    example: "mark@designservices.com",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  phone: input({
    label: "Phone",
    comments: "Phone number of the contact.",
    placeholder: "Enter phone number",
    example: "508-778-6516",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  mobile: input({
    label: "Mobile",
    comments: "Mobile phone number of the contact.",
    placeholder: "Enter mobile phone number",
    example: "508-778-6516",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  fax: input({
    label: "Fax",
    comments: "Fax number of the contact.",
    placeholder: "Enter fax number",
    example: "+44-208-1234567",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  twitter: input({
    label: "Twitter",
    comments: "Twitter username of the contact.",
    placeholder: "Enter Twitter username",
    example: "mjohnson",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  facebook: input({
    label: "Facebook",
    comments: "Facebook username of the contact.",
    placeholder: "Enter Facebook username",
    example: "mjohnson",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  linkedin: input({
    label: "LinkedIn",
    comments: "LinkedIn username of the contact.",
    placeholder: "Enter LinkedIn username",
    example: "mjohnson",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  skype: input({
    label: "Skype",
    comments: "Skype username of the contact.",
    placeholder: "Enter Skype username",
    example: "mjohnson",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  address: input({
    label: "Address",
    comments: "Physical address of the contact.",
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
  }),

  billingAddress: input({
    label: "Billing Address",
    comments:
      "Billing address of the contact. null if contact is neither a customer nor a prospect (see customer_status and prospect_status fields for details).",
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
  }),

  shippingAddress: input({
    label: "Shipping Address",
    comments:
      "Shipping address of the contact. null if contact is neither a customer nor a prospect (see customer_status and prospect_status fields for details).",
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
  }),

  tags: input({
    label: "Tag",
    comments:
      "Tags to apply to the contact. You need to supply the entire set.",
    placeholder: "Enter tags",
    type: "string",
    collection: "valuelist",
    example: '["contractor", "vip"]',
    required: false,
  }),

  customFields: input({
    label: "Custom Field",
    type: "string",
    collection: "keyvaluelist",
    required: false,
    comments: "Filterable custom field key-value pairs.",
    placeholder: "Enter custom field key-value pairs",
    example: '{"known_via": "tom", "preferred_contact": "email"}',
  }),
};
