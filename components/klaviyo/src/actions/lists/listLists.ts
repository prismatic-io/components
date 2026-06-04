import { action } from "@prismatic-io/spectral";
import { getApi } from "../../api";
import { listListsInputs as inputs } from "../../inputs/lists";
import type { FieldsList } from "../../types/FieldsList";
import { fetchLists } from "../../utils";
import { listListsExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";

export const listLists = action({
  display: {
    label: "List Lists",
    description: "Get all lists in an account.",
  },
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
  examplePayload: listListsExamplePayload,
});
