import { action, outputSchema } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { handleErrors } from "../../errors";
import { getItemExamplePayload } from "../../examplePayloads";
import { getItemInputs } from "../../inputs";
import { getItemOutputSchema } from "../../outputSchemas";

export const getItem = action({
  display: {
    label: "Get Item by Path",
    description:
      "Gets the information and metadata of an item by its path in the current user's OneDrive.",
  },
  inputs: getItemInputs,
  performSafety: "safe",
  perform: async (context, { connection, dir }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return {
      data: await handleErrors(client.get(`/me/drive/root:${dir}`)),
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getItemOutputSchema,
  }),
  examplePayload: getItemExamplePayload,
});
