import { action, outputSchema } from "@prismatic-io/spectral";
import { importSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { getAnImportExamplePayload } from "../../examplePayloads";
import { getAnImportInputs } from "../../inputs";
import { hubspotPaths } from "../../constants";
export const getAnImport = action({
  display: {
    label: "Get Import",
    description:
      "Get a complete summary of an import record, including any updates.",
  },
  performSafety: "safe",
  perform: async (context, { timeout, hubspotConnection, importId }) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });
    const { data } = await client.get(hubspotPaths.imports(`/${importId}`));
    return { data };
  },
  inputs: getAnImportInputs,
  examplePayload: getAnImportExamplePayload,
  outputSchema: outputSchema({ type: "actionOutput", schema: importSchema }),
});
