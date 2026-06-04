import { action } from "@prismatic-io/spectral";
import { getApi } from "../../api";
import { getListInputs as inputs } from "../../inputs/lists";
import type { FieldsList } from "../../types/FieldsList";
import { getListExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";

export const getList = action({
  display: {
    label: "Get List",
    description: "Get a list with the given list ID.",
  },
  perform: async (context, { connection, listId, fieldsList }) => {
    const listsApi = getApi(connection, KlaviyoApi.Lists);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({ connection, listId, fieldsList, debug });
    }

    const { body } = await listsApi.getList(listId!, {
      fieldsList: fieldsList as FieldsList[],
    });
    return {
      data: body,
    };
  },
  inputs,
  examplePayload: getListExamplePayload,
});
