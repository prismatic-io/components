import { input, util } from "@prismatic-io/spectral";
import { connection } from "../common";

export const updateLeadInputs = {
  connection,
  id: input({
    label: "Lead ID",
    comments: "The unique identifier of the lead to update.",
    placeholder: "Enter Lead ID",
    example: "12345678",
    type: "string",
    required: true,
    clean: util.types.toString,
    dataSource: "selectLead",
  }),

  ownerId: input({
    label: "Owner ID",
    comments: "The unique identifier of the user who owns the lead.",
    placeholder: "Enter Owner ID",
    example: "12345678",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  firstName: input({
    label: "First Name",
    placeholder: "Enter first name",
    comments: "First name of the contact.",
    example: "John",

    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  lastName: input({
    label: "Last Name",
    comments: "The last name of the lead.",
    placeholder: "Enter last name",
    example: "Doe",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  organizationName: input({
    label: "Organization Name",
    comments: "The name of the organization for organization-type leads.",
    placeholder: "Enter organization name",
    example: "Acme Corporation",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  status: input({
    label: "Status",
    comments: "Status of the lead.",
    placeholder: "Enter status",
    example: "New",

    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  sourceId: input({
    label: "Source ID",
    comments: "The unique identifier of the lead source.",
    placeholder: "Enter Source ID",
    example: "12345678",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  unqualifiedReasonId: input({
    label: "Unqualified Reason ID",
    comments: "The unique identifier of the reason the lead was unqualified.",
    placeholder: "Enter Unqualified Reason ID",
    example: "12345678",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  title: input({
    label: "Title",
    placeholder: "Enter title",
    comments: "Job title or role.",
    example: "CEO",

    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  description: input({
    label: "Description",
    placeholder: "Enter description",
    comments: "Description or notes.",
    example: "Key decision maker for enterprise software",

    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  industry: input({
    label: "Industry",
    placeholder: "Enter industry",
    comments: "Industry classification.",
    example: "Technology",

    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  website: input({
    label: "Website",
    placeholder: "Enter website URL",
    comments: "Website URL.",
    example: "www.example.com",

    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  email: input({
    label: "Email",
    placeholder: "Enter email address",
    comments: "Email address.",
    example: "john.doe@example.com",

    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  phone: input({
    label: "Phone",
    placeholder: "Enter phone number",
    comments: "Phone number.",
    example: "508-778-6516",

    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  mobile: input({
    label: "Mobile",
    placeholder: "Enter mobile phone number",
    comments: "Mobile phone number.",
    example: "508-778-6516",

    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  fax: input({
    label: "Fax",
    placeholder: "Enter fax number",
    comments: "Fax number.",
    example: "+44-208-1234567",

    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  twitter: input({
    label: "Twitter",
    placeholder: "Enter Twitter username",
    comments: "Twitter username.",
    example: "johndoe",

    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  facebook: input({
    label: "Facebook",
    placeholder: "Enter Facebook username",
    comments: "Facebook username.",
    example: "johndoe",

    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  linkedin: input({
    label: "LinkedIn",
    placeholder: "Enter LinkedIn username",
    comments: "LinkedIn username.",
    example: "johndoe",

    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  skype: input({
    label: "Skype",
    placeholder: "Enter Skype username",
    comments: "Skype username.",
    example: "johndoe",

    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  address: input({
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
  }),

  tags: input({
    label: "Tag",
    comments: "Tags to apply. You need to supply the entire set.",
    placeholder: "Enter tags",
    type: "string",
    collection: "valuelist",
    example: "important",
    required: false,
  }),

  customFields: input({
    label: "Custom Field",
    comments: "Filterable custom field key-value pairs.",
    placeholder: "Enter custom field key-value pairs",
    type: "string",
    collection: "keyvaluelist",
    required: false,
    example: "key: known_via value: tom",
  }),
};
