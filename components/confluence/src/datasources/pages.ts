import { type Element, dataSource } from "@prismatic-io/spectral";
import { connectionInput, spaceId } from "../inputs";
import { createClient } from "../client";
import type { Page } from "../interfaces";
import { paginateResults } from "../util";

export const listPages = dataSource({
  display: {
    label: "List Pages",
    description: "Returns all pages.",
  },
  inputs: {
    connectionInput,
    spaceId: {
      ...spaceId,
      dataSource: undefined,
      comments: "The space ID to list pages from.",
      required: false,
    },
  },
  perform: async (context, { connectionInput, spaceId }) => {
    let result: Element[] = [];
    const NO_ELEMENTS = 0;
    let next = "/pages";
    let nextUrlRegex = /\/pages.*/;
    const client = await createClient(connectionInput, false);

    if (spaceId) {
      next = `/spaces/${spaceId}/pages`;
      nextUrlRegex = /\/spaces.*/;
    }

    const pages = await paginateResults<Page>(client, next, nextUrlRegex);
    if (pages.length > NO_ELEMENTS) {
      result = pages.map<Element>(({ title, id }) => ({
        label: title,
        key: id,
      }));

      return {
        result,
      };
    }

    return { result };
  },
  dataSourceType: "picklist",
});
