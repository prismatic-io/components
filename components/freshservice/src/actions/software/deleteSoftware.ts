import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { deleteSoftwareExamplePayload as examplePayload } from "../../examplePayloads";
import { deleteSoftwareInputs as inputs } from "../../inputs";
import { successOutputSchema } from "../../outputSchemas";
export const deleteSoftware = action({
  display: {
    label: "Delete Software",
    description: "Deletes a software application by ID.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, applicationId }) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    await client.delete(`/applications/${applicationId}`);
    return SUCCESS_RESPONSE;
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: successOutputSchema,
  }),
  inputs,
  examplePayload,
});
