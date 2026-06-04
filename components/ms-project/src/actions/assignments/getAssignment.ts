import { action } from "@prismatic-io/spectral";
import { createProjectsClient } from "../../client";
import { connection, guId } from "../../inputs";

export const getAssignments = action({
  display: {
    label: "Get Assignment",
    description: "Get the information and metadata of an assignment by Id",
  },
  perform: async (context, params) => {
    const client = createProjectsClient(
      {
        connection: params.connection,
      },
      context.debug.enabled,
    );
    const { data } = await client.get(`/Projects('${params.guId}')/Assignments`);

    return {
      data,
    };
  },
  inputs: { connection, guId },
});

export default getAssignments;
