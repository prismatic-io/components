import { input } from "@prismatic-io/spectral";
import {
  cleanArrayCodeInput,
  cleanCodeInput,
  cleanStringInput,
  cleanValueListInput,
} from "../utils";
import { connection, fields } from "./shared";
import { FIELDS_CAMPAIGN_MODEL } from "../constants";

const filterCampaigns = input({
  label: "Filter Campaigns",
  comments: "A filter to apply to the campaigns.",
  type: "string",
  example: "equals(messages.channel,'sms')",
  placeholder: "equals(messages.channel,'sms')",
  default: "equals(messages.channel,'sms')",
  required: true,
  clean: cleanStringInput,
});

const fieldsCampaign = input({ ...fields, model: FIELDS_CAMPAIGN_MODEL });

export const listCampaignsInputs = {
  connection,
  filterCampaigns,
  fieldsCampaign,
};

const campaignName = input({
  label: "Campaign Name",
  comments: "The name of the campaign.",
  type: "string",
  required: true,
  example: "My new campaign",
  placeholder: "My new campaign",
  clean: cleanStringInput,
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
  comments: "A list of included audiences.",
  type: "string",
  collection: "valuelist",
  example: "X7MYfE",
  placeholder: "X7MYfE",
  required: true,
  clean: cleanValueListInput,
});

const excludedAudiences = input({
  label: "Excluded Audiences",
  comments: "A list of excluded audiences.",
  type: "string",
  collection: "valuelist",
  example: "X7MYfE",
  placeholder: "X7MYfE",
  required: true,
  clean: cleanValueListInput,
});

const trackingOptions = input({
  label: "Tracking Options",
  comments: "The tracking options for the campaign.",
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
  comments: "The send options for the campaign.",
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
  comments: "The send strategy for the campaign.",
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

export const createCampaignInputs = {
  connection,
  campaignName,
  campaignMessages,
  includedAudiences,
  excludedAudiences,
  trackingOptions,
  sendOptions,
  sendStrategy,
};

const campaignId = input({
  label: "Campaign ID",
  comments: "The ID of the campaign.",
  type: "string",
  required: true,
  example: "01J2DNH88028WCAA2RK0BYBZVG",
  placeholder: "01J2DNH88028WCAA2RK0BYBZVG",
  dataSource: "selectCampaign",
  clean: cleanStringInput,
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
  campaignName: input({ ...campaignName, required: false }),
  includedAudiences: input({ ...includedAudiences, required: false }),
  excludedAudiences: input({ ...excludedAudiences, required: false }),
  trackingOptions,
  sendOptions,
  sendStrategy,
};
