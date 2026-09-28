import { action, outputSchema } from "@prismatic-io/spectral";
import { createSegmentOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { createSegmentInputs as inputs } from "../../inputs";
import {
  type ConditionGroup,
  type SegmentCreateQuery,
  SegmentEnum,
} from "klaviyo-api";
import { createSegmentExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
export const createSegment = action({
  display: {
    label: "Create Segment",
    description: "Create a segment.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, segmentName, segmentConditionGroups, isStarredSegment },
  ) => {
    const segmentsApi = getApi(connection, KlaviyoApi.Segments);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({
        connection,
        segmentName,
        segmentConditionGroups,
        isStarredSegment,
        debug,
      });
    }
    const segment: SegmentCreateQuery = {
      data: {
        type: SegmentEnum.Segment,
        attributes: {
          name: segmentName,
          definition: {
            conditionGroups: segmentConditionGroups as ConditionGroup[],
          },
          isStarred: isStarredSegment,
        },
      },
    };
    const { body } = await segmentsApi.createSegment(segment);
    return {
      data: body,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createSegmentOutputSchema,
  }),
  examplePayload: createSegmentExamplePayload,
});
