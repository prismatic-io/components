import { connection } from "@prismatic-io/spectral";

export const sageIntacctConnection = connection({
  key: "sageIntacctConnection",
  display: {
    label: "Sage Intacct Connection",
    description: "Web Service Authentication",
  },
  inputs: {
    senderId: {
      label: "Sender ID",
      placeholder: "Enter sender ID",
      type: "string",
      required: true,
      comments: "The Sender ID provided by Sage Intacct for Web Services authentication. Find this in your Sage Intacct account under Company > Setup > Company > Security.",
      example: "ACME_CORP",
    },
    senderPassword: {
      label: "Sender Password",
      placeholder: "Enter sender password",
      type: "password",
      required: true,
      comments: "The Sender Password for Web Services authentication. This password is set when configuring Web Services access in Sage Intacct.",
    },
    companyId: {
      label: "Company ID",
      placeholder: "Enter company ID",
      type: "string",
      required: true,
      comments: "Your Sage Intacct Company ID. This is your unique company identifier in Sage Intacct.",
      example: "ACME_INC",
    },
    userId: {
      label: "User ID",
      placeholder: "Enter user ID",
      type: "string",
      required: true,
      comments: "The User ID (username) for Web Services authentication. This must be a user with appropriate API permissions.",
      example: "apiuser@acme.com",
    },
    userPassword: {
      label: "User Password",
      placeholder: "Enter user password",
      type: "password",
      required: true,
      comments: "The password for the Web Services user account.",
    },
    entityId: {
      label: "Entity ID",
      placeholder: "Enter entity ID",
      type: "string",
      required: false,
      comments: "Optional entity ID for multi-entity Sage Intacct environments. Leave blank if your organization uses a single entity.",
      example: "ENTITY_001",
    },
  },
});

export default [sageIntacctConnection];
