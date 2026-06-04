import { action } from "@prismatic-io/spectral";
import { getApi } from "../../api";
import { deleteListInputs as inputs } from "../../inputs/lists";
import { KlaviyoApi } from "../../enums/KlaviyoApi";

export const deleteList = action({
  display: {
    label: "Delete List",
    description: "Delete a list with the given list ID.",
  },
  perform: async (context, { connection, listId }) => {
    const listsApi = getApi(connection, KlaviyoApi.Lists);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({ connection, listId, debug });
    }

    await listsApi.deleteList(listId!);
    return {
      data: "List deleted successfully.",
    };
  },
  inputs,
});
