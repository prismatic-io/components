import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { createSectionExamplePayload } from "../../examplePayloads";
import { createSectionInputs } from "../../inputs";
export const createSection = action({
  display: {
    label: "Create Section",
    description: "Create a new section within a project.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(
      `/projects/${params.projectId}/sections`,
      {
        data: {
          insert_after: params.insertAfter,
          insert_before: params.insertBefore,
          name: params.sectionName,
        },
      },
      { params: { opt_fields: params.optFields } },
    );
    return { data };
  },
  inputs: createSectionInputs,
  examplePayload: createSectionExamplePayload,
});
