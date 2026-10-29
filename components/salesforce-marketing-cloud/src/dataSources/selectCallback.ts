import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { ENS_CALLBACKS_PATH } from "../constants";
import { connection } from "../inputs/common";

interface CallbackItem {
  callbackId: string;
  callbackName: string;
  [key: string]: unknown;
}

export const selectCallback = dataSource({
  display: {
    label: "Select ENS Callback",
    description:
      "Select an Event Notification Service callback from a dropdown menu.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);

    const { data } = await client.get<CallbackItem[]>(ENS_CALLBACKS_PATH);

    const callbacks = Array.isArray(data) ? data : [];

    const result = callbacks
      .map<Element>((item) => ({
        label: util.types.toString(item.callbackName),
        key: util.types.toString(item.callbackId),
      }))
      .sort((a, b) => (a.label ?? "").localeCompare(b.label ?? ""));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "Example Callback",
        key: "14e2ee5b-8c01-4f9d-916d-29e329945619",
      },
      {
        label: "Production Webhook",
        key: "65b885ab-c2b4-46fe-85d0-d6cb8be8057d",
      },
    ],
  },
});
