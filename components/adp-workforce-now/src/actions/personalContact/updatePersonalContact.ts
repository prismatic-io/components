import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updatePersonalContactExamplePayload } from "../../examplePayloads";
import { updatePersonalContactInputs } from "../../inputs";
import { updatePersonalContactOutputSchema } from "../../outputSchemas";

export const updatePersonalContact = action({
  display: {
    label: "Update Personal Contact",
    description: "Updates an existing worker’s personal contact",
  },
  inputs: updatePersonalContactInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, aoid, personalContact, personalContactId },
  ) => {
    const axiosClient = await createClient(
      context,
      connection,
      context.debug.enabled,
    );
    const { data } = await axiosClient.post(
      "/events/hr/v1/worker.personal-contact.change",
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
              transform: {
                personalContact,
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
  examplePerform: async (): Promise<{ data: unknown }> =>
    updatePersonalContactExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updatePersonalContactOutputSchema,
  }),
  examplePayload: updatePersonalContactExamplePayload,
});
