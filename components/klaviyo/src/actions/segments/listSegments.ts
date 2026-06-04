import { action } from "@prismatic-io/spectral";
import { getApi } from "../../api";
import { listSegmentsInputs as inputs } from "../../inputs/segments";
import type { FieldsSegment } from "../../types/FieldsSegment";
import { fetchSegments } from "../../utils";
import { listSegmentsExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";

export const listSegments = action({
  display: {
    label: "List Segments",
    description: "Get all segments in an account.",
  },
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
  examplePayload: listSegmentsExamplePayload,
});
