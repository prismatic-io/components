import { input, util } from "@prismatic-io/spectral";
import { jsonInputClean } from "../util";
import {
  attachmentId,
  connectionInput,
  fetchAll,
  pageId,
  pagination,
  queryParameters,
  sort,
} from "./common";
export const customContentId = input({
  label: "Custom Content ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the custom content.",
  clean: util.types.toString,
  example: "123456789",
  placeholder: "Enter custom content ID",
});
export const propertyId = input({
  label: "Property ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the content property.",
  clean: util.types.toString,
  example: "content-prop-123",
  placeholder: "Enter property ID",
});
export const bodyData = input({
  label: "Body Data",
  type: "code",
  language: "json",
  comments: "The content property data to create or update.",
  default: JSON.stringify(
    {
      key: "my-property-key",
      value: "property-value",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});
const updateBodyData = {
  ...bodyData,
  default: JSON.stringify(
    {
      key: "<string>",
      value: "<string>",
      version: {
        number: 84,
        message: "<string>",
      },
    },
    null,
    2,
  ),
};
export const createContentPropertyForAttachmentInputs = {
  connectionInput,
  attachmentId,
  bodyData,
};
export const createContentPropertyForCustomContentInputs = {
  connectionInput,
  customContentId,
  bodyData,
};
export const createContentPropertyForPageInputs = {
  connectionInput,
  pageId,
  bodyData,
};
export const deleteContentPropertyForAttachmentInputs = {
  connectionInput,
  attachmentId,
  propertyId,
};
export const deleteContentPropertyForCustomContentInputs = {
  connectionInput,
  customContentId,
  propertyId,
};
export const deleteContentPropertyForPageInputs = {
  connectionInput,
  pageId,
  propertyId,
};
export const getContentPropertiesForAttachmentsInputs = {
  connectionInput,
  attachmentId,
  propertyId,
};
export const getContentPropertiesForCustomContentInputs = {
  connectionInput,
  customContentId,
  propertyId,
};
export const getContentPropertiesForPageInputs = {
  connectionInput,
  pageId,
  propertyId,
};
export const listContentPropertiesForAttachmentsInputs = {
  connectionInput,
  attachmentId,
  fetchAll,
  pagination,
  sort,
  queryParameters,
};
export const listContentPropertiesForCustomContentInputs = {
  connectionInput,
  customContentId,
  fetchAll,
  pagination,
  sort,
  queryParameters,
};
export const listContentPropertiesForPageInputs = {
  connectionInput,
  pageId,
  fetchAll,
  pagination,
  sort,
  queryParameters,
};
export const updateContentPropertyForAttachmentInputs = {
  connectionInput,
  attachmentId,
  propertyId,
  bodyData: updateBodyData,
};
export const updateContentPropertyForCustomContentInputs = {
  connectionInput,
  customContentId,
  propertyId,
  bodyData: updateBodyData,
};
export const updateContentPropertyForPageInputs = {
  connectionInput,
  pageId,
  propertyId,
  bodyData: updateBodyData,
};
