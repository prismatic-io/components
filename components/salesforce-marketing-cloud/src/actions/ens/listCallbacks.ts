import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENS_CALLBACKS_PATH } from "../../constants";
import { listCallbacksExamplePayload } from "../../examplePayloads";
import { listCallbacksInputs } from "../../inputs";

export const listCallbacks = action({
  examplePayload: listCallbacksExamplePayload,
  display: {
    label: "List ENS Callbacks",
    description:
      "List registered Event Notification Service (ENS) callback endpoints.",
  },
  inputs: listCallbacksInputs,
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(ENS_CALLBACKS_PATH);

    return { data };
  },
});
