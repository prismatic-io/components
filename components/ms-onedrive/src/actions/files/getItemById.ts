import { action, outputSchema } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { handleErrors } from "../../errors";
import { getItemByIdExamplePayload } from "../../examplePayloads";
import { getItemByIdInputs } from "../../inputs";
import { getItemByIdOutputSchema } from "../../outputSchemas";

export const getItemById = action({
  display: {
    label: "Get Item",
    description: "Returns the information and metadata of an existing item.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const client = getOneDriveClient(params.connection, context.debug.enabled);

    return {
      data: await handleErrors(
        client.get(`/drives/${params.driveId}/items/${params.itemId}`),
      ),
    };
  },
  inputs: getItemByIdInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getItemByIdOutputSchema,
  }),
  examplePayload: getItemByIdExamplePayload,
});
