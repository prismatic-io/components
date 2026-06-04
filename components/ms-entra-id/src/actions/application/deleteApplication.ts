import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { emptyExamplePayload as examplePayload } from "../../examplePayloads";
import { deleteApplicationInputs as inputs } from "../../inputs/application";

export const deleteApplication = action({
  display: {
    label: "Delete Application",
    description: "Deletes an application object.",
  },
  perform: async (context, { connection, applicationObjectId }) => {
    const client = createClient(connection, context.debug.enabled);

    await client.delete(`/applications/${applicationObjectId}`);
    return {
      data: SUCCESS_RESPONSE,
    };
  },
  inputs,
  examplePayload,
});
