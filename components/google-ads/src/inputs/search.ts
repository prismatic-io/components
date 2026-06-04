import { input, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  customerIdInput,
  fetchAll,
  managerCustomerIdInput,
  pageTokenInput,
} from "./common";

const query = input({
  label: "Query",
  placeholder: "Enter GAQL query",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments:
    "Google Ads Query Language (GAQL) query string. See [GAQL documentation](https://developers.google.com/google-ads/api/docs/query/overview).",
  example: `SELECT
  campaign.id,
  campaign.status,
  campaign_budget.id,
  campaign_budget.period,
  campaign_budget.amount_micros,
  campaign_budget.type
FROM campaign
WHERE campaign.advertising_channel_type = 'LOCAL_SERVICES'`,
});

const returnTotalResultsCount = input({
  label: "Return Total Results Count",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
  comments:
    "When true, the total number of results that match the query ignoring the LIMIT clause will be included in the response. Default is false.",
});

export const searchAdsLocalServicesInputs = {
  connection: connectionInput,
  customerId: customerIdInput,
  query,
  fetchAll,
  pageTokenInput,
  managerCustomerId: { ...managerCustomerIdInput, required: false },
  returnTotalResultsCount,
};
