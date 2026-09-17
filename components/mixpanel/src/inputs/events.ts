import { input, structuredObjectInput } from "@prismatic-io/spectral";
import { jsonInputClean, toOptionalString } from "../util";
import {
  connectionInput,
  project_id,
  region,
  useProjectToken,
  verbose,
  redirect,
} from "./common";
export const events = input({
  label: "Events",
  type: "code",
  language: "json",
  comments:
    "An array of event objects to ingest into Mixpanel. Each request accepts up to 2000 events and 2MB uncompressed. See the [Event Ingestion API](https://docs.mixpanel.com/reference/import-events) documentation for details.",
  example: JSON.stringify(
    [
      {
        event: "Signed up",
        properties: {
          time: 1618716477000,
          distinct_id: "91304156-cafc-4673-a237-623d1129c801",
          $insert_id: "29fc2962-6d9c-455d-95ad-95b84f09b9e4",
          ip: "136.24.0.114",
          "Referred by": "Friend",
          URL: "mixpanel.com/signup",
        },
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});
export const ip = input({
  label: "IP",
  type: "string",
  clean: toOptionalString,
  comments:
    "When true, Mixpanel will use the IP address of the incoming request and compute a distinct_id using a hash function if no distinct_id is provided. Set to 1 to enable.",
  placeholder: "Enter 1 to enable IP tracking",
  required: false,
  example: "1",
});
export const img = input({
  label: "Img",
  type: "string",
  clean: toOptionalString,
  comments:
    "When true, Mixpanel will serve a 1x1 transparent pixel image as a response. Set to 1 to enable pixel tracking for environments without JavaScript support.",
  placeholder: "Enter 1 to enable pixel tracking",
  required: false,
  example: "1",
});
export const deliveryOptions = structuredObjectInput({
  label: "Delivery Options",
  required: false,
  comments:
    "Optional request delivery controls: IP-based distinct ID computation, verbose responses, redirect URL, and pixel-image response.",
  inputs: { ip, verbose, redirect, img },
});
export const trackEventsInputs = {
  connection: connectionInput,
  useProjectToken: { ...useProjectToken, default: "true" },
  region,
  deliveryOptions,
  events,
};
export const importEventsInputs = {
  connection: connectionInput,
  useProjectToken,
  region,
  events,
  project_id,
};
