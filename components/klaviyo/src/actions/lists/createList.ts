import { action } from "@prismatic-io/spectral";
import { getApi } from "../../api";
import { type ListCreateQuery, ListEnum } from "klaviyo-api";
import { createListInputs as inputs } from "../../inputs/lists";
import { createListExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";

export const createList = action({
  display: {
    label: "Create List",
    description: "Create a new list.",
  },
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
          name: listName!,
        },
      },
    };
    const { body } = await listsApi.createList(list);
    return {
      data: body,
    };
  },
  inputs,
  examplePayload: createListExamplePayload,
});
