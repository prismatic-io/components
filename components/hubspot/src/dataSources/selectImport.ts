import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { hubspotPaths } from "../constants";
import { selectImportExamplePayload } from "../examplePayloads";
import { selectImportInputs } from "../inputs";
import { getAllPaginatedData } from "../util";
export const selectImport = dataSource({
  display: {
    label: "Select Import",
    description: "Select an import from the list of active imports.",
  },
  inputs: selectImportInputs,
  perform: async (_context, { connection }) => {
    const client = getHubspotClient({
      hubspotConnection: connection,
      debugRequest: false,
    });
    const imports = await getAllPaginatedData(
      client,
      hubspotPaths.imports(),
      true,
      true,
      {},
    );
    const result = (imports as Record<string, unknown>[]).map<Element>(
      (item) => ({
        label: `Import ${util.types.toString(item.id)}`,
        key: util.types.toString(item.id),
      }),
    );
    return { result };
  },
  examplePayload: selectImportExamplePayload,
  dataSourceType: "picklist",
});
