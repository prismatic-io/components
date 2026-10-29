import { searchItems as searchItemsEsri } from "@esri/arcgis-rest-portal";
import { action } from "@prismatic-io/spectral";
import { SEARCH_ITEMS_EXAMPLE_PAYLOAD } from "../examplePayloads";
import {
  connection,
  number,
  searchString,
  start,
  stringifyResult,
} from "../inputs";
import { getApiKeyManager } from "../utils";

export const searchItems = action({
  display: {
    label: "Search Items",
    description: "Search items in the portal.",
  },
  perform: async (
    _context,
    { connection, searchString, start, number, stringifyResult },
  ) => {
    const authentication = getApiKeyManager(connection);
    const searchItemsResults = await searchItemsEsri({
      authentication,
      q: searchString,
      start,
      num: number,
    });
    return {
      data: stringifyResult
        ? JSON.stringify(searchItemsResults)
        : (searchItemsResults as unknown),
    };
  },
  inputs: {
    connection,
    searchString,
    start,
    number,
    stringifyResult,
  },
  examplePayload: { data: SEARCH_ITEMS_EXAMPLE_PAYLOAD },
});
