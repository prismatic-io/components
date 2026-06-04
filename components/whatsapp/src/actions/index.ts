import { deleteMedia } from "./deleteMedia";
import { getMedia } from "./getMedia";
import { getMediafromURL } from "./getMediafromURL";
import { rawRequest } from "./rawRequest";
import { registerPhoneNumber } from "./registerPhoneNumber";
import { requestVerificationCode } from "./requestVerificationCode";
import { sendMessage } from "./sendMessage";
import { uploadMedia } from "./uploadMedia";

export default {
  sendMessage,
  requestVerificationCode,
  registerPhoneNumber,
  uploadMedia,
  getMedia,
  deleteMedia,
  getMediafromURL,
  rawRequest,
};
