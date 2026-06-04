import { action } from "@prismatic-io/spectral";
import type {
  Environment,
  EnvironmentProps,
  Space,
} from "contentful-management";
import { createClient } from "../../client";
import { listEnvironmentsExamplePayload } from "../../examplePayloads";
import { listEnvironmentsInputs } from "../../inputs";
import { getAllPaginatedItems } from "../../util";

export const listEnvironments = action({
  display: {
    label: "List Environments",
    description: "Retrieves all environments in a space.",
  },
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
  inputs: listEnvironmentsInputs,
  examplePayload: { data: listEnvironmentsExamplePayload },
});
