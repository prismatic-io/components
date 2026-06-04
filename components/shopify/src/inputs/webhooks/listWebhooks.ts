import { input, util } from "@prismatic-io/spectral";
import { connectionInput } from "../common";

export const listWebhooksInputs = {
  shopifyConnection: connectionInput,
  showOnlyInstanceWebhooks: input({
    label: "Show Only Instance Webhooks",
    comments: "When true, only webhooks that point to this instance are returned.",
    type: "boolean",
    default: "true",
    clean: util.types.toBool,
  }),
};
