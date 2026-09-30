import { type Element, dataSource } from "@prismatic-io/spectral";
import { selectSpacesInputs } from "../inputs";
import { createClient } from "../client";
import type { Space } from "../types";
import { paginateResults } from "../util";
export const listSpaces = dataSource({
  display: {
    label: "List Spaces",
    description: "Returns all spaces.",
  },
  inputs: selectSpacesInputs,
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
