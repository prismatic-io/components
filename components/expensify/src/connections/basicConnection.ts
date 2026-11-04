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
        "The partnerUserID generated on the Expensify Integrations page. See the [Integration Server documentation](https://integrations.expensify.com/Integration-Server/doc/) for how to generate it.",
      example: "_REPLACE_",
    },
    partnerUserSecret: {
      label: "Partner User Secret",
      placeholder: "partnerUserSecret",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The partnerUserSecret generated together with the Partner User ID. Expensify shows it only once, so store it securely when it is generated.",
      example: "_REPLACE_",
    },
  },
});
