import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { getProjectExamplePayload } from "../../examplePayloads";
import { getProjectInputs } from "../../inputs";
export const getProject = action({
  display: {
    label: "Get Project",
    description: "Get the information and metadata of a project by ID.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/projects/${params.projectId}`, {
      params: {
        opt_fields: params.optFields,
      },
    });
    return { data };
  },
  inputs: getProjectInputs,
  examplePayload: getProjectExamplePayload,
});
