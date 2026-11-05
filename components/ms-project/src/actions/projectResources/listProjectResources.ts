import { action } from "@prismatic-io/spectral";
import { createProjectsClient } from "../../client";
import { connection, guId } from "../../inputs";

export const listProjectResources = action({
  display: {
    label: "list Project Resources",
    description: "List all resources in an existing project",
  },
  perform: async (context, params) => {
    const client = createProjectsClient(
      {
        connection: params.connection,
      },
      context.debug.enabled,
    );
    const { data } = await client.get(`/Projects('${params.guId}')/ProjectResources`);

    return {
      data,
    };
  },
  inputs: { connection, guId },
});

export default listProjectResources;
