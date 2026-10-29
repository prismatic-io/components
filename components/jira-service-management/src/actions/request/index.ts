import { addAttachment } from "./addAttachment";
import { addComment } from "./addComment";
import { approveRequest } from "./approveRequest";
import { createRequest } from "./createRequest";
import { getRequest } from "./getRequest";
import { listApprovals } from "./listApprovals";
import { listComments } from "./listComments";
import { listRequests } from "./listRequests";
import { listSla } from "./listSla";
import { listTransitions } from "./listTransitions";
import { transitionRequest } from "./transitionRequest";
import { uploadTemporaryFile } from "./uploadTemporaryFile";

export default {
  listRequests,
  createRequest,
  getRequest,
  addComment,
  listComments,
  uploadTemporaryFile,
  addAttachment,
  listApprovals,
  approveRequest,
  listSla,
  listTransitions,
  transitionRequest,
};
