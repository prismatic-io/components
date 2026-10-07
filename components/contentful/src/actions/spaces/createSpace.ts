import { action, outputSchema } from "@prismatic-io/spectral";
import type { SpaceProps } from "contentful-management";
import { createClient } from "../../client";
import { createSpaceExamplePayload } from "../../examplePayloads";
import { createSpaceInputs } from "../../inputs";
import { createSpaceOutputSchema } from "../../outputSchemas";
export const createSpace = action({
  display: {
    label: "Create Space",
    description: "Creates a new space.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, organizationId, name, defaultLocale },
  ) => {
    const client = createClient(connection, context);
    const data: SpaceProps = (
      await client.createSpace(
        {
          name,
          defaultLocale,
        },
        organizationId,
      )
    ).toPlainObject();
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => createSpaceExamplePayload,
  inputs: createSpaceInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createSpaceOutputSchema,
  }),
  examplePayload: createSpaceExamplePayload,
});
