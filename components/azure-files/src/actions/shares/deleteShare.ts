import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { deleteShareInputs } from "../../inputs";
import { deleteShareExamplePayload } from "../../examplePayloads";
export const deleteShare = action({
  display: {
    label: "Delete Share",
    description: "Delete a file share.",
  },
  perform: async (context, { shareName, azureConnection }) => {
    const client = createAuthorizedClient(azureConnection);
    return {
      data: await client.deleteShare(shareName),
    };
  },
  inputs: deleteShareInputs,
  examplePayload: deleteShareExamplePayload,
});
