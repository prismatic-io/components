









export const AUTH_URL_TEMPLATE =
  "https://{subdomain}.auth.marketingcloudapis.com";


export const REST_URL_TEMPLATE =
  "https://{subdomain}.rest.marketingcloudapis.com";






export const ASSET_BASE_PATH = "/asset/v1";
export const ASSETS_PATH = "/asset/v1/content/assets";
export const ASSET_QUERY_PATH = "/asset/v1/content/assets/query";
export const CATEGORIES_PATH = "/asset/v1/content/categories";


export const CONTACTS_PATH = "/contacts/v1/contacts";
export const CONTACTS_SEARCH_PATH = "/contacts/v1/contacts/search";
export const CONTACTS_EMAIL_SEARCH_PATH = "/contacts/v1/addresses/email/search";
export const CONTACTS_SCHEMA_PATH = "/contacts/v1/schema";
export const CONTACTS_ESTABLISH_PATH = "/contacts/v1/establish";


export const JOURNEYS_PATH = "/interaction/v1/interactions";
export const JOURNEY_EVENTS_PATH = "/interaction/v1/events";
export const JOURNEY_CONTACT_EXIT_PATH =
  "/interaction/v1/interactions/contactexit";


export const CAMPAIGNS_PATH = "/hub/v1/campaigns";


export const EMAIL_DEFINITIONS_PATH = "/messaging/v1/email/definitions";
export const EMAIL_MESSAGES_PATH = "/messaging/v1/email/messages";


export const SMS_DEFINITIONS_PATH = "/messaging/v1/sms/definitions";
export const SMS_MESSAGES_PATH = "/messaging/v1/sms/messages";


export const DATA_EVENTS_PATH = "/hub/v1/dataevents";
export const ASYNC_DATA_EXTENSIONS_PATH = "/data/v1/async/dataextensions";
export const DATA_EXTENSIONS_PATH = "/data/v1/customobjects";


export const AUTOMATIONS_PATH = "/automation/v1/automations";


export const ENS_CALLBACKS_PATH = "/platform/v1/ens-callbacks";
export const ENS_VERIFY_PATH = "/platform/v1/ens-verify";
export const ENS_SUBSCRIPTIONS_PATH = "/platform/v1/ens-subscriptions";





export const DEFAULT_PAGE_SIZE = 50;
export const MAX_JOURNEY_PAGE_SIZE = 50;
export const MAX_ASSET_PAGE_SIZE = 200;







export const ENS_TRANSACTIONAL_EMAIL_EVENTS = [
  {
    label: "Email Sent",
    value: "TransactionalSendEvents.EmailSent",
  },
  {
    label: "Email Not Sent",
    value: "TransactionalSendEvents.EmailNotSent",
  },
  {
    label: "Email Bounced",
    value: "TransactionalSendEvents.EmailBounced",
  },
];


export const ENS_ENGAGEMENT_EMAIL_EVENTS = [
  {
    label: "Email Open",
    value: "EngagementEvents.EmailOpen",
  },
  {
    label: "Email Click",
    value: "EngagementEvents.EmailClick",
  },
  {
    label: "Email Unsubscribe",
    value: "EngagementEvents.EmailUnsubscribe",
  },
];


export const ENS_TRANSACTIONAL_SMS_EVENTS = [
  {
    label: "SMS Sent",
    value: "TransactionalSendEvents.SmsSent",
  },
  {
    label: "SMS Not Sent",
    value: "TransactionalSendEvents.SmsNotSent",
  },
  {
    label: "SMS Transient",
    value: "TransactionalSendEvents.SmsTransient",
  },
  {
    label: "SMS Delivered",
    value: "TransactionalSendEvents.SmsDelivered",
  },
  {
    label: "SMS Bounced",
    value: "TransactionalSendEvents.SmsBounced",
  },
];


export const ENS_AUTOMATION_EVENTS = [
  {
    label: "Automation Instance Started",
    value: "SendEvents.AutomationInstanceStarted",
  },
  {
    label: "Automation Instance Completed",
    value: "SendEvents.AutomationInstanceCompleted",
  },
  {
    label: "Automation Instance Stopped",
    value: "SendEvents.AutomationInstanceStopped",
  },
  {
    label: "Automation Instance Errored",
    value: "SendEvents.AutomationInstanceErrored",
  },
  {
    label: "Automation Instance Skipped",
    value: "SendEvents.AutomationInstanceSkipped",
  },
];


export const ENS_ALL_EVENT_TYPES = [
  ...ENS_TRANSACTIONAL_EMAIL_EVENTS,
  ...ENS_ENGAGEMENT_EMAIL_EVENTS,
  ...ENS_TRANSACTIONAL_SMS_EVENTS,
  ...ENS_AUTOMATION_EVENTS,
];





export const JOURNEY_STATUS_OPTIONS = [
  { label: "Draft", value: "Draft" },
  { label: "Published", value: "Published" },
  { label: "Paused", value: "Paused" },
  { label: "Stopped", value: "Stopped" },
  { label: "Deleted", value: "Deleted" },
  { label: "Unpublished", value: "Unpublished" },
  { label: "Scheduled to Publish", value: "ScheduledToPublish" },
];





export const CONNECTION_KEYS = {
  OAUTH2_AUTH_CODE: "sfmcOAuth2AuthorizationCode",
  OAUTH2_CLIENT_CREDENTIALS: "sfmcOAuth2ClientCredentials",
} as const;

export type ConnectionKey =
  (typeof CONNECTION_KEYS)[keyof typeof CONNECTION_KEYS];
