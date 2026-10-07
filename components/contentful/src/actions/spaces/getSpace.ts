import { action, outputSchema } from "@prismatic-io/spectral";
import type { SpaceProps } from "contentful-management";
import { createClient } from "../../client";
import { getSpaceExamplePayload } from "../../examplePayloads";
import { getSpaceInputs } from "../../inputs";
import { getSpaceOutputSchema } from "../../outputSchemas";
export const getSpace = action({
  display: {
    label: "Get Space",
    description: "Retrieves a single space by ID.",
  },
  performSafety: "safe",
  perform: async (context, { connection, spaceId }) => {
    const client = createClient(connection, context);
    const data: SpaceProps = (await client.getSpace(spaceId)).toPlainObject();
    return {
      data,
    };
  },
  inputs: getSpaceInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getSpaceOutputSchema,
  }),
  examplePayload: getSpaceExamplePayload,
});
