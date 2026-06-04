import { util, type KeyValuePair, input } from "@prismatic-io/spectral";
import {
  AD_ACCOUNT_FIELDS,
  COUNTRY_CODES,
  PAGE_FIELDS,
  PREVIEW_FORMATS,
} from "./constants";
import {
  customDataExample,
  eventsPayload,
  moreDataExample,
  userDataExample,
} from "./exampleInputs";
import {
  cleanArrayCodeInput,
  cleanCodeInput,
  cleanString,
  eventTimeClean,
  valueListInputClean,
} from "./util";

export const myConnectionField = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const webhookConnection = {
  ...myConnectionField,
  comments:
    "This connection must be a Meta Ads Client Credentials connection to be able to use webhooks APIs.",
};

export const version = input({
  label: "Graph Version",
  type: "string",
  required: false,
  example: "22",
  comments: "Provide the version of the Graph API to use. Defaults to 22.",
  default: "22",
  clean: (value: unknown) => {
    const version = util.types.toInt(value);
    if (!util.types.isInt(version)) return 22;
    return version;
  },
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "If true, it will fetch all records and ignore parameters like limit, after, and before.",
  clean: util.types.toBool,
});

export const userId = input({
  label: "User Id",
  type: "string",
  required: true,
  example: "587490763",
  comments: "Provide the Id of a user.",
});

export const pixelId = input({
  label: "Pixel Id",
  type: "string",
  required: true,
  example: "587490763",
  comments: "Provide the Id of a pixel.",
  placeholder: "587490763",
  clean: util.types.toString,
});

export const adAccountId = input({
  label: "Ad Account",
  type: "string",
  required: true,
  example: "act_342512647855388",
  comments:
    "Provide the identifier of an Ad Account. This value should be an Id.",
  clean: util.types.toString,
  dataSource: "selectAdAccount",
});

export const adId = input({
  label: "Ad Id",
  type: "string",
  required: true,
  example: "342512647855388",
  comments: "Provide the Id of an Ad or Ad Set.",
  clean: util.types.toString,
  dataSource: "selectAdsInAccount",
});

export const adName = input({
  label: "Ad Name",
  type: "string",
  required: false,
  example: "My New Ad",
  comments: "Provide a name for the given ad.",
  clean: cleanString,
});

export const status = input({
  label: "Ad Status",
  type: "string",
  required: false,
  model: [
    { label: "Active", value: "ACTIVE" },
    { label: "Paused", value: "PAUSED" },
    { label: "Deleted", value: "DELETED" },
    { label: "Archived", value: "ARCHIVED" },
  ],
  comments:
    "Provide a status for the ad. During testing, it is recommended to set ads to a PAUSED status so as to not incur accidental spend.",
  clean: cleanString,
});

export const adsetId = input({
  label: "Adset Id",
  type: "string",
  required: false,
  example: "58789326952",
  comments: "Provide the Id of the desired adset.",
});

export const campaignId = input({
  label: "Campaign Id",
  type: "string",
  required: false,
  example: "58789326952",
  comments: "Provide the Id of the desired campaign.",
  clean: util.types.toString,
  dataSource: "selectCampaignInAccount",
});

export const creativeId = input({
  label: "Creative Id",
  type: "string",
  required: false,
  example: "58789326952",
  comments: "Provide the Id of the desired creative.",
  clean: cleanString,
  dataSource: "selectAdCreative",
});

export const tracking = input({
  label: "Tracking",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(
    [
      {
        "action.type": ["attention_event"],
        creative: ["23849551358310668"],
      },
      {
        "action.type": ["dwell"],
        creative: ["23849551358310668"],
      },
      {
        "action.type": ["post_engagement"],
        page: ["105171555498035"],
        post: ["105174712164386"],
      },
    ],
    null,
    2,
  ),
  comments:
    "Provide a JSON array containing valid tracking specs. The shape of this field can change depending on the type of ad: https://developers.facebook.com/docs/marketing-api/tracking-specs#default_by_ad.",
  clean: (value) => cleanArrayCodeInput(value, "Tracking"),
});

export const optionalValues = input({
  label: "Optional Values",
  type: "string",
  required: false,
  collection: "keyvaluelist",
  comments: "Provide optional values to mutate the given object.",
  clean: (values) =>
    util.types.keyValPairListToObject(values as KeyValuePair<unknown>[]),
});

export const limit = input({
  label: "Limit",
  type: "string",
  required: false,
  comments: "Provide a limit for the result set.",
  example: "30",
  clean: cleanString,
});

export const after = input({
  label: "After",
  type: "string",
  required: false,
  comments: "Provide the token for the item after the current one.",
  example: "xOTQ1MjAwNzI5NDE=",
  clean: cleanString,
});

export const before = input({
  label: "Before",
  type: "string",
  required: false,
  comments: "Provide the token for the item before the current one.",
  example: "xOTQ1MjAwNzI5NDE=",
  clean: cleanString,
});

export const adFormat = input({
  label: "Ad Format",
  type: "string",
  required: true,
  comments: "Provide a type of ad format to preview.",
  model: PREVIEW_FORMATS,
  clean: util.types.toString,
});

export const objectStoryId = input({
  label: "Object Story Id",
  type: "string",
  required: false,
  comments: "Provide an Id for the object story of the adCreative.",
  example: "1051738543535_10636436633230",
  clean: cleanString,
});

export const urlTags = input({
  label: "URL Tags",
  type: "string",
  required: false,
  comments: "Provide an string for the URL tags on the given adCreative.",
  example: "key1=val1&key2=val2",
  clean: cleanString,
});

export const body = input({
  label: "Body",
  type: "string",
  required: false,
  comments: "Provide a body for the adCreative.",
  example: "This is an example description body.",
  clean: cleanString,
});

export const name = input({
  label: "Name",
  type: "string",
  required: false,
  comments: "Provide a name for the adCreative.",
  example: "My Ad Creative",
  clean: cleanString,
});

export const fields = input({
  label: "Fields",
  type: "string",
  required: false,
  comments: "Provide a comma separated list of fields to be returned.",
  clean: cleanString,
});

export const adLabels = input({
  label: "Ad Labels",
  type: "code",
  language: "json",
  required: false,
  comments: "Ad Labels associated with this campaign.",
  example: JSON.stringify(
    [
      {
        id: "ad Label Id",
        account: "Ad Account",
        created_time: "2012-08-15T00:00:00.000Z",
        updated_time: "2012-08-15T00:00:00.000Z",
        name: "Ad Name",
      },
    ],
    null,
    2,
  ),
  clean: (value) => cleanArrayCodeInput(value, "Ad Labels"),
});

export const bid_strategy = input({
  label: "Bid Strategy",
  type: "string",
  required: false,
  comments:
    "Choose bid strategy for this campaign to suit your specific business goals.",
  model: [
    {
      label: "LOWEST_COST_WITHOUT_CAP",
      value: "LOWEST_COST_WITHOUT_CAP",
    },
    {
      label: "LOWEST_COST_WITH_BID_CAP",
      value: "LOWEST_COST_WITH_BID_CAP",
    },
    {
      label: "COST_CAP",
      value: "COST_CAP",
    },
    {
      label: "LOWEST_COST_WITH_MIN_ROAS",
      value: "LOWEST_COST_WITH_MIN_ROAS",
    },
  ],
  clean: cleanString,
});

export const campaign_optimization_type = input({
  label: "Campaign Optimization Type",
  type: "string",
  required: false,
  comments: "Campaign Optimization Type.",
  model: [
    {
      label: "NONE",
      value: "NONE",
    },
    {
      label: "ICO_ONLY",
      value: "ICO_ONLY",
    },
  ],
  clean: cleanString,
});

export const buying_type = input({
  label: "Buying Type",
  type: "string",
  required: false,
  comments:
    "This field will help Meta Ads make optimizations to delivery, pricing, and limits. All ad sets in this campaign must match the buying type.",
  model: [
    {
      label: "AUCTION",
      value: "AUCTION",
    },
    {
      label: "RESERVED",
      value: "RESERVED",
    },
  ],
  clean: cleanString,
});

export const daily_budget = input({
  label: "Daily Budget",
  type: "string",
  required: false,
  comments:
    "Daily budget of this campaign. All adsets under this campaign will share this budget. You can either set budget at the campaign level or at the adset level, not both.",
  clean: cleanString,
});

export const is_skadnetwork_attribution = input({
  label: "Is Skadnetwork Attribution",
  type: "boolean",
  required: false,
  comments:
    "To create an iOS 14 campaign, enable SKAdNetwork attribution for this campaign.",
  clean: util.types.toBool,
});

export const is_using_l3_schedule = input({
  label: "Is Using L3 Schedule",
  type: "boolean",
  required: false,
  comments: "Is Using L3 Schedule.",
  clean: util.types.toBool,
});

export const iterative_split_test_configs = input({
  label: "Iterative Split Test Configs",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Array of Iterative Split Test Configs created under this campaign.",
  clean: (value) => cleanArrayCodeInput(value, "Iterative Split Test Configs"),
});

export const lifetime_budget = input({
  label: "Lifetime Budget",
  type: "string",
  required: false,
  comments:
    "Lifetime budget of this campaign. All adsets under this campaign will share this budget. You can either set budget at the campaign level or at the adset level, not both.",
  clean: cleanString,
});

export const campaignName = input({
  label: "Campaign Name",
  type: "string",
  required: true,
  comments: "Name for this campaign.",
  clean: util.types.toString,
});

export const objective = input({
  label: "Objective",
  type: "string",
  required: true,
  comments:
    "Campaign's objective. If it is specified the API will validate that any ads created under the campaign match that objective.",
  model: [
    {
      label: "APP_INSTALLS",
      value: "APP_INSTALLS",
    },
    {
      label: "BRAND_AWARENESS",
      value: "BRAND_AWARENESS",
    },
    {
      label: "CONVERSIONS",
      value: "CONVERSIONS",
    },
    {
      label: "EVENT_RESPONSES",
      value: "EVENT_RESPONSES",
    },
    {
      label: "LEAD_GENERATION",
      value: "LEAD_GENERATION",
    },
    {
      label: "LINK_CLICKS",
      value: "LINK_CLICKS",
    },
    {
      label: "LOCAL_AWARENESS",
      value: "LOCAL_AWARENESS",
    },
    {
      label: "MESSAGES",
      value: "MESSAGES",
    },
    {
      label: "OFFER_CLAIMS",
      value: "OFFER_CLAIMS",
    },
    {
      label: "OUTCOME_APP_PROMOTION",
      value: "OUTCOME_APP_PROMOTION",
    },
    {
      label: "OUTCOME_AWARENESS",
      value: "OUTCOME_AWARENESS",
    },
    {
      label: "OUTCOME_ENGAGEMENT",
      value: "OUTCOME_ENGAGEMENT",
    },
    {
      label: "OUTCOME_LEADS",
      value: "OUTCOME_LEADS",
    },
    {
      label: "OUTCOME_SALES",
      value: "OUTCOME_SALES",
    },
    {
      label: "OUTCOME_TRAFFIC",
      value: "OUTCOME_TRAFFIC",
    },
    {
      label: "PAGE_LIKES",
      value: "PAGE_LIKES",
    },
    {
      label: "POST_ENGAGEMENT",
      value: "POST_ENGAGEMENT",
    },
    {
      label: "PRODUCT_CATALOG_SALES",
      value: "PRODUCT_CATALOG_SALES",
    },
    {
      label: "REACH",
      value: "REACH",
    },
    {
      label: "STORE_VISITS",
      value: "STORE_VISITS",
    },
    {
      label: "VIDEO_VIEWS",
      value: "VIDEO_VIEWS",
    },
  ],
  clean: util.types.toString,
});

export const promoted_object = input({
  label: "Promoted Object",
  type: "code",
  language: "json",
  required: false,
  comments:
    "The object this campaign is promoting across all its ads. It's required for SKAdNetwork or Aggregated Event Measurement campaign creation. Only product_catalog_id is used at the ad set level.",
  clean: (value) => cleanCodeInput(value, "Promoted Object"),
});

export const special_ad_categories = input({
  label: "Special Ad Categories",
  type: "string",
  collection: "valuelist",
  required: true,
  comments: "Special Ad Categories.",
  model: [
    {
      label: "NONE",
      value: "NONE",
    },
    {
      label: "EMPLOYMENT",
      value: "EMPLOYMENT",
    },
    {
      label: "HOUSING",
      value: "HOUSING",
    },
    {
      label: "CREDIT",
      value: "CREDIT",
    },
    {
      label: "ISSUES_ELECTIONS_POLITICS",
      value: "ISSUES_ELECTIONS_POLITICS",
    },
    {
      label: "ONLINE_GAMBLING_AND_GAMING",
      value: "ONLINE_GAMBLING_AND_GAMING",
    },
    {
      label: "FINANCIAL_PRODUCTS_SERVICES",
      value: "FINANCIAL_PRODUCTS_SERVICES",
    },
  ],
  clean: valueListInputClean,
});

export const special_ad_category_country = input({
  label: "Special Ad Category Country",
  type: "string",
  collection: "valuelist",
  required: false,
  model: COUNTRY_CODES,
  comments: "Special Ad Category Country.",
  clean: valueListInputClean,
});

export const spend_cap = input({
  label: "Spend Cap",
  type: "string",
  required: false,
  comments:
    "A spend cap for the campaign, such that it will not spend more than this cap. Defined as integer value of subunit in your currency with a minimum value of $100 USD (or approximate local equivalent). Set the value to 922337203685478 to remove the spend cap. Not available for Reach and Frequency or Premium Self Serve campaigns.",
  clean: cleanString,
});

export const start_time = input({
  label: "Start Time",
  type: "string",
  required: false,
  comments: "Start Time.",
  clean: cleanString,
});

export const stop_time = input({
  label: "Stop Time",
  type: "string",
  required: false,
  comments: "Stop Time.",
  clean: cleanString,
});

export const topline_id = input({
  label: "Topline Id",
  type: "string",
  required: false,
  comments: "Topline Id.",
  clean: cleanString,
});

export const source_campaign_id = input({
  label: "Source Campaign Id",
  type: "string",
  required: false,
  comments:
    "Used if a campaign has been copied. The ID from the original campaign that was copied.",
  clean: cleanString,
  dataSource: "selectCampaignInAccount",
});

export const ad_schedule_end_time = input({
  label: "Ad Schedule End Time",
  type: "string",
  required: false,
  comments:
    "Indicates the end time for the ad. If no end time is defined, the ad will run on the campaign's schedule.",
  example: "2022-10-10T00:00:00Z",
  clean: cleanString,
});

export const ad_schedule_start_time = input({
  label: "Ad Schedule Start Time",
  type: "string",
  required: false,
  comments:
    "Indicates the start time for the ad. If no start time is defined, the ad will run on the campaign's schedule.",
  example: "2022-10-10T00:00:00Z",
  clean: cleanString,
});

export const adset_id = input({
  label: "Adset Id",
  type: "string",
  required: true,
  comments: "ID of the ad set that contains the ad.",
  example: "23849551358310668",
  clean: util.types.toString,
  dataSource: "selectAdSet",
});

export const adset_spec = input({
  label: "Adset Spec",
  type: "code",
  language: "json",
  required: false,
  comments:
    "The ad set spec for this ad. When the spec is provided, Adset Id field is not required.",
  clean: (values) => cleanCodeInput(values, "Adset Spec"),
});

export const audience_id = input({
  label: "Audience Id",
  type: "string",
  required: false,
  comments: "The ID of the audience.",
  clean: cleanString,
});

export const conversion_domain = input({
  label: "Conversion Domain",
  type: "string",
  required: false,
  comments:
    "The domain where conversions happen. The field is no longer required for creation or update since June 2023. Note that this field should contain only the first and second level domains, and not the full URL.",
  example: "facebook.com",
  clean: cleanString,
});

export const creative = input({
  label: "Creative",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify({ creative_id: "<CREATIVE_ID>" }, null, 2),
  comments:
    "This field is required for create. The ID or creative spec of the ad creative to be used by this ad. You may supply the ID within an object as shown in the example.",
  clean: (value) => cleanCodeInput(value, "Creative"),
});

export const date_format = input({
  label: "Date Format",
  type: "string",
  required: false,
  comments: "The format of the date.",
  clean: cleanString,
});

export const display_sequence = input({
  label: "Display Sequence",
  type: "string",
  required: false,
  comments: "The sequence of the ad within the same campaign.",
  clean: cleanString,
});

export const engagement_audience = input({
  label: "Engagement Audience",
  type: "boolean",
  required: false,
  comments:
    "Flag to create a new audience based on users who engage with this ad.",
  clean: util.types.toBool,
});

export const include_demolink_hashes = input({
  label: "Include Demolink Hashes",
  type: "boolean",
  required: false,
  comments: "Include the demolink hashes.",
  clean: util.types.toBool,
});

export const priority = input({
  label: "Priority",
  type: "string",
  required: false,
  comments: "Priority of the ad.",
  clean: cleanString,
});

export const source_ad_id = input({
  label: "Source Ad Id",
  type: "string",
  required: false,
  comments: "ID of the source Ad, if applicable.",
  clean: cleanString,
});

export const eventName = input({
  label: "Event Name",
  type: "string",
  required: true,
  comments: "A standard event or custom event name.",
  example: "Purchase",
  placeholder: "Purchase",
  clean: util.types.toString,
});

export const eventTime = input({
  label: "Event Time",
  type: "string",
  required: false,
  comments:
    "A Unix timestamp in seconds indicating when the actual event occurred. The specified time may be earlier than the time you send the event to Meta Ads. You must send this date in GMT time zone. Default is the current time.",
  example: "1633552688",
  placeholder: "1633552688",
  clean: eventTimeClean,
});

export const userData = input({
  label: "User Data",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(userDataExample, null, 2),
  comments:
    "A map that contains customer information data. See [Facebook Marketing API documentation](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters) for details.",
  clean: (value) => cleanCodeInput(value, "User Data"),
});

export const customData = input({
  label: "Custom Data",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(customDataExample, null, 2),
  comments:
    "A map that includes additional business data about the event. See [Facebook Marketing API documentation](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/custom-data) for details.",
  clean: (value) => cleanCodeInput(value, "Custom Data"),
});

export const eventSourceUrl = input({
  label: "Event Source Url",
  type: "string",
  required: false,
  comments: "The browser URL where the event happened.",
  example: "http://jaspers-market.com/product/123",
  placeholder: "http://jaspers-market.com/product/123",
  clean: cleanString,
});

export const actionSource = input({
  label: "Action Source",
  type: "string",
  required: true,
  comments: "This field allows you to specify where your conversions occurred.",
  model: [
    {
      label: "Email — Conversion happened over email.",
      value: "email",
    },
    {
      label: "Website — Conversion was made on your website.",
      value: "website",
    },
    {
      label: "App — Conversion was made on your mobile app.",
      value: "app",
    },
    {
      label: "Phone Call — Conversion was made over the phone.",
      value: "phone_call",
    },
    {
      label:
        "Chat — Conversion was made via a messaging app, SMS, or online messaging feature.",
      value: "chat",
    },
    {
      label:
        "Physical Store — Conversion was made in person at your physical store.",
      value: "physical_store",
    },
    {
      label:
        "System Generated — Conversion happened automatically, e.g. a subscription renewal set to auto-pay.",
      value: "system_generated",
    },
    {
      label:
        "Business Messaging — Conversion was made from ads that click to Messenger, Instagram or WhatsApp.",
      value: "business_messaging",
    },
    {
      label: "Other — Conversion happened in a way that is not listed.",
      value: "other",
    },
  ],

  example: "website",
  placeholder: "website",
  clean: util.types.toString,
});

export const moreData = input({
  label: "More Data",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(moreDataExample, null, 2),
  comments:
    "Additional data to include with the event. See [Facebook Marketing API documentation](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/server-event) for details.",
  clean: (value) => cleanCodeInput(value, "More Data") || {},
});

export const events = input({
  label: "Events",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(eventsPayload, null, 2),
  comments:
    "An array of server event objects. See [Facebook Marketing API documentation](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/server-event) for more information.",
  clean: (value) => cleanArrayCodeInput(value, "Events"),
});

export const targeting = input({
  label: "Targeting",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(
    {
      geo_locations: {
        countries: ["US"],
      },
      facebook_positions: ["feed"],
    },
    null,
    2,
  ),
  comments: "The targeting specs for the ad set.",
  clean: (value) => cleanCodeInput(value, "Targeting"),
});

export const verifyToken = input({
  label: "Verify Token",
  type: "string",
  required: true,
  comments: "The verify token for the webhook.",
  example: "test",
  placeholder: "test",
  clean: util.types.toString,
});

export const object = input({
  label: "Object",
  type: "string",
  required: true,
  comments: "The object to be subscribed to.",
  example: "user",
  model: [
    {
      label: "Page",
      value: "page",
    },
    {
      label: "Ad Account",
      value: "ad_account",
    },
  ],
  clean: util.types.toString,
});

export const webhookFields = input({
  label: "Fields",
  type: "string",
  required: false,
  comments: "The fields to be subscribed to.",
  example: "id,name",
  placeholder: "id,name",
  clean: cleanString,
});

export const includeValues = input({
  label: "Include Values",
  type: "boolean",
  required: false,
  comments:
    "Include the names of the fields that have changed as well as their new values.",
  clean: util.types.toBool,
});

export const appId = input({
  label: "App Id",
  type: "string",
  required: true,
  comments: "The ID of the app to create the webhook for.",
  example: "1234567890",
  placeholder: "1234567890",
  clean: util.types.toString,
});

export const callbackUrl = input({
  label: "Callback Url",
  type: "string",
  required: true,
  comments: "The URL to send the webhook to.",
  example: "https://your-domain.com/webhook",
  placeholder: "https://your-domain.com/webhook",
  clean: util.types.toString,
});

export const pageFields = input({
  label: "Page Fields",
  collection: "valuelist",
  type: "string",
  required: false,
  comments: "The fields to be subscribed to.",
  example: "id,name",
  model: PAGE_FIELDS,
});

export const pageFieldsJSON = input({
  label: "Dynamic Page Fields",
  type: "code",
  language: "json",
  required: false,
  comments: "The fields to be subscribed to.",
  example: JSON.stringify(
    PAGE_FIELDS.map((field) => field.value),
    null,
    2,
  ),
  clean: (value) => cleanCodeInput(value, "Page Fields"),
});

export const adAccountFields = input({
  label: "Ad Account Fields",
  collection: "valuelist",
  type: "string",
  required: false,
  comments: "The fields to be subscribed to.",
  example: "id,name",
  model: AD_ACCOUNT_FIELDS,
});

export const adAccountFieldsJSON = input({
  label: "Dynamic Ad Account Fields",
  type: "code",
  language: "json",
  required: false,
  comments: "The fields to be subscribed to.",
  example: JSON.stringify(
    AD_ACCOUNT_FIELDS.map((field) => field.value),
    null,
    2,
  ),
  clean: (value) => cleanCodeInput(value, "Ad Account Fields"),
});
