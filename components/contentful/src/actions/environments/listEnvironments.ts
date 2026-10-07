import { action, outputSchema } from "@prismatic-io/spectral";
import type {
  Environment,
  EnvironmentProps,
  Space,
} from "contentful-management";
import { createClient } from "../../client";
import { listEnvironmentsExamplePayload } from "../../examplePayloads";
import { listEnvironmentsInputs } from "../../inputs";
import { listEnvironmentsOutputSchema } from "../../outputSchemas";
import { getAllPaginatedItems } from "../../util";
export const listEnvironments = action({
  display: {
    label: "List Environments",
    description: "Retrieves all environments in a space.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, spaceId }) => {
    const client = createClient(connection, context);
    const space: Space = await client.getSpace(spaceId);
    const allItems: EnvironmentProps[] = await getAllPaginatedItems<
      Environment,
      EnvironmentProps
    >(space.getEnvironments.bind(space));
    return {
      data: allItems,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listEnvironmentsExamplePayload,
  inputs: listEnvironmentsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listEnvironmentsOutputSchema,
  }),
  examplePayload: listEnvironmentsExamplePayload,
});
