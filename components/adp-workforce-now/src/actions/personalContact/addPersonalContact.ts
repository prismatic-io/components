import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { addPersonalContactExamplePayload } from "../../examplePayloads";
import { addPersonalContactInputs } from "../../inputs";
import { addPersonalContactOutputSchema } from "../../outputSchemas";

export const addPersonalContact = action({
  display: {
    label: "Add Personal Contact",
    description: "Adds a worker’s personal contact",
  },
  inputs: addPersonalContactInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, aoid, personalContact }) => {
    const axiosClient = await createClient(
      context,
      connection,
      context.debug.enabled,
    );
    const { data } = await axiosClient.post(
      "/events/hr/v1/worker.personal-contact.add",
      {
        events: [
          {
            data: {
              eventContext: {
                worker: {
                  associateOID: aoid,
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
    addPersonalContactExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: addPersonalContactOutputSchema,
  }),
  examplePayload: addPersonalContactExamplePayload,
});
