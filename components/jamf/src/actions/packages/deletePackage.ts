import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deletePackageExamplePayload } from "../../examplePayloads";
import { deletePackageInputs } from "../../inputs";

export const deletePackage = action({
  display: {
    label: "Delete Package",
    description: "Delete a package record by ID.",
  },
  inputs: deletePackageInputs,
  perform: async (context, { connection, resourceId }) => {
    const client = await createClient(connection, context.debug.enabled);
    await client.delete(`/v1/packages/${resourceId}`);
    return { data: `Successfully deleted package ${resourceId}` };
  },
  examplePayload: deletePackageExamplePayload,
});
