import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listPersonalContactsExamplePayload } from "../../examplePayloads";
import { listPersonalContactsInputs } from "../../inputs";
import { listPersonalContactsOutputSchema } from "../../outputSchemas";

export const listPersonalContacts = action({
  display: {
    label: "List Personal Contacts",
    description: "Returns a list of a worker’s personal contacts.",
  },
  inputs: listPersonalContactsInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, $select, aoid }) => {
    const axiosClient = await createClient(
      context,
      connection,
      context.debug.enabled,
    );
    const { data } = await axiosClient.get(
      `/hr/v2/associates/${aoid}/personal-contacts`,
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
  examplePerform: async (): Promise<{ data: unknown }> =>
    listPersonalContactsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listPersonalContactsOutputSchema,
  }),
  examplePayload: listPersonalContactsExamplePayload,
});
