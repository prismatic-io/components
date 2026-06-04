import { action } from "@prismatic-io/spectral";
import { createProjectsClient } from "../../client";
import { connection, guId, resourceId } from "../../inputs";

export const getProjectResources = action({
  display: {
    label: "Get Project Resource",
    description: "Get the information and metadata of an existing Project Resource by Id",
  },
  perform: async (context, params) => {
    const client = createProjectsClient(
      {
        connection: params.connection,
      },
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/Projects('${params.guId}')/ProjectResources('${params.resourceId}')`,
    );

    return {
      data,
    };
  },
  inputs: { connection, guId, resourceId },
});

export default getProjectResources;
