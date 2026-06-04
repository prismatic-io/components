import { connection } from "@prismatic-io/spectral";

export const tableauConnection = connection({
  key: "privateKey",
  display: {
    label: "Personal Access Token",
    description: "Personal Access Token connection for Tableau",
  },
  inputs: {
    token: {
      label: "Token Secret",
      placeholder: "Token Secret",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Provide a string value for the Tableau Token. This value can be created from your Tableau account.",
      example: "xxxxxxxxxxxxxxxxxxxxxx==:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    },
    tokenName: {
      label: "Token Name",
      placeholder: "Token Name",
      type: "string",
      required: true,
      shown: true,
      comments: "Provide a string value for the name of the Tableau Token.",
      example: "My Token",
    },
    hostName: {
      label: "Host Name",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Provide a string value for the host name of the Tableau server, without the https://",
      example: "10ay.online.tableau.com",
    },
    siteId: {
      label: "Site ID",
      type: "string",
      shown: true,
      required: true,
      comments:
        "The ID of your Tableau site (MarketingTeam part of https://10ay.online.tableau.com/#/site/MarketingTeam/workbooks)",
      example: "MarketingTeam",
    },
  },
});

export default [tableauConnection];
