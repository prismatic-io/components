import { action, outputSchema } from "@prismatic-io/spectral";
import { listListsOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { listListsInputs as inputs } from "../../inputs";
import { fetchLists } from "../../util";
import { listListsExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
import type { FieldsList } from "../../types";
export const listLists = action({
  display: {
    label: "List Lists",
    description: "Get all lists in an account.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, fieldsList }) => {
    const listsApi = getApi(connection, KlaviyoApi.Lists);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({ connection, fieldsList, debug });
    }
    const data = await fetchLists(
      listsApi,
      fieldsList as FieldsList[],
      [],
      undefined,
    );
    return {
      data,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listListsOutputSchema,
  }),
  examplePayload: listListsExamplePayload,
});
