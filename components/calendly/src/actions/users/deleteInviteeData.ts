import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteInviteeDataOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { deleteInviteeDataInputs } from "../../inputs";
import { deleteInviteeDataExamplePayload } from "../../examplePayloads";
export const deleteInviteeData = action({
  display: {
    label: "Delete Invitee Data",
    description:
      "Submits a request to remove invitee data from all previously booked events in the organization.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, emails }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const { data } = await client.post("/data_compliance/deletion/invitees", {
      emails,
    });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: deleteInviteeDataExamplePayload.data,
  }),
  inputs: deleteInviteeDataInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteInviteeDataOutputSchema,
  }),
  examplePayload: deleteInviteeDataExamplePayload,
});
