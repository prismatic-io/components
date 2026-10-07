import { action, outputSchema } from "@prismatic-io/spectral";
import type { Environment, EnvironmentProps } from "contentful-management";
import { createClient } from "../../client";
import { updateEnvironmentExamplePayload } from "../../examplePayloads";
import { updateEnvironmentInputs } from "../../inputs";
import { updateEnvironmentOutputSchema } from "../../outputSchemas";
import { getEnvironment } from "../../util";
export const updateEnvironment = action({
  display: {
    label: "Update Environment",
    description: "Updates an existing environment.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, spaceId, environmentId, name }) => {
    const client = createClient(connection, context);
    const environment: Environment = await getEnvironment(
      client,
      spaceId,
      environmentId,
    );
    environment.name = name;
    const data: EnvironmentProps = (await environment.update()).toPlainObject();
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => updateEnvironmentExamplePayload,
  inputs: updateEnvironmentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateEnvironmentOutputSchema,
  }),
  examplePayload: updateEnvironmentExamplePayload,
});
