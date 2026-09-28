import { action, outputSchema } from "@prismatic-io/spectral";
import { updateSegmentOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { updateSegmentInputs as inputs } from "../../inputs";
import {
  type ConditionGroup,
  SegmentEnum,
  type SegmentPartialUpdateQuery,
} from "klaviyo-api";
import { updateSegmentExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
export const updateSegment = action({
  display: {
    label: "Update Segment",
    description: "Update a segment with the given segment ID.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      segmentId,
      segmentName,
      segmentConditionGroups,
      isStarredSegmentOptional,
    },
  ) => {
    const segmentsApi = getApi(connection, KlaviyoApi.Segments);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({
        connection,
        segmentId,
        segmentName,
        segmentConditionGroups,
        isStarredSegmentOptional,
        debug,
      });
    }
    const segment: SegmentPartialUpdateQuery = {
      data: {
        type: SegmentEnum.Segment,
        attributes: {
          name: segmentName,
          definition: segmentConditionGroups
            ? {
                conditionGroups: segmentConditionGroups as ConditionGroup[],
              }
            : undefined,
          isStarred: isStarredSegmentOptional,
        },
        id: segmentId,
      },
    };
    const { body } = await segmentsApi.updateSegment(segmentId, segment);
    return {
      data: body,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateSegmentOutputSchema,
  }),
  examplePayload: updateSegmentExamplePayload,
});
