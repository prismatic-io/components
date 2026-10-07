import { action, outputSchema } from "@prismatic-io/spectral";
import type { EnvironmentProps, Space } from "contentful-management";
import { createClient } from "../../client";
import { createEnvironmentExamplePayload } from "../../examplePayloads";
import { createEnvironmentInputs } from "../../inputs";
import { createEnvironmentOutputSchema } from "../../outputSchemas";
export const createEnvironment = action({
  display: {
    label: "Create Environment",
    description: "Creates a new environment.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, spaceId, environmentId, name }) => {
    const client = createClient(connection, context);
    const space: Space = await client.getSpace(spaceId);
    const data: EnvironmentProps = (
      await space.createEnvironmentWithId(environmentId, {
        name,
      })
    ).toPlainObject();
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => createEnvironmentExamplePayload,
  inputs: createEnvironmentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createEnvironmentOutputSchema,
  }),
  examplePayload: createEnvironmentExamplePayload,
});
