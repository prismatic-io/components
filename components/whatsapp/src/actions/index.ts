import { sendMessage } from "./messages";
import { deleteMedia, getMedia, getMediafromURL, uploadMedia } from "./media";
import { registerPhoneNumber, requestVerificationCode } from "./phoneNumbers";
import { rawRequest } from "./misc";

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
