import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { DATA_EXTENSIONS_PATH } from "../../constants";
import { listDataExtensionsExamplePayload } from "../../examplePayloads";
import { listDataExtensionsInputs } from "../../inputs";
import { paginateResults } from "../../util/pagination";

export const listDataExtensions = action({
  examplePayload: listDataExtensionsExamplePayload,
  display: {
    label: "List Data Extensions",
    description:
      "Retrieve a list of data extensions that match a search string, with optional pagination.",
  },
  inputs: listDataExtensionsInputs,
  perform: async (
    context,
    { connection, searchString, fetchAll, pageSize, page },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const params = {
      $search: searchString,
      $pageSize: pageSize,
      $page: page,
    };

    const data = await paginateResults(
      client,
      DATA_EXTENSIONS_PATH,
      fetchAll,
      params,
    );

    return { data };
  },
});
