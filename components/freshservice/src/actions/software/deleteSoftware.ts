import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { deleteSoftwareExamplePayload as examplePayload } from "../../examplePayloads";
import { deleteSoftwareInputs as inputs } from "../../inputs/software";

export const deleteSoftware = action({
  display: {
    label: "Delete Software",
    description: "Deletes a software application by ID.",
  },
  perform: async (context, { connection, applicationId }) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);

    await client.delete(`/applications/${applicationId}`);

    return SUCCESS_RESPONSE;
  },
  inputs,
  examplePayload,
});
