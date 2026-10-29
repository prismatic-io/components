import { input } from "@prismatic-io/spectral";
import { connection } from "../shared";
import { workItemkey } from "./shared";
import { cleanStringInput } from "../../utils";

const description = input({
  label: "Description",
  type: "string",
  comments:
    "A free form text field to add more information about the Work Item",
  required: false,
  example: "This is a description.",
  placeholder: "This is a description.",
  clean: cleanStringInput,
});

const deadlineDate = input({
  label: "Deadline Date",
  type: "string",
  comments:
    "The deadline of the workitem as ISO8601 formated datestamp or timestamp",
  required: false,
  example: "2022-01-30",
  placeholder: "2022-01-30",
  clean: cleanStringInput,
});

export default {
  connection,
  workItemkey: input({
    ...workItemkey,
    comments: `${workItemkey.comments} to update a Work Item by.`,
  }),
  description,
  deadlineDate,
};
