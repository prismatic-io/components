import { input, util } from "@prismatic-io/spectral";
import { connection, fields } from "./common";
import { FIELDS_SEGMENT_MODEL } from "../constants";
import {
  cleanArrayCodeInput,
  cleanBooleanInput,
  cleanStringInput,
} from "../util";
const fieldsSegment = input({ ...fields, model: FIELDS_SEGMENT_MODEL });
export const listSegmentsInputs = {
  connection,
  fieldsSegment,
};
const segmentName = input({
  type: "string",
  required: true,
  label: "Segment Name",
  comments: "A display name to identify the segment.",
  example: "A segment",
  placeholder: "Enter a segment name",
  clean: util.types.toString,
});
const segmentConditionGroups = input({
  type: "code",
  language: "json",
  required: true,
  label: "Segment Condition Groups",
  comments: "The condition groups that define the segment.",
  example: JSON.stringify(
    [
      {
        conditions: [
          {
            type: "profile-group-membership",
            isMember: true,
            groupIds: ["X7MYfE"],
            timeframeFilter: {
              type: "date",
              operator: "in-the-last",
              unit: "day",
              quantity: 14,
            },
          },
        ],
      },
    ],
    null,
    2,
  ),
  clean: (value) => cleanArrayCodeInput(value, "Segment Condition Groups"),
});
const isStarredSegment = input({
  type: "boolean",
  required: false,
  label: "Is Starred Segment",
  comments:
    "When true, pins the segment to the top of the segments list in the Klaviyo UI.",
  default: "false",
  clean: util.types.toBool,
});
export const createSegmentInputs = {
  connection,
  segmentName,
  segmentConditionGroups,
  isStarredSegment,
};
const segmentId = input({
  type: "string",
  required: true,
  label: "Segment ID",
  comments: "The unique identifier for the segment.",
  example: "WwKnkd",
  placeholder: "Enter a segment ID",
  clean: util.types.toString,
  dataSource: "selectSegment",
});
export const getSegmentInputs = {
  connection,
  segmentId,
  fieldsSegment,
};
const isStarredSegmentOptional = input({
  label: "Is Starred Segment",
  type: "string",
  comments:
    "When true, pins the segment to the top of the segments list in the Klaviyo UI.",
  required: false,
  model: ["True", "False"].map((choice) => ({
    label: choice,
    value: choice.toLowerCase(),
  })),
  clean: cleanBooleanInput,
});
export const updateSegmentInputs = {
  connection,
  segmentId,
  segmentName: input({
    ...segmentName,
    required: false,
    clean: cleanStringInput,
  }),
  segmentConditionGroups: input({ ...segmentConditionGroups, required: false }),
  isStarredSegmentOptional,
};
export const deleteSegmentInputs = {
  connection,
  segmentId,
};
