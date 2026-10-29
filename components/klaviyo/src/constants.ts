import type { PollResourceConfig } from "./types";

export enum KlaviyoApi {
  Accounts = "accounts",
  Templates = "templates",
  Profiles = "profiles",
  Lists = "lists",
  Images = "images",
  Campaigns = "campaigns",
  Events = "events",
  Segments = "segments",
}

export const BASE_URL = "https://a.klaviyo.com";

export const FIELDS_ACCOUNT_MODEL = [
  { label: "Test Account", value: "test_account" },
  { label: "Contact Information", value: "contact_information" },
  {
    label: "Contact Information Default Sender Name",
    value: "contact_information.default_sender_name",
  },
  {
    label: "Contact Information Default Sender Email",
    value: "contact_information.default_sender_email",
  },
  {
    label: "Contact Information Website URL",
    value: "contact_information.website_url",
  },
  {
    label: "Contact Information Organization Name",
    value: "contact_information.organization_name",
  },
  {
    label: "Contact Information Street Address",
    value: "contact_information.street_address",
  },
  {
    label: "Contact Information Street Address Address1",
    value: "contact_information.street_address.address1",
  },
  {
    label: "Contact Information Street Address Address2",
    value: "contact_information.street_address.address2",
  },
  {
    label: "Contact Information Street Address City",
    value: "contact_information.street_address.city",
  },
  {
    label: "Contact Information Street Address Region",
    value: "contact_information.street_address.region",
  },
  {
    label: "Contact Information Street Address Country",
    value: "contact_information.street_address.country",
  },
  {
    label: "Contact Information Street Address Zip",
    value: "contact_information.street_address.zip",
  },
  { label: "Industry", value: "industry" },
  { label: "Timezone", value: "timezone" },
  { label: "Preferred Currency", value: "preferred_currency" },
  { label: "Public API Key", value: "public_api_key" },
  { label: "Locale", value: "locale" },
];

export const FIELDS_TEMPLATE_MODEL = [
  { label: "Name", value: "name" },
  { label: "Editor Type", value: "editor_type" },
  { label: "HTML", value: "html" },
  { label: "Text", value: "text" },
  { label: "Created", value: "created" },
  { label: "Updated", value: "updated" },
];

export const ADDITIONAL_FIELDS_PROFILE_MODEL = [
  { label: "Subscriptions", value: "subscriptions" },
  { label: "Predictive Analytics", value: "predictive_analytics" },
];

export const FIELDS_PROFILE_MODEL = [
  { label: "Email", value: "email" },
  { label: "Phone Number", value: "phone_number" },
  { label: "External ID", value: "external_id" },
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Organization", value: "organization" },
  { label: "Locale", value: "locale" },
  { label: "Title", value: "title" },
  { label: "Image", value: "image" },
  { label: "Created", value: "created" },
  { label: "Updated", value: "updated" },
  { label: "Last Event Date", value: "last_event_date" },
  { label: "Location", value: "location" },
  { label: "Location Address1", value: "location.address1" },
  { label: "Location Address2", value: "location.address2" },
  { label: "Location City", value: "location.city" },
  { label: "Location Country", value: "location.country" },
  { label: "Location Latitude", value: "location.latitude" },
  { label: "Location Longitude", value: "location.longitude" },
  { label: "Location Region", value: "location.region" },
  { label: "Location Zip", value: "location.zip" },
  { label: "Location Timezone", value: "location.timezone" },
  { label: "Location IP", value: "location.ip" },
  { label: "Properties", value: "properties" },
  { label: "Subscriptions", value: "subscriptions" },
  {
    label: "Subscriptions Email",
    value: "subscriptions.email",
  },
  {
    label: "Subscriptions Email Marketing",
    value: "subscriptions.email.marketing",
  },
  {
    label: "Subscriptions Email Marketing Can Receive Email Marketing",
    value: "subscriptions.email.marketing.can_receive_email_marketing",
  },
  {
    label: "Subscriptions Email Marketing Consent",
    value: "subscriptions.email.marketing.consent",
  },
  {
    label: "Subscriptions Email Marketing Consent Timestamp",
    value: "subscriptions.email.marketing.consent_timestamp",
  },
  {
    label: "Subscriptions Email Marketing Last Updated",
    value: "subscriptions.email.marketing.last_updated",
  },
  {
    label: "Subscriptions Email Marketing Method",
    value: "subscriptions.email.marketing.method",
  },
  {
    label: "Subscriptions Email Marketing Method Detail",
    value: "subscriptions.email.marketing.method_detail",
  },
  {
    label: "Subscriptions Email Marketing Custom Method Detail",
    value: "subscriptions.email.marketing.custom_method_detail",
  },
  {
    label: "Subscriptions Email Marketing Double Optin",
    value: "subscriptions.email.marketing.double_optin",
  },
  {
    label: "Subscriptions Email Marketing Suppression",
    value: "subscriptions.email.marketing.suppression",
  },
  {
    label: "Subscriptions Email Marketing List Suppressions",
    value: "subscriptions.email.marketing.list_suppressions",
  },
  {
    label: "Subscriptions SMS",
    value: "subscriptions.sms",
  },
  {
    label: "Subscriptions SMS Marketing",
    value: "subscriptions.sms.marketing",
  },
  {
    label: "Subscriptions SMS Marketing Can Receive SMS Marketing",
    value: "subscriptions.sms.marketing.can_receive_sms_marketing",
  },
  {
    label: "Subscriptions SMS Marketing Consent",
    value: "subscriptions.sms.marketing.consent",
  },
  {
    label: "Subscriptions SMS Marketing Consent Timestamp",
    value: "subscriptions.sms.marketing.consent_timestamp",
  },
  {
    label: "Subscriptions SMS Marketing Method",
    value: "subscriptions.sms.marketing.method",
  },
  {
    label: "Subscriptions SMS Marketing Method Detail",
    value: "subscriptions.sms.marketing.method_detail",
  },
  {
    label: "Subscriptions SMS Marketing Last Updated",
    value: "subscriptions.sms.marketing.last_updated",
  },
  {
    label: "Predictive Analytics",
    value: "predictive_analytics",
  },
  {
    label: "Predictive Analytics Historic CLV",
    value: "predictive_analytics.historic_clv",
  },
  {
    label: "Predictive Analytics Predicted CLV",
    value: "predictive_analytics.predicted_clv",
  },
  {
    label: "Predictive Analytics Total CLV",
    value: "predictive_analytics.total_clv",
  },
  {
    label: "Predictive Analytics Historic Number of Orders",
    value: "predictive_analytics.historic_number_of_orders",
  },
  {
    label: "Predictive Analytics Predicted Number of Orders",
    value: "predictive_analytics.predicted_number_of_orders",
  },
  {
    label: "Predictive Analytics Average Days Between Orders",
    value: "predictive_analytics.average_days_between_orders",
  },
  {
    label: "Predictive Analytics Average Order Value",
    value: "predictive_analytics.average_order_value",
  },
  {
    label: "Predictive Analytics Churn Probability",
    value: "predictive_analytics.churn_probability",
  },
  {
    label: "Predictive Analytics Expected Date of Next Order",
    value: "predictive_analytics.expected_date_of_next_order",
  },
];

export const FIELDS_PROFILE_EVENT_MODEL = [
  { label: "Email", value: "email" },
  { label: "Phone Number", value: "phone_number" },
  { label: "External ID", value: "external_id" },
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Organization", value: "organization" },
  { label: "Locale", value: "locale" },
  { label: "Title", value: "title" },
  { label: "Image", value: "image" },
  { label: "Created", value: "created" },
  { label: "Updated", value: "updated" },
  { label: "Last Event Date", value: "last_event_date" },
  { label: "Location", value: "location" },
  { label: "Location Address1", value: "location.address1" },
  { label: "Location Address2", value: "location.address2" },
  { label: "Location City", value: "location.city" },
  { label: "Location Country", value: "location.country" },
  { label: "Location Latitude", value: "location.latitude" },
  { label: "Location Longitude", value: "location.longitude" },
  { label: "Location Region", value: "location.region" },
  { label: "Location Zip", value: "location.zip" },
  { label: "Location Timezone", value: "location.timezone" },
  { label: "Location IP", value: "location.ip" },
  { label: "Properties", value: "properties" },
];

export const FIELDS_LIST_MODEL = [
  { label: "Name", value: "name" },
  { label: "Created", value: "created" },
  { label: "Updated", value: "updated" },
  { label: "Opt In Process", value: "opt_in_process" },
];

export const FIELDS_IMAGE_MODEL = [
  { label: "Name", value: "name" },
  { label: "Image URL", value: "image_url" },
  { label: "Format", value: "format" },
  { label: "Size", value: "size" },
  { label: "Hidden", value: "hidden" },
  { label: "Updated At", value: "updated_at" },
];

export const FIELDS_CAMPAIGN_MODEL = [
  { label: "Archived", value: "archived" },
  { label: "Audiences", value: "audiences" },
  { label: "Audiences Excluded", value: "audiences.excluded" },
  { label: "Audiences Included", value: "audiences.included" },
  { label: "Created At", value: "created_at" },
  { label: "ID", value: "id" },
  { label: "Name", value: "name" },
  { label: "Scheduled At", value: "scheduled_at" },
  { label: "Send Options", value: "send_options" },
  {
    label: "Send Options Use Smart Sending",
    value: "send_options.use_smart_sending",
  },
  { label: "Send Strategy", value: "send_strategy" },
  { label: "Send Strategy Date", value: "send_strategy.date" },
  { label: "Send Strategy Datetime", value: "send_strategy.datetime" },
  { label: "Send Strategy Method", value: "send_strategy.method" },
  { label: "Send Strategy Options", value: "send_strategy.options" },
  {
    label: "Send Strategy Options Is Local",
    value: "send_strategy.options.is_local",
  },
  {
    label: "Send Strategy Options Send Past Recipients Immediately",
    value: "send_strategy.options.send_past_recipients_immediately",
  },
  {
    label: "Send Strategy Throttle Percentage",
    value: "send_strategy.throttle_percentage",
  },
  { label: "Send Time", value: "send_time" },
  { label: "Status", value: "status" },
  { label: "Tracking Options", value: "tracking_options" },
  {
    label: "Tracking Options Add Tracking Params",
    value: "tracking_options.add_tracking_params",
  },
  {
    label: "Tracking Options Custom Tracking Params",
    value: "tracking_options.custom_tracking_params",
  },
  {
    label: "Tracking Options Is Tracking Clicks",
    value: "tracking_options.is_tracking_clicks",
  },
  {
    label: "Tracking Options Is Tracking Opens",
    value: "tracking_options.is_tracking_opens",
  },
  { label: "Updated At", value: "updated_at" },
];

export const FIELDS_EVENT_MODEL = [
  { label: "Timestamp", value: "timestamp" },
  { label: "Event Properties", value: "event_properties" },
  { label: "Datetime", value: "datetime" },
  { label: "UUID", value: "uuid" },
];

export const FIELDS_METRIC_MODEL = [
  { label: "Name", value: "name" },
  { label: "Created", value: "created" },
  { label: "Updated", value: "updated" },
  { label: "Integration", value: "integration" },
];

export const FIELDS_SEGMENT_MODEL = [
  { label: "Name", value: "name" },
  { label: "Definition", value: "definition" },
  {
    label: "Definition Condition Groups",
    value: "definition.condition_groups",
  },
  { label: "Created", value: "created" },
  { label: "Updated", value: "updated" },
  { label: "Is Active", value: "is_active" },
  { label: "Is Processing", value: "is_processing" },
  { label: "Is Starred", value: "is_starred" },
];

export const PROFILE_OR_LIST_RESOURCE_CONFIG: Record<
  string,
  PollResourceConfig
> = {
  profiles: {
    label: "Profiles",
    api: KlaviyoApi.Profiles,
    createdAtField: "created",
    updatedAtField: "updated",
  },
  lists: {
    label: "Lists",
    api: KlaviyoApi.Lists,
    createdAtField: "created",
    updatedAtField: "updated",
  },
};

export const CAMPAIGN_RESOURCE_CONFIG: PollResourceConfig = {
  label: "Campaigns",
  api: KlaviyoApi.Campaigns,
  createdAtField: "created_at",
  updatedAtField: "updated_at",
  createdAtAttr: "createdAt",
  updatedAtAttr: "updatedAt",
};

export const MESSAGE_CHANNEL_MODEL = [
  { label: "Email", value: "email" },
  { label: "SMS", value: "sms" },
  { label: "Mobile Push", value: "mobile_push" },
];

export const KLAVIYO_FILTER_OPS = {
  AND: "and",
  EQUALS: "equals",
  GREATER_THAN: "greater-than",
} as const;

export const KLAVIYO_FILTER_FIELDS = {
  MESSAGES_CHANNEL: "messages.channel",
} as const;

export const POLL_BATCH_SIZE = 50;
