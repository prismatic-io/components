import { action, outputSchema } from "@prismatic-io/spectral";
import type { Environment } from "contentful-management";
import { createClient } from "../../client";
import { deleteEnvironmentExamplePayload } from "../../examplePayloads";
import { deleteEnvironmentInputs } from "../../inputs";
import { deleteEnvironmentOutputSchema } from "../../outputSchemas";
import { getEnvironment } from "../../util";
export const deleteEnvironment = action({
  display: {
    label: "Delete Environment",
    description: "Deletes an existing environment.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, spaceId, environmentId }) => {
    const client = createClient(connection, context);
    const environment: Environment = await getEnvironment(
      client,
      spaceId,
      environmentId,
    );
    await environment.delete();
    return {
      data: {},
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => deleteEnvironmentExamplePayload,
  inputs: deleteEnvironmentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteEnvironmentOutputSchema,
  }),
  examplePayload: deleteEnvironmentExamplePayload,
});
