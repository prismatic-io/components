import type {
  AccountsApi,
  TemplatesApi,
  ProfilesApi,
  ListsApi,
  ImagesApi,
  CampaignsApi,
  EventsApi,
  SegmentsApi,
} from "klaviyo-api";
import type { KlaviyoApi } from "../enums/KlaviyoApi";

export type KlaviyoApiMap = {
  [K in KlaviyoApi]: K extends KlaviyoApi.Accounts
    ? AccountsApi
    : K extends KlaviyoApi.Templates
      ? TemplatesApi
      : K extends KlaviyoApi.Profiles
        ? ProfilesApi
        : K extends KlaviyoApi.Lists
          ? ListsApi
          : K extends KlaviyoApi.Images
            ? ImagesApi
            : K extends KlaviyoApi.Campaigns
              ? CampaignsApi
              : K extends KlaviyoApi.Events
                ? EventsApi
                : K extends KlaviyoApi.Segments
                  ? SegmentsApi
                  : never;
};
