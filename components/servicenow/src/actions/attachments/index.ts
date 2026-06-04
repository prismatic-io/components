import { deleteAttachment } from "./delete";
import { getAttachment } from "./get";
import { getAttachmentFile } from "./getFile";
import { listAttachments } from "./list";
import { multipartUploadAttachment } from "./multipartUpload";
import { uploadAttachment } from "./upload";

export default {
  getAttachment,
  getAttachmentFile,
  deleteAttachment,
  listAttachments,
  multipartUploadAttachment,
  uploadAttachment,
};
