import { action } from "@prismatic-io/spectral";
import { getApi } from "../../api";
import { deleteSegmentInputs as inputs } from "../../inputs/segments";
import { KlaviyoApi } from "../../enums/KlaviyoApi";

export const deleteSegment = action({
  display: {
    label: "Delete Segment",
    description: "Delete a segment with the given segment ID.",
  },
  perform: async (context, { connection, segmentId }) => {
    const segmentsApi = getApi(connection, KlaviyoApi.Segments);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({ connection, segmentId, debug });
    }
    await segmentsApi.deleteSegment(segmentId!);
    return {
      data: "Segment deleted successfully.",
    };
  },
  inputs,
});
