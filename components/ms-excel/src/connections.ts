import {
  input,
  type InputFieldChoice,
  oauth2Connection,
  OAuth2Type,
  util,
} from "@prismatic-io/spectral";
import { WORKBOOK_SOURCES } from "./constants";
import { ConnectionKeys } from "ms-utils";



const mapModel = (source: Record<string, string>): InputFieldChoice[] =>
  Object.keys(source).map((key) => ({
    label: key,
    value: source[key],
  }));

const source = input({
  label: "Source",
  type: "string",
  comments: "The source from which the workbooks will be listed.",
  required: true,
  model: mapModel(WORKBOOK_SOURCES),
  clean: util.types.toString,
});

export const msExcelOauth = oauth2Connection({
  key: ConnectionKeys.MsExcelOauth,
  display: {
    description: "Authenticate using OAuth 2.0",
    label: "OAuth 2.0",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  comments: "OAuth 2.0 Connectivity for Microsoft Excel",
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter Authorize URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Authorization URL for Microsoft Excel.",
      default: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Token URL for Microsoft Excel.",
      default: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter OAuth scopes",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Space-separated list of OAuth 2.0 permission scopes required for the integration.",
      default:
        "Files.ReadWrite.All Sites.Read.All Sites.ReadWrite.All offline_access",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Client ID from the OAuth application registration in the Azure Portal.",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Client Secret from the OAuth application registration in the Azure Portal.",
    },
    source,
  },
});

export default [msExcelOauth];
