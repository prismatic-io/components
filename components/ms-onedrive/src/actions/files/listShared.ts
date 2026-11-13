import { action, outputSchema } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { handleErrors } from "../../errors";
import { listSharedExamplePayload } from "../../examplePayloads";
import { listSharedInputs } from "../../inputs";
import { listSharedOutputSchema } from "../../outputSchemas";

export const listShared = action({
  display: {
    label: "List Shared",
    description: "Lists shared items in SharePoint or OneDrive.",
  },
  inputs: listSharedInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);

    return {
      data: await handleErrors(client.get("/me/insights/shared")),
    };
  },
  examplePerform: async () => listSharedExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSharedOutputSchema,
  }),
  examplePayload: listSharedExamplePayload,
});

export default listShared;
