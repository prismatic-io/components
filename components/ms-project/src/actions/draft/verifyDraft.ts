import { action } from "@prismatic-io/spectral";
import { createProjectsClient } from "../../client";
import { connection, guId } from "../../inputs";

export const verifyDraft = action({
  display: {
    label: "Verify Draft",
    description: "Verify the draft of an existing project",
  },
  perform: async (context, params) => {
    const client = createProjectsClient(
      {
        connection: params.connection,
      },
      context.debug.enabled,
    );
    const { data } = await client.post(`/Projects('${params.guId}')/Draft/validate()`);

    return {
      data,
    };
  },
  inputs: { connection, guId },
});

export default verifyDraft;
