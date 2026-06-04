import { input, util } from "@prismatic-io/spectral";
import { connection } from "../common";

export const updateTaskInputs = {
  connection,
  id: input({
    label: "Task ID",
    comments: "The unique identifier of the task to update.",
    placeholder: "Enter task ID",
    example: "12345678",
    type: "string",
    required: true,
    clean: util.types.toString,
    dataSource: "selectTask",
  }),
  content: input({
    label: "Content",
    comments: "The description or body of the task.",
    placeholder: "Enter task content",
    example: "Contact Tom",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  dueDate: input({
    label: "Due Date",
    comments: "The date and time when the task is due. Format: ISO8601 UTC.",
    placeholder: "Enter due date",
    example: "2014-09-27T16:32:56Z",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  ownerId: input({
    label: "Owner ID",
    placeholder: "Enter Owner ID",
    example: "12345678",
    comments:
      "Defaults to the unique identifier of the user who created the task.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  resourceType: input({
    label: "Resource Type",
    comments:
      "The type of resource the task is related to. Possible values: lead, contact, deal.",
    placeholder: "Enter resource type",
    example: "lead",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  resourceId: input({
    label: "Resource ID",
    comments: "The unique identifier of the resource the task is related to.",
    placeholder: "Enter resource ID",
    example: "1",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  completed: input({
    label: "Completed",
    comments: "When true, marks the task as completed.",
    type: "string",
    required: false,
    default: "",
    model: [
      { label: "", value: "" },
      { label: "True", value: "true" },
      { label: "False", value: "false" },
    ],
    clean: util.types.toString,
  }),

  remindAt: input({
    label: "Remind At",
    comments:
      "The date and time to send a reminder for this task. Format: ISO8601 UTC.",
    placeholder: "Enter reminder date",
    example: "2014-09-29T15:32:56Z",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),
};
