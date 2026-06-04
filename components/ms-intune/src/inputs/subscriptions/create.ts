import { bodyFields } from "../general";
import {
  changeType,
  expirationDateTime,
  lifecycleNotificationUrl,
  notificationUrl,
  resource,
} from "./general";

export const createSubscriptionInputs = {
  changeType,
  notificationUrl,
  resource,
  expirationDateTime,
  lifecycleNotificationUrl,
  bodyFields: {
    ...bodyFields,
    example: JSON.stringify(
      {
        clientState: "secret",
        includeResourceData: true,
      },
      null,
      2,
    ),
  },
};
