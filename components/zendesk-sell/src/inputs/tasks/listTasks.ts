import { input, util } from "@prismatic-io/spectral";
import { connection, fetchAll } from "../common";

export const listTasksInputs = {
  connection,
  fetchAll,
  sortBy: input({
    label: "Sort By",
    comments:
      "A field to sort by. The default ordering is ascending. If you want to change the sort order to descending, append :desc to the field",
    example: "resource_type:desc",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  ids: input({
    label: "IDs",
    comments: "Comma-separated list of task IDs to be returned in a request.",
    placeholder: "Enter comma-separated IDs",
    example: "12345678,87654321",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  creatorId: input({
    label: "Creator ID",
    comments:
      "Unique identifier of the user. Returns all tasks created by the user.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  ownerId: input({
    label: "Owner ID",
    placeholder: "Enter Owner ID",
    example: "12345678",
    comments:
      "Unique identifier of the user. Returns all tasks owned by the user.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  q: input({
    label: "Q",
    comments:
      "A query string to search for. Performs a full text search on the content field.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  type: input({
    label: "Type",
    comments: "Type of tasks to search for. Possible values: floating, related",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  resourceType: input({
    label: "Resource Type",
    comments:
      "Name of the resource type to search for. Possible values: lead, contact, deal",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  resourceId: input({
    label: "Resource ID",
    comments: "Unique identifier of the resource that you're searching for.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  completed: input({
    label: "Completed",
    comments:
      "Indicates whether the query will return tasks that are completed or not.",
    type: "string",
    default: "",
    model: [
      { label: "", value: "" },
      { label: "True", value: "true" },
      { label: "False", value: "false" },
    ],
    required: false,
    clean: util.types.toString,
  }),

  overdue: input({
    label: "Overdue",
    comments:
      "Indicates whether the query will return tasks where the due_date parameter has been passed or not.",
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

  remind: input({
    label: "Remind",
    comments:
      "Indicates whether the query will return tasks with reminders or without reminders.",
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
  page: input({
    label: "Page",
    comments:
      "Page number to start from. Page numbering starts at 1 and omitting the page parameter will return the first page.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  perPage: input({
    label: "Per Page",
    comments:
      "Number of records to return per page. The default limit is 25 and the maximum number that can be returned is 100.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),
};
