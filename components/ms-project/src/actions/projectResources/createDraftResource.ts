import { action } from "@prismatic-io/spectral";
import { createProjectsClient } from "../../client";
import { account, connection, email, guId, notes, resourceName } from "../../inputs";

export const createDraftProjectResources = action({
  display: {
    label: "Create Draft Project Resources",
    description: "Create a new Resource in an existing draft project",
  },
  perform: async (context, params) => {
    const client = createProjectsClient(
      {
        connection: params.connection,
      },
      context.debug.enabled,
    );
    const { data } = await client.post(`/Projects('${params.guId}')/Draft/ProjectResources/add()`, {
      parameters: {
        Name: params.resourceName || undefined,
        Account: params.account || undefined,
        Email: params.email || undefined,
        Notes: params.notes || undefined,
      },
    });

    return {
      data,
    };
  },
  inputs: { connection, guId, notes, email, account, resourceName },
});

export default createDraftProjectResources;
