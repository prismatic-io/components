import { dataSource } from "@prismatic-io/spectral";
import { connection } from "../inputs/general";
import { createClient } from "../client";
import { selectDetectedAppExamplePayload } from "../examplePayloads";

export const selectDetectedApp = dataSource({
  display: {
    label: "Select Detected App",
    description: "Select a detected app from the list of detected apps",
  },
  inputs: {
    connection,
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, false);
    const {
      data: { value },
    } = await client.get("/deviceManagement/detectedApps");

    return value.map((detectedApp: { id: string; displayName: string }) => {
      return {
        label: detectedApp.displayName,
        key: detectedApp.id,
      };
    });
  },
  dataSourceType: "picklist",
  examplePayload: { result: selectDetectedAppExamplePayload },
});
