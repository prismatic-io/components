import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { AD_DEFAULTS, PREVIEW_FORMATS } from "../constants";
import {
  cleanArrayCodeInput,
  cleanCodeInput,
  cleanString,
} from "../util/clean";
import { creativeId, name } from "./adCreatives";
import {
  adAccountId,
  adId,
  fetchAll,
  fields,
  myConnectionField,
  optionalValues,
  pagination,
  version,
} from "./common";
export const adName = input({
  label: "Ad Name",
  type: "string",
  required: false,
  example: "My New Ad",
  placeholder: "My New Ad",
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
const adFormat = input({
  label: "Ad Format",
  type: "string",
  required: true,
  comments: "Provide a type of ad format to preview.",
  model: PREVIEW_FORMATS,
  clean: util.types.toString,
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
const tracking = input({
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
const ad_schedule_end_time = input({
  label: "Ad Schedule End Time",
  type: "string",
  required: false,
  comments:
    "Indicates the end time for the ad. If no end time is defined, the ad will run on the campaign's schedule.",
  example: "2022-10-10T00:00:00Z",
  placeholder: "2022-10-10T00:00:00Z",
  clean: cleanString,
});
const ad_schedule_start_time = input({
  label: "Ad Schedule Start Time",
  type: "string",
  required: false,
  comments:
    "Indicates the start time for the ad. If no start time is defined, the ad will run on the campaign's schedule.",
  example: "2022-10-10T00:00:00Z",
  placeholder: "2022-10-10T00:00:00Z",
  clean: cleanString,
});
const adset_id = input({
  label: "Adset Id",
  type: "string",
  required: true,
  comments: "ID of the ad set that contains the ad.",
  example: "23849551358310668",
  placeholder: "23849551358310668",
  clean: util.types.toString,
  dataSource: "selectAdSet",
});
const adset_spec = input({
  label: "Adset Spec",
  type: "code",
  language: "json",
  required: false,
  comments:
    "The ad set spec for this ad. When the spec is provided, Adset Id field is not required.",
  clean: (values) => cleanCodeInput(values, "Adset Spec"),
});
const audience_id = input({
  label: "Audience Id",
  type: "string",
  required: false,
  comments: "The ID of the audience.",
  placeholder: "123456789",
  clean: cleanString,
});
const conversion_domain = input({
  label: "Conversion Domain",
  type: "string",
  required: false,
  comments:
    "The domain where conversions happen. The field is no longer required for creation or update since June 2023. Note that this field should contain only the first and second level domains, and not the full URL.",
  example: "facebook.com",
  placeholder: "facebook.com",
  clean: cleanString,
});
const creative = input({
  label: "Creative",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify({ creative_id: "<CREATIVE_ID>" }, null, 2),
  comments:
    "This field is required for create. The ID or creative spec of the ad creative to be used by this ad. You may supply the ID within an object as shown in the example.",
  clean: (value) => cleanCodeInput(value, "Creative"),
});
const date_format = input({
  label: "Date Format",
  type: "string",
  required: false,
  comments: "The format of the date.",
  placeholder: "U",
  clean: cleanString,
});
const display_sequence = input({
  label: "Display Sequence",
  type: "string",
  required: false,
  comments: "The sequence of the ad within the same campaign.",
  placeholder: "1",
  clean: cleanString,
});
const engagement_audience = input({
  label: "Engagement Audience",
  type: "boolean",
  required: false,
  comments:
    "Flag to create a new audience based on users who engage with this ad.",
  clean: util.types.toBool,
});
const include_demolink_hashes = input({
  label: "Include Demolink Hashes",
  type: "boolean",
  required: false,
  comments: "Include the demolink hashes.",
  clean: util.types.toBool,
});
const priority = input({
  label: "Priority",
  type: "string",
  required: false,
  comments: "Priority of the ad.",
  placeholder: "0",
  clean: cleanString,
});
const source_ad_id = input({
  label: "Source Ad Id",
  type: "string",
  required: false,
  comments: "ID of the source Ad, if applicable.",
  placeholder: "342512647855388",
  clean: cleanString,
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
const createAdAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Adset Spec, Ad Schedule End Time, Ad Schedule Start Time, Ad Labels, Conversion Domain, Date Format, Display Sequence, Engagement Audience, Include Demolink Hashes, and Priority.",
  inputs: {
    adset_spec,
    ad_schedule_end_time,
    ad_schedule_start_time,
    adLabels: { ...adLabels, comments: "Ad labels associated with this ad." },
    conversion_domain,
    date_format,
    display_sequence,
    engagement_audience,
    include_demolink_hashes,
    priority,
  },
});
export const createAdInputs = {
  connection: myConnectionField,
  adAccountId,
  name: { ...name, comments: "Name of the ad.", required: true },
  creative,
  adset_id,
  status: { ...status, required: true },
  additionalFields: createAdAdditionalFields,
  audience_id,
  source_ad_id,
  version,
};
export const getAdInputs = {
  connection: myConnectionField,
  adId: { ...adId, comments: "Ad ID to get." },
  fields: {
    ...fields,
    default: AD_DEFAULTS,
  },
  version,
};
export const updateAdInputs = {
  connection: myConnectionField,
  adId,
  adName,
  status,
  creativeId,
  tracking,
  optionalValues,
  fields: {
    ...fields,
    default: AD_DEFAULTS,
  },
  version,
};
export const deleteAdInputs = {
  connection: myConnectionField,
  adId: { ...adId, comments: "Ad ID to delete." },
  version,
};
export const getAdPreviewInputs = {
  connection: myConnectionField,
  adId: {
    ...adId,
    comments: "The ID of the ad to list previews for.",
  },
  adFormat,
  version,
};
export const listAdsInAccountInputs = {
  connection: myConnectionField,
  adAccountId,
  fetchAll,
  pagination,
  fields: { ...fields, default: AD_DEFAULTS },
  version,
};
export const listAdsInAdsetInputs = {
  connection: myConnectionField,
  adId: {
    ...adId,
    label: "Ad Set Id",
    comments: "The ID of the adset to list ads for.",
  },
  fields: {
    ...fields,
    default: AD_DEFAULTS,
  },
  version,
};
export const listAdLeadsInputs = {
  connection: myConnectionField,
  adId: { ...adId, comments: "The ID of the ad to list leads for." },
  pagination,
  fields: { ...fields, default: "name" },
  version,
};
