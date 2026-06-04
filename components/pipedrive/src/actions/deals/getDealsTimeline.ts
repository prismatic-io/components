import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput } from "../../inputs";
import { cleanNumber, cleanString } from "../../util";
import { WebhookVersion } from "../../constants";

export const getDealsTimeline = action({
  display: {
    label: "Get Deals Timeline",
    description: "Gets the deals timeline.",
  },
  perform: async (
    context,
    {
      connection,
      startDate,
      interval,
      amount,
      fieldKey,
      userId,
      pipelineId,
      filterId,
      excludeDeals,
      totalsConvertCurrency,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get("/deals/timeline", {
      params: {
        start_date: startDate,
        interval,
        amount,
        field_key: fieldKey,
        user_id: userId,
        pipeline_id: pipelineId,
        filter_id: filterId,
        exclude_deals: excludeDeals,
        totals_convert_currency: totalsConvertCurrency,
      },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    startDate: input({
      label: "Start Date",
      type: "string",
      required: true,
      clean: util.types.toString,
      comments: "The date when the first interval starts",
      example: "2024-01-01",
      placeholder: "Enter start date (YYYY-MM-DD)",
    }),
    interval: input({
      label: "Interval",
      type: "string",
      required: true,
      model: [
        { label: "Day", value: "day" },
        { label: "Week", value: "week" },
        { label: "Month", value: "month" },
        { label: "Quarter", value: "quarter" },
      ],
      clean: util.types.toString,
      comments: "The type of the interval",
    }),
    amount: input({
      label: "Amount",
      type: "string",
      required: true,
      clean: util.types.toNumber,
      comments: 'The number of given intervals, starting from "start_date", to fetch',
      example: "12",
      placeholder: "Enter number of intervals",
    }),
    fieldKey: input({
      label: "Field Key",
      type: "string",
      required: true,
      clean: util.types.toString,
      comments: "The date field key which deals will be retrieved from",
      example: "close_time",
      placeholder: "Enter field key",
    }),
    userId: input({
      label: "User ID",
      type: "string",
      clean: cleanNumber,
      comments: "If supplied, only deals matching the given user will be returned",
    }),
    pipelineId: input({
      label: "Pipeline ID",
      type: "string",
      clean: cleanNumber,
      comments: "If supplied, only deals matching the given pipeline will be returned",
    }),
    filterId: input({
      label: "Filter ID",
      type: "string",
      clean: cleanNumber,
      comments: "If supplied, only deals matching the given filter will be returned",
    }),
    excludeDeals: input({
      label: "Exclude Deals",
      type: "string",
      model: [
        { label: "0", value: "0" },
        { label: "1", value: "1" },
      ],
      clean: cleanNumber,
      comments: "Whether to exclude deals list (1) or not (0)",
    }),
    totalsConvertCurrency: input({
      label: "Totals Convert Currency",
      type: "string",
      clean: cleanString,
      comments: "The 3-letter currency code of any of the supported currencies",
    }),
  },
});
