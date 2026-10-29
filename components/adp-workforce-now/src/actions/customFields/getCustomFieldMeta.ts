import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCustomFieldMetaExamplePayload } from "../../examplePayloads";
import { getCustomFieldMetaInputs } from "../../inputs";

export const getCustomFieldMeta = action({
  display: {
    label: "Get Custom Field Meta",
    description: "Retrieve a custom field meta",
  },
  inputs: getCustomFieldMetaInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, $filter, customFieldTypes }) => {
    const axiosClient = await createClient(
      context,
      connection,
      context.debug.enabled,
    );
    const { data } = await axiosClient.get(
      `/events/hr/v1/worker.person.custom-field.${customFieldTypes}.change`,
      {
        params: {
          $filter,
        },
      },
    );
    return { data };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    getCustomFieldMetaExamplePayload,
  examplePayload: getCustomFieldMetaExamplePayload,
});
