import { input, util } from "@prismatic-io/spectral";
import {
  attachmentId,
  connectionInput,
  fetchAll,
  pageId,
  pagination,
  queryParameters,
} from "./common";
export const purgeAttachment = input({
  label: "Purge",
  type: "boolean",
  required: false,
  comments:
    "When true, permanently deletes the attachment instead of moving it to trash.",
  clean: util.types.toBool,
});
export const deleteAttachmentInputs = {
  connectionInput,
  attachmentId,
  purgeAttachment,
};
export const getAttachmentInputs = {
  connectionInput,
  attachmentId,
  queryParameters,
};
export const getPageAttachmentInputs = {
  connectionInput,
  pageId,
  pagination,
  queryParameters,
};
export const listAttachmentsInputs = {
  connectionInput,
  fetchAll,
  pagination,
  queryParameters,
};
