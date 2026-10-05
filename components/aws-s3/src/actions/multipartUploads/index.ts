import { abortMultipartUpload } from "./abortMultipartUpload";
import { completeMultipartUpload } from "./completeMultipartUpload";
import { createMultipartUpload } from "./createMultipartUpload";
import { generatePresignedForMultiparUploads } from "./generatePresignedForMultiparUploads";
import { listMultipartUploads } from "./listMultipartUploads";
import { listParts } from "./listParts";
import { uploadPart } from "./uploadPart";
export default {
  abortMultipartUpload,
  completeMultipartUpload,
  createMultipartUpload,
  generatePresignedForMultiparUploads,
  listMultipartUploads,
  listParts,
  uploadPart,
};
