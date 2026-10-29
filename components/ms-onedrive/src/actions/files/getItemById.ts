import { action } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { handleErrors } from "../../errors";
import { getItemByIdExamplePayload } from "../../examplePayloads";
import { getItemByIdInputs } from "../../inputs";

export const getItemById = action({
  display: {
    label: "Get Item",
    description: "Returns the information and metadata of an existing item",
  },
  perform: async (context, params) => {
    const client = getOneDriveClient(params.connection, context.debug.enabled);

    return {
      data: await handleErrors(
        client.get(`/drives/${params.driveId}/items/${params.itemId}`),
      ),
    };
  },
  inputs: getItemByIdInputs,
  examplePayload: getItemByIdExamplePayload,
});
