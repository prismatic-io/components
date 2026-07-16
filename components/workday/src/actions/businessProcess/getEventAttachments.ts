import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getEventAttachmentsExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util/pagination";
import { getEventAttachmentsInputs } from "../../inputs";
export const getEventAttachments = action({
  display: {
    label: "Get Event Attachments",
    description:
      "Retrieves attachments on the specified business process event that the processing user has permission to view.",
  },
  perform: async (
    context,
    { connection, eventId, fetchAll, pagination = {} },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.businessProcess}/events/${eventId}/attachments`,
      fetchAll,
      limit: pagination.limit,
      offset: pagination.offset,
    });
  },
  inputs: getEventAttachmentsInputs,
  examplePayload: getEventAttachmentsExamplePayload,
});
