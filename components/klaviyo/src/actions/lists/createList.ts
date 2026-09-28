import { action, outputSchema } from "@prismatic-io/spectral";
import { createListOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { type ListCreateQuery, ListEnum } from "klaviyo-api";
import { createListInputs as inputs } from "../../inputs";
import { createListExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
export const createList = action({
  display: {
    label: "Create List",
    description: "Create a new list.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, listName }) => {
    const listsApi = getApi(connection, KlaviyoApi.Lists);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({ connection, listName, debug });
    }
    const list: ListCreateQuery = {
      data: {
        type: ListEnum.List,
        attributes: {
          name: listName,
        },
      },
    };
    const { body } = await listsApi.createList(list);
    return {
      data: body,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createListOutputSchema,
  }),
  examplePayload: createListExamplePayload,
});
