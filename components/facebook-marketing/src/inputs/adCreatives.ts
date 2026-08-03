import { input } from "@prismatic-io/spectral";
import { AD_CREATIVE_DEFAULTS } from "../constants";
import { cleanString } from "../util/clean";
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
export const creativeId = input({
  label: "Creative Id",
  type: "string",
  required: false,
  example: "58789326952",
  placeholder: "58789326952",
  comments: "Provide the Id of the desired creative.",
  clean: cleanString,
  dataSource: "selectAdCreative",
});
const objectStoryId = input({
  label: "Object Story Id",
  type: "string",
  required: false,
  comments: "Provide an Id for the object story of the adCreative.",
  example: "1051738543535_10636436633230",
  placeholder: "1051738543535_10636436633230",
  clean: cleanString,
});
const urlTags = input({
  label: "URL Tags",
  type: "string",
  required: false,
  comments: "Provide an string for the URL tags on the given adCreative.",
  example: "key1=val1&key2=val2",
  placeholder: "key1=val1&key2=val2",
  clean: cleanString,
});
const body = input({
  label: "Body",
  type: "string",
  required: false,
  comments: "Provide a body for the adCreative.",
  example: "This is an example description body.",
  placeholder: "This is an example description body.",
  clean: cleanString,
});
export const name = input({
  label: "Name",
  type: "string",
  required: false,
  comments: "Provide a name for the adCreative.",
  example: "My Ad Creative",
  placeholder: "My Ad Creative",
  clean: cleanString,
});
export const getAdCreativeInputs = {
  connection: myConnectionField,
  adCreativeId: {
    ...adId,
    label: "Ad Creative",
    comments:
      "Provide a unique identifier of the Ad Creative. This value should be an ID.",
  },
  fields: {
    ...fields,
    default: AD_CREATIVE_DEFAULTS,
  },
  version,
};
export const updateAdCreativeInputs = {
  connection: myConnectionField,
  adCreativeId: {
    ...adId,
    label: "Ad Creative Id",
    comments: "The ID of the ad creative to update.",
  },
  urlTags,
  objectStoryId,
  name,
  body,
  pagination,
  fields: { ...fields, default: AD_CREATIVE_DEFAULTS },
  optionalValues,
  version,
};
export const listAdCreativesInputs = {
  connection: myConnectionField,
  adAccountId,
  fetchAll,
  pagination,
  fields: { ...fields, default: AD_CREATIVE_DEFAULTS },
  version,
};
export const addUrlTagsToCreativeInputs = {
  connection: myConnectionField,
  adAccountId,
  urlTags: { ...urlTags, required: true },
  objectStoryId: { ...objectStoryId, required: true },
  pagination,
  fields: { ...fields, default: AD_CREATIVE_DEFAULTS },
  optionalValues,
  version,
};
