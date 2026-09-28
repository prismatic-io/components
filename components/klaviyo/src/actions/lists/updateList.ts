import { action, outputSchema } from "@prismatic-io/spectral";
import { updateListOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { ListEnum, type ListPartialUpdateQuery } from "klaviyo-api";
import { updateListInputs as inputs } from "../../inputs";
import { updateListExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
export const updateList = action({
  display: {
    label: "Update List",
    description: "Update the name of a list with the given list ID.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, listId, listName }) => {
    const listsApi = getApi(connection, KlaviyoApi.Lists);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({ connection, listId, listName, debug });
    }
    const list: ListPartialUpdateQuery = {
      data: {
        type: ListEnum.List,
        attributes: {
          name: listName,
        },
        id: listId,
      },
    };
    const { body } = await listsApi.updateList(listId, list);
    return {
      data: body,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateListOutputSchema,
  }),
  examplePayload: updateListExamplePayload,
});
