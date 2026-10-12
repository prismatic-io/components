import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deletePersonPictureInputs } from "../../inputs";
import { deletePersonPictureExamplePayload } from "../../examplePayloads";
import { deletePersonPictureOutputSchema } from "../../outputSchemas";
export const deletePersonPicture = action({
  display: {
    label: "Delete Person Picture",
    description: "Deletes a person picture.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/persons/${id}/picture`);
    return { data };
  },
  inputs: deletePersonPictureInputs,
  examplePayload: deletePersonPictureExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deletePersonPictureOutputSchema,
  }),
});
