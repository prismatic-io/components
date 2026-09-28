import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteListOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { deleteListInputs as inputs } from "../../inputs";
import { deleteListExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
export const deleteList = action({
  display: {
    label: "Delete List",
    description: "Delete a list with the given list ID.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, listId }) => {
    const listsApi = getApi(connection, KlaviyoApi.Lists);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({ connection, listId, debug });
    }
    await listsApi.deleteList(listId);
    return {
      data: "List deleted successfully.",
    };
  },
  inputs,
  examplePayload: deleteListExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteListOutputSchema,
  }),
});
