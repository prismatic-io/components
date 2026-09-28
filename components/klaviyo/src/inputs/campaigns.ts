import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  cleanArrayCodeInput,
  cleanCodeInput,
  cleanStringInput,
  cleanValueListInput,
} from "../util";
import { connection, fields } from "./common";
import { FIELDS_CAMPAIGN_MODEL } from "../constants";
const filterCampaigns = input({
  label: "Filter Campaigns",
  comments: "A Klaviyo JSON:API filter expression to narrow the campaign list.",
  type: "string",
  example: "equals(messages.channel,'sms')",
  placeholder: "Enter a filter expression",
  required: true,
  clean: util.types.toString,
});
const fieldsCampaign = input({ ...fields, model: FIELDS_CAMPAIGN_MODEL });
export const listCampaignsInputs = {
  connection,
  filterCampaigns,
  fieldsCampaign,
};
const campaignName = input({
  label: "Campaign Name",
  comments: "A display name to identify the campaign.",
  type: "string",
  required: true,
  example: "My new campaign",
  placeholder: "Enter a campaign name",
  clean: util.types.toString,
});
const campaignMessages = input({
  label: "Campaign Messages",
  comments: "The message(s) to send in the campaign.",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(
    [
      {
        type: "campaign-message",
        attributes: {
          channel: "email",
          label: "My message name",
          content: {
            subject: "Buy our product!",
            previewText: "My preview text",
            fromEmail: "store@my-company.com",
            fromLabel: "My Company",
            replyToEmail: "reply-to@my-company.com",
            ccEmail: "cc@my-company.com",
            bccEmail: "bcc@my-company.com",
          },
          renderOptions: {
            shortenLinks: true,
            addOrgPrefix: true,
            addInfoLink: true,
            addOptOutLanguage: false,
          },
        },
      },
    ],
    null,
    2,
  ),
  clean: (value) => cleanArrayCodeInput(value, "Campaign Messages"),
});
const includedAudiences = input({
  label: "Included Audiences",
  comments: "The IDs of lists or segments to receive the campaign.",
  type: "string",
  collection: "valuelist",
  example: "X7MYfE",
  placeholder: "Enter an audience ID",
  required: true,
  clean: cleanValueListInput,
});
const excludedAudiences = input({
  label: "Excluded Audiences",
  comments: "The IDs of lists or segments to exclude from the campaign.",
  type: "string",
  collection: "valuelist",
  example: "X7MYfE",
  placeholder: "Enter an audience ID",
  required: true,
  clean: cleanValueListInput,
});
const trackingOptions = input({
  label: "Tracking Options",
  comments:
    "UTM parameters, click tracking, and open tracking configuration. Provide as a JSON object.",
  type: "code",
  language: "json",
  example: JSON.stringify(
    {
      isAddUtm: true,
      utmParams: [
        {
          name: "utm_medium",
          value: "campaign",
        },
      ],
      isTrackingClicks: true,
      isTrackingOpens: true,
    },
    null,
    2,
  ),
  required: false,
  clean: (value) => cleanCodeInput(value, "Tracking Options"),
});
const sendOptions = input({
  label: "Send Options",
  comments:
    "Smart-sending and related delivery preferences. Provide as a JSON object.",
  type: "code",
  language: "json",
  example: JSON.stringify(
    {
      useSmartSending: true,
    },
    null,
    2,
  ),
  required: false,
  clean: (value) => cleanCodeInput(value, "Send Options"),
});
const sendStrategy = input({
  label: "Send Strategy",
  comments:
    "Scheduling method and timing for campaign delivery. Provide as a JSON object.",
  type: "code",
  language: "json",
  example: JSON.stringify(
    {
      method: "static",
      optionsStatic: {
        datetime: new Date("2022-11-08T00:00:00+00:00"),
        isLocal: false,
        sendPastRecipientsImmediately: false,
      },
      optionsThrottled: {
        datetime: new Date("2022-11-08T00:00:00+00:00"),
        throttlePercentage: 10,
      },
      optionsSto: {
        date: "",
      },
    },
    null,
    2,
  ),
  required: false,
  clean: (value) => cleanCodeInput(value, "Send Strategy"),
});
const campaignConfig = structuredObjectInput({
  label: "Campaign Configuration",
  required: false,
  comments: "Tracking options, send options, and send strategy.",
  inputs: { trackingOptions, sendOptions, sendStrategy },
});
export const createCampaignInputs = {
  connection,
  campaignName,
  campaignMessages,
  includedAudiences,
  excludedAudiences,
  campaignConfig,
};
const campaignId = input({
  label: "Campaign ID",
  comments: "The unique identifier for the campaign.",
  type: "string",
  required: true,
  example: "01J2DNH88028WCAA2RK0BYBZVG",
  placeholder: "Enter a campaign ID",
  dataSource: "selectCampaign",
  clean: util.types.toString,
});
export const getCampaignInputs = {
  connection,
  campaignId,
  fieldsCampaign,
};
export const deleteCampaignInputs = {
  connection,
  campaignId,
};
export const updateCampaignInputs = {
  connection,
  campaignId,
  campaignName: input({
    ...campaignName,
    required: false,
    clean: cleanStringInput,
  }),
  includedAudiences: input({ ...includedAudiences, required: false }),
  excludedAudiences: input({ ...excludedAudiences, required: false }),
  campaignConfig,
};
