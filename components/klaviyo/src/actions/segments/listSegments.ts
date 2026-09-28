import { action, outputSchema } from "@prismatic-io/spectral";
import { listSegmentsOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { listSegmentsInputs as inputs } from "../../inputs";
import { fetchSegments } from "../../util";
import { listSegmentsExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
import type { FieldsSegment } from "../../types";
export const listSegments = action({
  display: {
    label: "List Segments",
    description: "Get all segments in an account.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, fieldsSegment }) => {
    const segmentsApi = getApi(connection, KlaviyoApi.Segments);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({ connection, fieldsSegment, debug });
    }
    const data = await fetchSegments(
      segmentsApi,
      fieldsSegment as FieldsSegment[],
      [],
      undefined,
    );
    return {
      data,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSegmentsOutputSchema,
  }),
  examplePayload: listSegmentsExamplePayload,
});
