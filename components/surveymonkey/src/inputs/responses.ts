import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import { connectionInput, fetchAll, page, perPage, extraBody } from "./common";
import { surveyId } from "./surveys";





export const responseId = input({
  label: "Response ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the response.",
  example: "5007154402",
  placeholder: "Enter response ID",
  dataSource: "selectResponse",
  clean: util.types.toString,
});

export const responseStatus = input({
  label: "Response Status",
  type: "string",
  required: false,
  model: [
    { label: "All", value: "" },
    { label: "Completed", value: "completed" },
    { label: "Partial", value: "partial" },
    { label: "Disqualified", value: "disqualified" },
    { label: "Over Quota", value: "overquota" },
  ],
  comments: "Filter responses by status.",
  placeholder: "Select response status",
  clean: toOptionalString,
});

export const responsePages = input({
  label: "Response Pages",
  type: "code",
  language: "json",
  required: true,
  comments: "Pages from the survey and their associated responses.",
  example: JSON.stringify(
    [
      {
        id: "1234",
        questions: [
          {
            id: "1234",
            variable_id: "",
            answers: [
              {
                choice_id: "123456",
                row_id: "",
                col_id: "",
                other_id: "",
                text: "",
              },
            ],
          },
        ],
      },
    ],
    null,
    2,
  ),
  clean: util.types.toObject,
});

export const responseUpdateStatus = input({
  label: "Status",
  type: "string",
  required: false,
  model: [
    { label: "Completed", value: "completed" },
    { label: "Partial", value: "partial" },
    { label: "Disqualified", value: "disqualified" },
    { label: "Over Quota", value: "overquota" },
  ],
  comments: "Update the response status.",
  placeholder: "Select status",
  clean: toOptionalString,
});

export const responseCustomValue = input({
  label: "Custom Value",
  type: "string",
  required: false,
  comments: "The custom metadata value to associate with the response.",
  placeholder: "Enter custom value",
  clean: toOptionalString,
});





export const listResponsesInputs = {
  connection: connectionInput,
  surveyId,
  status: responseStatus,
  fetchAll,
  page,
  perPage,
};

export const getResponseInputs = {
  connection: connectionInput,
  surveyId,
  responseId,
};

export const deleteResponseInputs = {
  connection: connectionInput,
  surveyId,
  responseId,
};

export const updateResponseInputs = {
  connection: connectionInput,
  surveyId,
  responseId,
  responsePages,
  status: responseUpdateStatus,
  customValue: responseCustomValue,
  extraBody,
};
