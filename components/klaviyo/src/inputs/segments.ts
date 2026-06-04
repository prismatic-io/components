import { input, util } from "@prismatic-io/spectral";
import { connection, fields } from "./shared";
import { FIELDS_SEGMENT_MODEL } from "../constants";
import {
  cleanArrayCodeInput,
  cleanBooleanInput,
  cleanStringInput,
} from "../utils";

export const fieldsSegment = input({ ...fields, model: FIELDS_SEGMENT_MODEL });

export const listSegmentsInputs = {
  connection,
  fieldsSegment,
};

const segmentName = input({
  type: "string",
  required: true,
  label: "Segment Name",
  comments: "The name of the segment.",
  example: "A segment",
  placeholder: "A segment",
  clean: cleanStringInput,
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
  comments: "Whether the segment is starred.",
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
  comments: "The ID of the segment.",
  example: "WwKnkd",
  placeholder: "WwKnkd",
  clean: cleanStringInput,
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
  comments: "Whether the segment is starred.",
  required: false,
  default: undefined,
  model: ["True", "False"].map((choice) => ({
    label: choice,
    value: choice.toLowerCase(),
  })),
  clean: cleanBooleanInput,
});

export const updateSegmentInputs = {
  connection,
  segmentId,
  segmentName: input({ ...segmentName, required: false }),
  segmentConditionGroups: input({ ...segmentConditionGroups, required: false }),
  isStarredSegmentOptional,
};

export const deleteSegmentInputs = {
  connection,
  segmentId,
};
