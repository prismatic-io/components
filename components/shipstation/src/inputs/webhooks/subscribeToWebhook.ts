import { connectionInput } from "../common";
import {
  eventInput,
  friendlyNameInput,
  storeIdWebhookInput,
  targetUrlInput,
} from "./common";

export const subscribeToWebhookInputs = {
  connectionInput,
  targetUrl: targetUrlInput,
  event: eventInput,
  storeId: storeIdWebhookInput,
  friendlyName: friendlyNameInput,
};
