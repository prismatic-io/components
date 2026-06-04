import { input } from "@prismatic-io/spectral";

export const amount = input({
  label: "Amount",
  type: "string",
  required: false,
  comments: "The amount value for the deal.",
  example: "34,000",
});

export const closeDate = input({
  label: "Close Date",
  type: "string",
  required: false,
  comments: "The date when the sale will close.",
  example: "2019-12-07T16:50:06.678Z",
});

export const dealName = input({
  label: "Deal Name",
  type: "string",
  required: true,
  comments: "The name of the deal.",
  example: "My Example Deal",
});

export const updateDealName = input({
  label: "Deal Name",
  type: "string",
  required: false,
  comments: "The name of the deal.",
  example: "My Example Deal",
});

export const dealId = input({
  label: "Deal ID",
  type: "string",
  required: true,
  placeholder: "Enter Deal ID",
  comments: "The unique identifier of the deal.",
  dataSource: "selectDeal",
  example: "804874",
});

export const dealStage = input({
  label: "Deal Stage",
  type: "string",
  required: true,
  comments:
    "The stage of the deal. Deal stages allow you to categorize and track the progress of the deals.",
  example: "presentationscheduled",
});

export const updateDealStage = input({
  label: "Deal Stage",
  type: "string",
  required: false,
  comments:
    "The stage of the deal. Deal stages allow you to categorize and track the progress of the deals.",
  example: "presentationscheduled",
});

export const pipeline = input({
  label: "Pipeline",
  type: "string",
  required: true,
  example: "default",
  comments: "The pipeline to interact with.",
});

export const updatePipeline = input({
  label: "Pipeline",
  type: "string",
  required: false,
  example: "default",
  comments: "The pipeline to interact with.",
});

export const dealType = input({
  label: "Deal Type",
  type: "string",
  required: false,
  example: "newbusiness",
  comments:
    "The type of deal. By default, categorize your deal as either New Business or Existing Business. The picklist of values for this property is configurable through HubSpot.",
});

export const priority = input({
  label: "Priority",
  type: "string",
  required: false,
  model: [
    { label: "low", value: "low" },
    { label: "medium", value: "medium" },
    { label: "high", value: "high" },
  ],
  comments: "The priority of the deal.",
});
