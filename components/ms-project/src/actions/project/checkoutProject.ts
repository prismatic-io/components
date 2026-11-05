import { action } from "@prismatic-io/spectral";
import { createProjectsClient } from "../../client";
import { connection, guId } from "../../inputs";

export const checkoutProject = action({
  display: {
    label: "Checkout Project",
    description: "Mark an existing project's status as 'Checked Out'",
  },
  perform: async (context, params) => {
    const client = createProjectsClient(
      {
        connection: params.connection,
      },
      context.debug.enabled,
    );
    const { data } = await client.post(`/Projects('${params.guId}')/checkOut()`);

    return {
      data,
    };
  },
  inputs: { connection, guId },
});

export default checkoutProject;
