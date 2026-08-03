import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { COUNTRY_CODES } from "../constants";
import {
  cleanArrayCodeInput,
  cleanCodeInput,
  cleanString,
  valueListInputClean,
} from "../util/clean";
import { adLabels, status } from "./ads";
import { adAccountId, myConnectionField, pagination, version } from "./common";
const campaignName = input({
  label: "Campaign Name",
  type: "string",
  required: true,
  comments: "Name for this campaign.",
  placeholder: "My Campaign",
  clean: util.types.toString,
});
const objective = input({
  label: "Objective",
  type: "string",
  required: true,
  comments:
    "Campaign's objective. If it is specified the API will validate that any ads created under the campaign match that objective.",
  model: [
    { label: "APP_INSTALLS", value: "APP_INSTALLS" },
    { label: "BRAND_AWARENESS", value: "BRAND_AWARENESS" },
    { label: "CONVERSIONS", value: "CONVERSIONS" },
    { label: "EVENT_RESPONSES", value: "EVENT_RESPONSES" },
    { label: "LEAD_GENERATION", value: "LEAD_GENERATION" },
    { label: "LINK_CLICKS", value: "LINK_CLICKS" },
    { label: "LOCAL_AWARENESS", value: "LOCAL_AWARENESS" },
    { label: "MESSAGES", value: "MESSAGES" },
    { label: "OFFER_CLAIMS", value: "OFFER_CLAIMS" },
    { label: "OUTCOME_APP_PROMOTION", value: "OUTCOME_APP_PROMOTION" },
    { label: "OUTCOME_AWARENESS", value: "OUTCOME_AWARENESS" },
    { label: "OUTCOME_ENGAGEMENT", value: "OUTCOME_ENGAGEMENT" },
    { label: "OUTCOME_LEADS", value: "OUTCOME_LEADS" },
    { label: "OUTCOME_SALES", value: "OUTCOME_SALES" },
    { label: "OUTCOME_TRAFFIC", value: "OUTCOME_TRAFFIC" },
    { label: "PAGE_LIKES", value: "PAGE_LIKES" },
    { label: "POST_ENGAGEMENT", value: "POST_ENGAGEMENT" },
    { label: "PRODUCT_CATALOG_SALES", value: "PRODUCT_CATALOG_SALES" },
    { label: "REACH", value: "REACH" },
    { label: "STORE_VISITS", value: "STORE_VISITS" },
    { label: "VIDEO_VIEWS", value: "VIDEO_VIEWS" },
  ],
  clean: util.types.toString,
});
const bid_strategy = input({
  label: "Bid Strategy",
  type: "string",
  required: false,
  comments:
    "Choose bid strategy for this campaign to suit your specific business goals.",
  model: [
    { label: "LOWEST_COST_WITHOUT_CAP", value: "LOWEST_COST_WITHOUT_CAP" },
    { label: "LOWEST_COST_WITH_BID_CAP", value: "LOWEST_COST_WITH_BID_CAP" },
    { label: "COST_CAP", value: "COST_CAP" },
    { label: "LOWEST_COST_WITH_MIN_ROAS", value: "LOWEST_COST_WITH_MIN_ROAS" },
  ],
  clean: cleanString,
});
const campaign_optimization_type = input({
  label: "Campaign Optimization Type",
  type: "string",
  required: false,
  comments: "Campaign Optimization Type.",
  model: [
    { label: "NONE", value: "NONE" },
    { label: "ICO_ONLY", value: "ICO_ONLY" },
  ],
  clean: cleanString,
});
const buying_type = input({
  label: "Buying Type",
  type: "string",
  required: false,
  comments:
    "This field will help Meta Ads make optimizations to delivery, pricing, and limits. All ad sets in this campaign must match the buying type.",
  model: [
    { label: "AUCTION", value: "AUCTION" },
    { label: "RESERVED", value: "RESERVED" },
  ],
  clean: cleanString,
});
const daily_budget = input({
  label: "Daily Budget",
  type: "string",
  required: false,
  comments:
    "Daily budget of this campaign. All adsets under this campaign will share this budget. You can either set budget at the campaign level or at the adset level, not both.",
  placeholder: "1000",
  clean: cleanString,
});
const is_skadnetwork_attribution = input({
  label: "Is Skadnetwork Attribution",
  type: "boolean",
  required: false,
  comments:
    "To create an iOS 14 campaign, enable SKAdNetwork attribution for this campaign.",
  clean: util.types.toBool,
});
const is_using_l3_schedule = input({
  label: "Is Using L3 Schedule",
  type: "boolean",
  required: false,
  comments: "Is Using L3 Schedule.",
  clean: util.types.toBool,
});
const iterative_split_test_configs = input({
  label: "Iterative Split Test Configs",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Array of Iterative Split Test Configs created under this campaign.",
  clean: (value) => cleanArrayCodeInput(value, "Iterative Split Test Configs"),
});
const lifetime_budget = input({
  label: "Lifetime Budget",
  type: "string",
  required: false,
  comments:
    "Lifetime budget of this campaign. All adsets under this campaign will share this budget. You can either set budget at the campaign level or at the adset level, not both.",
  placeholder: "5000",
  clean: cleanString,
});
const promoted_object = input({
  label: "Promoted Object",
  type: "code",
  language: "json",
  required: false,
  comments:
    "The object this campaign is promoting across all its ads. It's required for SKAdNetwork or Aggregated Event Measurement campaign creation. Only product_catalog_id is used at the ad set level.",
  clean: (value) => cleanCodeInput(value, "Promoted Object"),
});
const special_ad_categories = input({
  label: "Special Ad Categories",
  type: "string",
  collection: "valuelist",
  required: true,
  comments: "Special Ad Categories.",
  model: [
    { label: "NONE", value: "NONE" },
    { label: "EMPLOYMENT", value: "EMPLOYMENT" },
    { label: "HOUSING", value: "HOUSING" },
    { label: "CREDIT", value: "CREDIT" },
    { label: "ISSUES_ELECTIONS_POLITICS", value: "ISSUES_ELECTIONS_POLITICS" },
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
const special_ad_category_country = input({
  label: "Special Ad Category Country",
  type: "string",
  collection: "valuelist",
  required: false,
  model: COUNTRY_CODES,
  comments: "Special Ad Category Country.",
  clean: valueListInputClean,
});
const spend_cap = input({
  label: "Spend Cap",
  type: "string",
  required: false,
  comments:
    "A spend cap for the campaign, such that it will not spend more than this cap. Defined as integer value of subunit in your currency with a minimum value of $100 USD (or approximate local equivalent). Set the value to 922337203685478 to remove the spend cap. Not available for Reach and Frequency or Premium Self Serve campaigns.",
  placeholder: "10000",
  clean: cleanString,
});
const start_time = input({
  label: "Start Time",
  type: "string",
  required: false,
  comments: "Start Time.",
  placeholder: "2022-10-10T00:00:00Z",
  clean: cleanString,
});
const stop_time = input({
  label: "Stop Time",
  type: "string",
  required: false,
  comments: "Stop Time.",
  placeholder: "2022-12-31T23:59:59Z",
  clean: cleanString,
});
const topline_id = input({
  label: "Topline Id",
  type: "string",
  required: false,
  comments: "Topline Id.",
  placeholder: "123456789",
  clean: cleanString,
});
const source_campaign_id = input({
  label: "Source Campaign Id",
  type: "string",
  required: false,
  comments:
    "Used if a campaign has been copied. The ID from the original campaign that was copied.",
  placeholder: "58789326952",
  clean: cleanString,
  dataSource: "selectCampaignInAccount",
});
const createCampaignAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Ad Labels, Bid Strategy, Buying Type, Campaign Optimization Type, Daily Budget, Is Skadnetwork Attribution, Is Using L3 Schedule, Iterative Split Test Configs, Lifetime Budget, Promoted Object, Spend Cap, Start Time, and Stop Time.",
  inputs: {
    adLabels,
    bid_strategy,
    buying_type,
    campaign_optimization_type,
    daily_budget,
    is_skadnetwork_attribution,
    is_using_l3_schedule,
    iterative_split_test_configs,
    lifetime_budget,
    promoted_object,
    spend_cap,
    start_time,
    stop_time,
  },
});
export const createCampaignInputs = {
  connection: myConnectionField,
  adAccountId,
  campaignName,
  objective,
  status: {
    ...status,
    required: true,
    comments:
      "Only ACTIVE and PAUSED are valid during creation. Other statuses can be used for update. If it is set to PAUSED, its active child objects will be paused and have an effective status CAMPAIGN_PAUSED.",
  },
  special_ad_categories,
  special_ad_category_country,
  additionalFields: createCampaignAdditionalFields,
  source_campaign_id,
  topline_id,
  version,
};
export const listCampaignsInAccountInputs = {
  connection: myConnectionField,
  adAccountId,
  pagination,
  version,
};
