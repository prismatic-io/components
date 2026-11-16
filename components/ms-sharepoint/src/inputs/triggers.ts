import { input, util } from "@prismatic-io/spectral";
import {
  changeType,
  clientState,
  connection,
  driveId,
  expirationDateTime,
  folderId,
  resource,
  siteId,
} from "./common";
import { toOptionalString } from "../util/clean";

const includeSubfolders = input({
  label: "Include Subfolders",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, changes in subfolders will also be tracked recursively.",
  clean: util.types.toBool,
});

export const webhookInputs = {};

export const instanceDeployWebhookInputs = {
  connection,
  resource: {
    ...resource,
    comments:
      "The Microsoft Graph resource path to monitor. Examples: /me/drive/root, /sites/{site-id}/drive/root, /drives/{drive-id}/root",
  },
  changeType,
  clientState: {
    ...clientState,
    comments:
      "Optional validation token sent with each notification. Use to verify notifications originate from Microsoft Graph.",
  },
  expirationDateTime: {
    ...expirationDateTime,
    required: false,
    comments:
      "Optional expiration date/time for the subscription. If not provided, defaults to about 7 days from now. Set a schedule on the trigger to renew the subscription before it expires. Maximum is just under 30 days (42,300 minutes) for SharePoint/OneDrive resources.",
  },
};

export const pollSiteChangesInputs = {
  connection,
  siteId,
};

export const drivePollingTriggerInputs = {
  connection,
  siteId: { ...siteId, required: false, clean: toOptionalString },
  driveId,
};

export const folderPollingTriggerInputs = {
  connection,
  siteId: { ...siteId, required: false, clean: toOptionalString },
  driveId,
  folderId: {
    ...folderId,
    comments: "The ID of the folder to monitor for changes.",
    required: true,
  },
  includeSubfolders,
};
