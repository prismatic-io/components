import { connection } from "@prismatic-io/spectral";
import { apiServer, protocol } from "./inputs";

export const basicAuthentication = connection({
  key: "sap-successfactors-basic-authentication",
  display: {
    label: "Basic Authentication (Notice of Deprecation)",
    description:
      "Authenticate using a username and password. **Notice of Deprecation:** SAP SuccessFactors is removing HTTP Basic Authentication on November 20, 2026. Use API Key Authentication instead.",
  },
  inputs: {
    companyId: {
      label: "Company ID",
      placeholder: "Company ID",
      type: "string",
      required: true,
      shown: true,
      comments: "SAP SuccessFactors Company ID",
    },
    username: {
      label: "Username",
      placeholder: "Username",
      type: "string",
      required: true,
      shown: true,
      comments: "SAP SuccessFactors Username",
    },
    password: {
      label: "Password",
      placeholder: "Password",
      type: "password",
      required: true,
      shown: true,
      comments: "SAP SuccessFactors Password",
    },
    protocol,
    apiServer,
  },
});
