import {
  OAuth2Type,
  oauth2Connection,
  templateConnectionInputs,
} from "@prismatic-io/spectral";









export const sfmcOAuth2AuthorizationCode = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  key: "sfmcOAuth2AuthorizationCode",
  display: {
    label: "OAuth 2.0",
    description:
      "Authenticate using OAuth 2.0 Authorization Code flow with refresh tokens.",
  },
  inputs: templateConnectionInputs(
    {
      subdomain: {
        label: "Subdomain",
        placeholder: "Enter SFMC subdomain",
        type: "string",
        required: true,
        shown: true,
        comments:
          "The Marketing Cloud subdomain (28-character string starting with 'mc'). Found in Setup > Apps > Installed Packages > API Integration component.",
        example: "mc563885gzs27c5t9-63k636ttgm",
      },
      scopes: {
        label: "Scopes",
        placeholder: "Enter OAuth scopes",
        type: "string",
        required: false,
        shown: true,
        comments:
          "Space-separated OAuth 2.0 permission scopes. Include 'offline' to enable persistent refresh tokens. Remove scopes for features you do not use.",
        example:
          "offline journeys_read data_extensions_read data_extensions_write email_read email_send",
        default:
          "offline documents_and_images_read documents_and_images_write saved_content_write list_and_subscribers_read list_and_subscribers_write journeys_read campaign_read campaign_write data_extensions_read data_extensions_write automations_read email_read email_write email_send sms_read sms_write sms_send event_notification_callback_create event_notification_callback_read event_notification_callback_update event_notification_callback_delete event_notification_subscription_create event_notification_subscription_read event_notification_subscription_update event_notification_subscription_delete",
      },
      clientId: {
        label: "Client ID",
        placeholder: "Enter Client ID",
        type: "string",
        required: true,
        shown: true,
        comments:
          "Client ID from Setup > Apps > Installed Packages > API Integration component.",
      },
      clientSecret: {
        label: "Client Secret",
        placeholder: "Enter Client Secret",
        type: "password",
        required: true,
        shown: true,
        comments:
          "Client Secret from Setup > Apps > Installed Packages > API Integration component.",
      },
    },
    {
      authorizeUrl: {
        label: "Authorize URL",
        placeholder: "Authorize URL",
        type: "template",
        comments: "The OAuth 2.0 Authorization URL for Marketing Cloud.",
        templateValue:
          "https://{{#subdomain}}.auth.marketingcloudapis.com/v2/authorize",
      },
      tokenUrl: {
        label: "Token URL",
        placeholder: "Token URL",
        type: "template",
        comments: "The OAuth 2.0 Token URL for Marketing Cloud.",
        templateValue:
          "https://{{#subdomain}}.auth.marketingcloudapis.com/v2/token",
      },
    },
    OAuth2Type.AuthorizationCode,
  ),
});
