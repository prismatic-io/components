import { action, outputSchema, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createBoxHttpClient } from "../../client";
import { SHARED_LINK_FIELD } from "../../constants";
import { removeSharedLinkFromFileExamplePayload } from "../../examplePayloads";
import { removeSharedLinkFromFileInputs } from "../../inputs";
import { removeSharedLinkFromFileOutputSchema } from "../../outputSchemas";
export const removeSharedLinkFromFile = action({
  display: {
    label: "Remove Shared Link from File",
    description: "Removes a shared link from a file.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const fileId = params.fileId;
    const client = createBoxHttpClient(
      params.boxConnection,
      context.debug.enabled,
    );
    try {
      const { data } = await client.put(
        `/files/${fileId}`,
        {
          shared_link: null,
        },
        {
          params: {
            fields: SHARED_LINK_FIELD,
          },
        },
      );
      return {
        data,
      };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  examplePerform: async (
    _context,
    { fileId },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...removeSharedLinkFromFileExamplePayload.data,
      id: fileId,
    },
  }),
  inputs: removeSharedLinkFromFileInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: removeSharedLinkFromFileOutputSchema,
  }),
  examplePayload: removeSharedLinkFromFileExamplePayload,
});
