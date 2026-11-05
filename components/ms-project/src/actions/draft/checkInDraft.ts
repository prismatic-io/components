import { action } from "@prismatic-io/spectral";
import { createProjectsClient } from "../../client";
import { connection, guId } from "../../inputs";

export const checkInDraftProject = action({
  display: {
    label: "Check In Draft Project",
    description: "Mark the status of an existing project to 'Checked In'",
  },
  perform: async (context, params) => {
    const client = createProjectsClient(
      {
        connection: params.connection,
      },
      context.debug.enabled,
    );
    const { data } = await client.post(`/Projects('${params.guId}')/Draft/checkIn()`);

    return {
      data,
    };
  },
  inputs: { connection, guId },
});

export default checkInDraftProject;
