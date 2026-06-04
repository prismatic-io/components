import { finaliseCompleteUpload } from "./finaliseCompleteUpload";
import { finaliseCompleteUploadAndSaveAsNewAsset } from "./finaliseCompleteUploadAndSaveAsNewAsset";
import { getClosestS3Endpoint } from "./getClosestS3Endpoint";
import { initialiseUpload } from "./initialise";
import { registerUploadedChunk } from "./registerUploadedChunk";
import { retrievePollState } from "./retrievePollState";
import { saveAsNewAsset } from "./saveAsNewAsset";
import { saveAsNewAssetVersion } from "./saveAsNewAssetVersion";
import { uploadChunk } from "./uploadChunk";

export default {
  finaliseCompleteUpload,
  finaliseCompleteUploadAndSaveAsNewAsset,
  getClosestS3Endpoint,
  initialiseUpload,
  registerUploadedChunk,
  retrievePollState,
  saveAsNewAsset,
  saveAsNewAssetVersion,
  uploadChunk,
};
