import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import { connection, fetchAll, page, pageSize } from "./common";





const campaignId = input({
  label: "Campaign ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the campaign in Marketing Cloud.",
  example: "12345",
  placeholder: "Enter campaign ID",
  dataSource: "selectCampaign",
  clean: util.types.toString,
});

const campaignName = input({
  label: "Campaign Name",
  type: "string",
  required: true,
  comments: "The display name for the campaign shown in Marketing Cloud.",
  example: "Summer Sale 2024",
  placeholder: "Enter campaign name",
  clean: util.types.toString,
});

const campaignDescription = input({
  label: "Campaign Description",
  type: "string",
  required: false,
  comments:
    "Optional description providing details about the campaign's purpose and content.",
  example: "Promotional campaign for summer sale event",
  placeholder: "Enter campaign description",
  clean: toOptionalString,
});

const campaignCode = input({
  label: "Campaign Code",
  type: "string",
  required: false,
  comments: "An optional campaign code for tracking.",
  example: "SUMMER2024",
  placeholder: "Enter campaign code",
  clean: toOptionalString,
});

const campaignColor = input({
  label: "Color",
  type: "string",
  required: false,
  comments:
    "The display color for the campaign in the Marketing Cloud UI (hex format).",
  example: "#FF5733",
  placeholder: "Enter hex color code",
  clean: toOptionalString,
});

const campaignExtraBody = input({
  label: "Extra Body",
  type: "code",
  language: "json",
  required: false,
  comments: "Additional properties to include in the campaign request body.",
  example: JSON.stringify({ favorite: true }, null, 2),
  clean: util.types.toObject,
});





export const listCampaignsInputs = {
  connection,
  fetchAll,
  pageSize,
  page,
};

export const getCampaignInputs = {
  connection,
  campaignId,
};

export const deleteCampaignInputs = {
  connection,
  campaignId,
};

export const createCampaignInputs = {
  connection,
  campaignName,
  campaignDescription,
  campaignCode,
  campaignColor,
  campaignExtraBody,
};
