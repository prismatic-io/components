import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCustomFieldMetaResponse } from "../../examplePayloads";
import { $filter, connection, customFieldTypes } from "../../inputs";

export const getCustomFieldMeta = action({
  display: {
    label: "Get Custom Field Meta",
    description: "Retrieve a custom field meta",
  },
  inputs: {
    customFieldTypes,
    $filter,
    connection,
  },
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
  examplePayload: {
    data: getCustomFieldMetaResponse,
  },
});
