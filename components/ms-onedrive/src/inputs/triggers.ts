import { oneDriveConnection } from "./common";
import {
  changeType,
  clientState,
  expirationDateTime,
  resource,
} from "./subscriptions";

export const instanceDeployWebhookInputs = {
  oneDriveConnection,
  resource: {
    ...resource,
    comments:
      "The Microsoft Graph resource path to monitor. Examples: /me/drive/root, /drives/{drive-id}/root",
    default: "/me/drive/root",
  },
  changeType: {
    ...changeType,
    comments:
      "The type of changes to monitor. OneDrive primarily supports 'updated'.",
  },
  clientState: {
    ...clientState,
    comments:
      "Optional validation token sent with each notification. Use to verify notifications originate from Microsoft Graph.",
  },
  expirationDateTime: {
    ...expirationDateTime,
    required: false,
    comments:
      "Optional expiration date/time for the subscription. If not provided, defaults to 3 days from now. Maximum is 30 days for OneDrive resources.",
  },
};
