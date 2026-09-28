import { action, outputSchema } from "@prismatic-io/spectral";
import { getSegmentOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { getSegmentInputs as inputs } from "../../inputs";
import { getSegmentExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
import type { FieldsSegment } from "../../types";
export const getSegment = action({
  display: {
    label: "Get Segment",
    description: "Get a segment with the given segment ID.",
  },
  performSafety: "safe",
  perform: async (context, { connection, segmentId, fieldsSegment }) => {
    const segmentsApi = getApi(connection, KlaviyoApi.Segments);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({ connection, segmentId, fieldsSegment, debug });
    }
    const { body } = await segmentsApi.getSegment(segmentId, {
      fieldsSegment: fieldsSegment as FieldsSegment[],
    });
    return {
      data: body,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: getSegmentExamplePayload.data,
  }),
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getSegmentOutputSchema,
  }),
  examplePayload: getSegmentExamplePayload,
});
