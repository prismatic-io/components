import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";
import { DATA_CENTERS } from "./constants";
import type { MapModel } from "./interfaces";

const mapModel = (array: MapModel[]) => {
  const modelArray = array.map(({ label, value }) => ({
    label,
    value,
  }));
  return [{ label: "", value: "" }, ...modelArray];
};

export const oauth2 = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  key: "sdp-oauth2",
  display: {
    label: "OAuth 2.0",
    description: "OAuth 2.0 connection for ServiceDesk Plus",
  },
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Authorization URL for ServiceDesk Plus",
      default: "https://accounts.zoho.com/oauth/v2/auth?access_type=offline",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Token URL for ServiceDesk Plus",
      default: "https://accounts.zoho.com/oauth/v2/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: true,
      shown: true,
      default:
        "SDPOnDemand.assets.ALL SDPOnDemand.cmdb.ALL SDPOnDemand.setup.ALL",
      comments:
        "A comma-delimited set of one or more scopes to get the user's permission to access. Refer to https://www.manageengine.com/products/service-desk/sdpod-v3-api/getting-started/oauth-2.0.html#scopes",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
      shown: true,
    },
    dataCenter: {
      label: "Data Center",
      placeholder: "Data Center",
      type: "string",
      model: mapModel(DATA_CENTERS),
      default: "",
      required: true,
      shown: true,
    },
  },
});

export default [oauth2];
