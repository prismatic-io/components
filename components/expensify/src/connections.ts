import { connection } from "@prismatic-io/spectral";

export const basicConnection = connection({
  key: "basic",
  display: {
    label: "Basic Connection",
    description: "Basic connection for Expensify",
  },
  inputs: {
    partnerUserID: {
      label: "Partner User ID",
      placeholder: "partnerUserID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Provide a string value for the partnerUserID of your Expensify account.",
      example: "_REPLACE_",
    },
    partnerUserSecret: {
      label: "Partner User Secret",
      placeholder: "partnerUserSecret",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Provide a string value for the partnerUserSecret of your Expensify account.",
      example: "_REPLACE_",
    },
  },
});

export default [basicConnection];
