import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { addPersonalContactResponse } from "../../examplePayloads";
import {
  aoid,
  connection,
  personalContact,
  personalContactId,
} from "../../inputs";

export const updatePersonalContact = action({
  display: {
    label: "Update Personal Contact",
    description: "Updates an existing worker’s personal contact",
  },
  inputs: {
    aoid,
    personalContactId,
    personalContact,
    connection,
  },
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
  examplePayload: {
    data: addPersonalContactResponse,
  },
});
