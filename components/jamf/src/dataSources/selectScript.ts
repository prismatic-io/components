import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectScriptExamplePayload } from "../examplePayloads";
import { selectScriptInputs } from "../inputs";
import type { Script } from "../types";
import { mapToSortedElements, paginateResults } from "../util";

export const selectScript = dataSource({
  display: {
    label: "Select Script",
    description:
      "Dynamically fetch a list of scripts from Jamf Pro for use in a dropdown.",
  },
  dataSourceType: "picklist",
  inputs: selectScriptInputs,
  perform: async (_context, { connection }) => {
    const client = await createClient(connection, false);
    const { results } = await paginateResults<Script>(
      client,
      "/v1/scripts",
      true,
      {},
    );
    const result: Element[] = mapToSortedElements(results, "id", "name");
    return { result };
  },
  examplePayload: selectScriptExamplePayload,
});
