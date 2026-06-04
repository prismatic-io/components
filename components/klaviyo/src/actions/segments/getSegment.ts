import { action } from "@prismatic-io/spectral";
import { getApi } from "../../api";
import { getSegmentInputs as inputs } from "../../inputs/segments";
import type { FieldsSegment } from "../../types/FieldsSegment";
import { getSegmentExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";

export const getSegment = action({
  display: {
    label: "Get Segment",
    description: "Get a segment with the given segment ID.",
  },
  perform: async (context, { connection, segmentId, fieldsSegment }) => {
    const segmentsApi = getApi(connection, KlaviyoApi.Segments);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({ connection, segmentId, fieldsSegment, debug });
    }

    const { body } = await segmentsApi.getSegment(segmentId!, {
      fieldsSegment: fieldsSegment as FieldsSegment[],
    });
    return {
      data: body,
    };
  },
  inputs,
  examplePayload: getSegmentExamplePayload,
});
