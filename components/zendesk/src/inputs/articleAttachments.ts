import { cleanString } from "../util";
import {
  articleAttachmentId,
  articleId,
  connectionInput,
  fetchAll,
  file,
  fileName,
  inline,
  locale,
  pageLimit,
} from "./common";
export const createArticleAttachmentInputs = {
  zendeskConnection: connectionInput,
  locale: {
    ...locale,
    required: false,
    comments:
      "The Help Center locale used to populate the article picker. Defaults to 'en-us'.",
    clean: cleanString,
  },
  articleId,
  file: {
    ...file,
    comments: "The File Attachment to upload.",
    required: true,
  },
  fileName: {
    ...fileName,
    example: "file.jpg",
    placeholder: "file.jpg",
  },
  inline,
};
export const deleteArticleAttachmentInputs = {
  zendeskConnection: connectionInput,
  articleAttachmentId,
};
export const getArticleAttachmentInputs = {
  zendeskConnection: connectionInput,
  locale: {
    ...locale,
    required: false,
    comments:
      "The Help Center locale used to populate the article picker. Defaults to 'en-us'.",
    clean: cleanString,
  },
  articleId,
  articleAttachmentId,
};
export const listArticleAttachmentsInputs = {
  zendeskConnection: connectionInput,
  locale: {
    ...locale,
    required: false,
    comments:
      "The Help Center locale used to populate the article picker. Defaults to 'en-us'.",
    clean: cleanString,
  },
  articleId,
  fetchAll,
  pageLimit,
};
