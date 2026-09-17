import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listDrivesInputs } from "../../inputs";
import { fetchDrives } from "../../util/pagination";
import { listDrivesExamplePayload } from "../../examplePayloads";
export const listDrives = action({
  display: {
    label: "List Drives",
    description: "List all drives",
  },
  inputs: listDrivesInputs,
  performSafety: "notAllowed",
  perform: async (_context, params) => {
    const client = createClient(params.connection);
    const { drives } = await fetchDrives({
      drive: client,
      initialParams: {},
      fetchAll: true,
    });
    return { data: drives };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listDrivesExamplePayload,
  examplePayload: listDrivesExamplePayload,
});
