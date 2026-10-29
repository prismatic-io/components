import { input } from "@prismatic-io/spectral";
import { AVAILABLE_PROTOCOLS } from "../constants";

export const apiServer = input({
  label: "API Server",
  placeholder: "testing.successfactors.com",
  type: "string",
  required: false,
  shown: true,
  comments:
    "Your SAP SuccessFactors api server, if you are not sure, please contact your SAP SuccessFactors administrator. If empty the sandbox environment will be used (sandbox.api.sap.com)",
  example: "testing.successfactors.com",
});

export const protocol = input({
  label: "Protocol",
  placeholder: "Protocol",
  type: "string",
  required: true,
  shown: true,
  comments: "The SAP SuccessFactors protocol to use",
  model: AVAILABLE_PROTOCOLS,
});
