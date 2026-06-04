import { type Element, dataSource, util } from "@prismatic-io/spectral";
import { connectionInput } from "../inputs";
import { createClient } from "../client";
import type { Space } from "../interfaces";
import { paginateResults } from "../util";

export const listSpaces = dataSource({
  display: {
    label: "List Spaces",
    description: "Returns all spaces.",
  },
  inputs: {
    connectionInput,
    sortByName: {
      label: "Sort by Name",
      comments: "Sort the spaces by name.",
      type: "boolean",
      default: "false",
      clean: (value) => util.types.toBool(value),
    },
  },
  perform: async (context, { connectionInput, sortByName }) => {
    let result: Element[] = [];
    const NO_ELEMENTS = 0;
    const baseUrl = "/spaces";
    const url = sortByName ? `${baseUrl}?sort=name` : baseUrl;
    const nextUrlRegex = /\/spaces.*/;
    const client = await createClient(connectionInput, false);
    const spaces = await paginateResults<Space>(client, url, nextUrlRegex);

    if (spaces.length > NO_ELEMENTS) {
      result = spaces.map<Element>(({ name, id }) => ({
        label: name,
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
