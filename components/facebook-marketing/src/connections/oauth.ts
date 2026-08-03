import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";
import { DEFAULT_VERSION } from "../constants";
export const oauth = oauth2Connection({
  key: "oauth",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate using OAuth 2.0 authorization code flow",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      default: `https://www.facebook.com/v${DEFAULT_VERSION}.0/dialog/oauth`,
      label: "Authorize URL",
      type: "string",
      comments: "Provide a valid authURL for Meta Ads",
      required: true,
      shown: true,
    },
    tokenUrl: {
      label: "Token URL",
      type: "string",
      shown: true,
      comments: "Provide a valid Meta Ads version to complete the Token URL",
      default: `https://graph.facebook.com/v${DEFAULT_VERSION}.0/oauth/access_token`,
      required: true,
    },
    clientId: {
      label: "App Id",
      type: "string",
      shown: true,
      example: "1233096058094633",
      comments: "Provide the App Id that was generated from your Meta Ads App.",
      required: true,
    },
    clientSecret: {
      label: "App Secret",
      type: "password",
      example: "7699008007296c1689ddd30b0cf7c924",
      shown: true,
      comments:
        "Provide the App Secret that was generated from your Meta Ads App.",
      required: true,
    },
    scopes: {
      label: "Scopes",
      type: "string",
      shown: true,
      comments:
        "Provide a valid list of scopes. A list per use case is provided on the Meta Ads docs: https://developers.facebook.com/docs/marketing-api/overview/authorization/",
      required: true,
      default:
        "ads_read ads_management pages_show_list groups_access_member_info leads_retrieval page_events pages_read_user_content public_profile",
    },
  },
});
