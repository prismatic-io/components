import { type Connection, util } from "@prismatic-io/spectral";
import {
  AccountsApi,
  ApiKeySession,
  TemplatesApi,
  ProfilesApi,
  ListsApi,
  ImagesApi,
  CampaignsApi,
  EventsApi,
  SegmentsApi,
  OAuthBasicSession,
} from "klaviyo-api";
import { validateConnection } from "./utils";
import type { KlaviyoApiMap } from "./types/KlavyioApi";
import { KlaviyoApi } from "./enums/KlaviyoApi";

const getKlaviyoSession = (connection: Connection) => {
  validateConnection(connection);

  switch (connection.key) {
    case "klaviyoApiKeyConnection":
      return new ApiKeySession(util.types.toString(connection.fields.apiKey));

    case "klaviyoOAuth2Connection":
      return new OAuthBasicSession(
        util.types.toString(connection.token?.access_token),
      );

    default:
      throw new Error(`Unsupported connection ${connection.key}.`);
  }
};

export const getApi = <T extends KlaviyoApi>(
  connection: Connection,
  api: T,
) => {
  const klaviyoSession = getKlaviyoSession(connection);
  switch (api) {
    case KlaviyoApi.Accounts:
      return new AccountsApi(klaviyoSession) as KlaviyoApiMap[T];

    case KlaviyoApi.Templates:
      return new TemplatesApi(klaviyoSession) as KlaviyoApiMap[T];

    case KlaviyoApi.Profiles:
      return new ProfilesApi(klaviyoSession) as KlaviyoApiMap[T];

    case KlaviyoApi.Lists:
      return new ListsApi(klaviyoSession) as KlaviyoApiMap[T];

    case KlaviyoApi.Images:
      return new ImagesApi(klaviyoSession) as KlaviyoApiMap[T];

    case KlaviyoApi.Campaigns:
      return new CampaignsApi(klaviyoSession) as KlaviyoApiMap[T];

    case KlaviyoApi.Events:
      return new EventsApi(klaviyoSession) as KlaviyoApiMap[T];

    case KlaviyoApi.Segments:
      return new SegmentsApi(klaviyoSession) as KlaviyoApiMap[T];

    default:
      throw new Error(`Unsupported API ${api}.`);
  }
};
