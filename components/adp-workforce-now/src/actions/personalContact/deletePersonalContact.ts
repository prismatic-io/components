import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deletePersonalContactExamplePayload } from "../../examplePayloads";
import { deletePersonalContactInputs } from "../../inputs";
import { deletePersonalContactOutputSchema } from "../../outputSchemas";
export const deletePersonalContact = action({
  display: {
    label: "Delete Personal Contact",
    description: "Removes a worker’s personal contact.",
  },
  inputs: deletePersonalContactInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, aoid, personalContactId }) => {
    const axiosClient = await createClient(
      context,
      connection,
      context.debug.enabled,
    );
    const { data } = await axiosClient.post(
      "/events/hr/v1/worker.personal-contact.remove",
      {
        events: [
          {
            data: {
              eventContext: {
                worker: {
                  associateOID: aoid,
                },
                personalContact: {
                  itemID: personalContactId,
                },
              },
            },
          },
        ],
      },
    );
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => deletePersonalContactExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deletePersonalContactOutputSchema,
  }),
  examplePayload: deletePersonalContactExamplePayload,
});
