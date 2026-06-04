import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { addPersonalContactResponse } from "../../examplePayloads";
import { aoid, connection, personalContact } from "../../inputs";

export const addPersonalContact = action({
  display: {
    label: "Add Personal Contact",
    description: "Adds a worker’s personal contact",
  },
  inputs: {
    aoid,
    personalContact,
    connection,
  },
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
  examplePayload: {
    data: addPersonalContactResponse,
  },
});
