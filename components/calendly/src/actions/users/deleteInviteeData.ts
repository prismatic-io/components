import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import { connection, emails } from "../../inputs";
import { deleteInviteeDataExamplePayload } from "../../examplePayloads";

export const deleteInviteeData = action({
  display: {
    label: "Delete Invitee Data",
    description:
      "To submit a request to remove invitee data from all previously booked events in your organization, use this endpoint.",
  },
  perform: async (context, { connection, emails }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);

    const { data } = await client.post("/data_compliance/deletion/invitees", {
      emails,
    });
    return { data };
  },
  inputs: {
    connection,
    emails,
  },
  examplePayload: deleteInviteeDataExamplePayload,
});
