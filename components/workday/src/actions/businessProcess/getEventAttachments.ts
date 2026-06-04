import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getEventAttachmentsExamplePayload } from "../../examplePayloads";
import { getEventAttachmentsInputs } from "../../inputs";

export const getEventAttachments = action({
  display: {
    label: "Get Event Attachments",
    description:
      "Retrieves attachments on the specified business process event that the processing user has permission to view.",
  },
  perform: async (context, { connection, eventId, limit, offset }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${SERVICES.businessProcess}/events/${eventId}/attachments`,
      { params: { limit, offset } },
    );
    return {
      data,
    };
  },
  inputs: getEventAttachmentsInputs,
  examplePayload: getEventAttachmentsExamplePayload,
});
