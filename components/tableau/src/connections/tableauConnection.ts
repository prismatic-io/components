import { connection } from "@prismatic-io/spectral";

export const tableauConnection = connection({
  key: "privateKey",
  display: {
    label: "Personal Access Token",
    description:
      "Authenticate requests to Tableau using a Personal Access Token.",
  },
  inputs: {
    token: {
      label: "Token Secret",
      placeholder: "Token Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Tableau Personal Access Token secret. This value can be created from the Tableau account.",
      example: "xxxxxxxxxxxxxxxxxxxxxx==:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    },
    tokenName: {
      label: "Token Name",
      placeholder: "Token Name",
      type: "string",
      required: true,
      shown: true,
      comments: "The name of the Tableau Personal Access Token.",
      example: "My Token",
    },
    hostName: {
      label: "Host Name",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The host name of the Tableau server, without the https:// prefix.",
      example: "10ay.online.tableau.com",
    },
    siteId: {
      label: "Site ID",
      type: "string",
      shown: true,
      required: true,
      comments:
        "The ID of the Tableau site (the MarketingTeam part of https://10ay.online.tableau.com/#/site/MarketingTeam/workbooks).",
      example: "MarketingTeam",
    },
  },
});
