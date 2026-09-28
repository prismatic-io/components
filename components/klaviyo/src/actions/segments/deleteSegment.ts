import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteSegmentOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { deleteSegmentInputs as inputs } from "../../inputs";
import { deleteSegmentExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
export const deleteSegment = action({
  display: {
    label: "Delete Segment",
    description: "Delete a segment with the given segment ID.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, segmentId }) => {
    const segmentsApi = getApi(connection, KlaviyoApi.Segments);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({ connection, segmentId, debug });
    }
    await segmentsApi.deleteSegment(segmentId);
    return {
      data: "Segment deleted successfully.",
    };
  },
  inputs,
  examplePayload: deleteSegmentExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteSegmentOutputSchema,
  }),
});
