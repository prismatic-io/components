import { action } from "@prismatic-io/spectral";
import type { Environment } from "contentful-management";
import { createClient } from "../../client";
import { deleteEnvironmentInputs } from "../../inputs";
import { getEnvironment } from "../../util";

export const deleteEnvironment = action({
  display: {
    label: "Delete Environment",
    description: "Deletes an existing environment.",
  },
  perform: async (context, { connection, spaceId, environmentId }) => {
    const client = createClient(connection, context);
    const environment: Environment = await getEnvironment(
      client,
      spaceId,
      environmentId,
    );
    await environment.delete();
    return {
      data: {},
    };
  },
  inputs: deleteEnvironmentInputs,
  examplePayload: { data: {} },
});
