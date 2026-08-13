import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { ENDPOINTS } from "../constants";
import { selectDetectedAppExamplePayload } from "../examplePayloads";
import { selectDetectedAppInputs } from "../inputs";
import type { SelectableResource } from "../types";
export const selectDetectedApp = dataSource({
  display: {
    label: "Select Detected App",
    description: "Select a detected app from the list of detected apps.",
  },
  inputs: selectDetectedAppInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const {
      data: { value },
    } = await client.get(ENDPOINTS.DETECTED_APPS);
    return value.map((detectedApp: SelectableResource) => {
      return {
        label: detectedApp.displayName,
        key: detectedApp.id,
      };
    });
  },
  dataSourceType: "picklist",
  examplePayload: selectDetectedAppExamplePayload,
});
