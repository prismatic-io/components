import { action, outputSchema } from "@prismatic-io/spectral";
import { getListOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { getListInputs as inputs } from "../../inputs";
import { getListExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
import type { FieldsList } from "../../types";
export const getList = action({
  display: {
    label: "Get List",
    description: "Get a list with the given list ID.",
  },
  performSafety: "safe",
  perform: async (context, { connection, listId, fieldsList }) => {
    const listsApi = getApi(connection, KlaviyoApi.Lists);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({ connection, listId, fieldsList, debug });
    }
    const { body } = await listsApi.getList(listId, {
      fieldsList: fieldsList as FieldsList[],
    });
    return {
      data: body,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: getListExamplePayload.data,
  }),
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getListOutputSchema,
  }),
  examplePayload: getListExamplePayload,
});
