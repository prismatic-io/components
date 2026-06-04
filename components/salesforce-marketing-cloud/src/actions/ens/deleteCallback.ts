import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENS_CALLBACKS_PATH } from "../../constants";
import { deleteCallbackExamplePayload } from "../../examplePayloads";
import { deleteCallbackInputs } from "../../inputs";

export const deleteCallback = action({
  examplePayload: deleteCallbackExamplePayload,
  display: {
    label: "Delete ENS Callback",
    description: "Delete an ENS callback endpoint registration.",
  },
  inputs: deleteCallbackInputs,
  perform: async (context, { connection, callbackId }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(
      `${ENS_CALLBACKS_PATH}/${encodeURIComponent(callbackId)}`,
    );

    return {
      data: {
        success: true,
        callbackId,
        message: "Callback deleted successfully",
      },
    };
  },
});
