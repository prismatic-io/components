import { connection } from "@prismatic-io/spectral";
import {
  GOOGLE_ADS_API_VERSION,
  GOOGLE_ADS_MINIMUM_SUPPORTED_API_VERSION,
  GOOGLE_ADS_OAUTH_SCOPE,
} from "../constants";

export const serviceAccount = connection({
  key: "serviceAccount",
  display: {
    label: "Service Account",
    description:
      "Authenticate as a Google Cloud service account that has been added as a user in the Google Ads account.",
  },
  inputs: {
    keyFile: {
      label: "Service Account Key File",
      placeholder: "Paste the service account JSON key",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The service account's JSON key file, pasted in full. Create the key in the Google Cloud console, in the project that has the Google Ads API enabled, and add the service account's email as a user in the Google Ads account. See [Service accounts documentation](https://developers.google.com/google-ads/api/docs/oauth/service-accounts).",
      example:
        '{"type": "service_account", "client_email": "ads-sync@example-project.iam.gserviceaccount.com", "private_key": "-----BEGIN PRIVATE KEY-----\\nXXXXXXXX\\n-----END PRIVATE KEY-----\\n"}',
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter OAuth scopes",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Space-separated OAuth 2.0 scopes for the service account's token. The Google Ads API needs the adwords scope. See [OAuth scopes documentation](https://developers.google.com/identity/protocols/oauth2/scopes).",
      example: GOOGLE_ADS_OAUTH_SCOPE,
      default: GOOGLE_ADS_OAUTH_SCOPE,
    },
    apiVersion: {
      label: "API Version",
      placeholder: "Enter API version",
      type: "string",
      required: false,
      shown: true,
      comments: `The version of the Google Ads API to use. Defaults to ${GOOGLE_ADS_API_VERSION}. Any version from ${GOOGLE_ADS_MINIMUM_SUPPORTED_API_VERSION} through ${GOOGLE_ADS_API_VERSION} can be set explicitly; anything below ${GOOGLE_ADS_MINIMUM_SUPPORTED_API_VERSION} has already been sunset by Google and is automatically upgraded to ${GOOGLE_ADS_MINIMUM_SUPPORTED_API_VERSION}. See the [deprecation and sunset schedule](https://developers.google.com/google-ads/api/docs/sunset-dates) for when each version retires.`,
      example: GOOGLE_ADS_API_VERSION,
      default: GOOGLE_ADS_API_VERSION,
    },
  },
});
