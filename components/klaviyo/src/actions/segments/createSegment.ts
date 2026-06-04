import { action } from "@prismatic-io/spectral";
import { getApi } from "../../api";
import { createSegmentInputs as inputs } from "../../inputs/segments";
import {
  type ConditionGroup,
  type SegmentCreateQuery,
  SegmentEnum,
} from "klaviyo-api";
import { createSegmentExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";

export const createSegment = action({
  display: {
    label: "Create Segment",
    description: "Create a segment.",
  },
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
          name: segmentName!,
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
  examplePayload: createSegmentExamplePayload,
});
