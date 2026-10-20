import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPersonalContactExamplePayload } from "../../examplePayloads";
import { getPersonalContactInputs } from "../../inputs";
import { getPersonalContactOutputSchema } from "../../outputSchemas";
export const getPersonalContact = action({
  display: {
    label: "Get Personal Contact",
    description: "Returns a personal contact",
  },
  inputs: getPersonalContactInputs,
  performSafety: "safe",
  perform: async (
    context,
    { connection, $select, aoid, personalContactId },
  ) => {
    const axiosClient = await createClient(
      context,
      connection,
      context.debug.enabled,
    );
    const { data } = await axiosClient.get(
      `/hr/v2/associates/${aoid}/personal-contacts/${personalContactId}`,
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
    schema: getPersonalContactOutputSchema,
  }),
  examplePayload: getPersonalContactExamplePayload,
});
