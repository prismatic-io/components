import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deletePersonaContactResponse } from "../../examplePayloads";
import { aoid, connection, personalContactId } from "../../inputs";

export const deletePersonalContact = action({
  display: {
    label: "Delete Personal Contact",
    description: "Removes a worker’s personal contact.",
  },
  inputs: {
    aoid,
    personalContactId,
    connection,
  },
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
  examplePayload: {
    data: deletePersonaContactResponse,
  },
});
