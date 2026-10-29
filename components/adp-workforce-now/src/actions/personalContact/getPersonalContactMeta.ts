import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPersonalContactMetaExamplePayload } from "../../examplePayloads";
import { getPersonalContactMetaInputs } from "../../inputs";
import { getPersonalContactMetaOutputSchema } from "../../outputSchemas";

export const getPersonalContactMeta = action({
  display: {
    label: "Get Personal Contact Meta",
    description: "Returns a personal contact metadata",
  },
  inputs: getPersonalContactMetaInputs,
  performSafety: "safe",
  perform: async (context, { connection, $select, aoid }) => {
    const axiosClient = await createClient(
      context,
      connection,
      context.debug.enabled,
    );
    const { data } = await axiosClient.get(
      `/hr/v2/associates/${aoid}/personal-contacts/meta`,
      {
        params: {
          $select,
        },
      },
    );
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPersonalContactMetaOutputSchema,
  }),
  examplePayload: getPersonalContactMetaExamplePayload,
});
