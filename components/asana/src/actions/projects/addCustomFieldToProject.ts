import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { addCustomFieldToProjectExamplePayload } from "../../examplePayloads";
import { addCustomFieldToProjectInputs } from "../../inputs";
export const addCustomFieldToProject = action({
  display: {
    label: "Add Custom Field to Project",
    description: "Add a new custom field to an existing project.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(
      `/projects/${params.projectId}/addCustomFieldSetting`,
      {
        data: {
          custom_field: params.fieldId,
          insert_after: params.insertAfter,
          insert_before: params.insertBefore,
          is_important: params.isImportant,
        },
      },
    );
    return { data };
  },
  inputs: addCustomFieldToProjectInputs,
  examplePayload: addCustomFieldToProjectExamplePayload,
});
