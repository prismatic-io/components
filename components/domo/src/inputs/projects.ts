import { input, util } from "@prismatic-io/spectral";
import {
  connection,
  description,
  dueDate,
  fetchAll,
  limit,
  name,
  offset,
} from "./common";

export const projectId = input({
  label: "Project ID",
  comments: "The unique identifier for the project.",
  type: "string",
  required: true,
  placeholder: "Enter Project ID",
  example: "123",
  dataSource: "projects",
  clean: util.types.toString,
});

export const listId = input({
  label: "List ID",
  comments: "The unique identifier for the project list.",
  type: "string",
  required: true,
  placeholder: "Enter List ID",
  example: "456",
  dataSource: "projectLists",
  clean: util.types.toString,
});

export const taskId = input({
  label: "Task ID",
  comments: "The unique identifier for the task within a project list.",
  type: "string",
  required: true,
  placeholder: "Enter Task ID",
  example: "789",
  dataSource: "selectTask",
  clean: util.types.toString,
});

export const attachmentId = input({
  label: "Attachment ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the project attachment.",
  placeholder: "Enter Attachment ID",
  example: "67890",
  clean: util.types.toString,
});

export const members = input({
  label: "Members",
  comments:
    "Array of user IDs that will be assigned as members of the project.",
  type: "string",
  required: true,
  placeholder: "Enter member user IDs",
  example: "[27, 105, 93]",
  clean: util.types.toString,
});

export const publicInput = input({
  label: "Public",
  comments:
    "When true, the project will be publicly available to other Domo users.",
  type: "string",
  required: true,
  default: "true",
  placeholder: "Select visibility",
  model: [
    {
      label: "TRUE",
      value: "true",
    },
    {
      label: "FALSE",
      value: "false",
    },
  ],
  clean: util.types.toString,
});

export const membersArray = input({
  label: "Member ID",
  type: "string",
  collection: "valuelist",
  comments: "User IDs of members to include in the project.",
  required: false,
  placeholder: "Enter Member IDs",
  example: '["27", "105", "93"]',
  clean: (stringsArray: unknown) =>
    (Array.isArray(stringsArray) ? stringsArray : []).map((string: string) =>
      util.types.toInt(string),
    ),
});

export const publicBody = input({
  label: "Public Body",
  type: "string",
  required: false,
  comments:
    "When true, makes the resource publicly visible to other Domo users.",
  default: "",
  placeholder: "Select public visibility",
  model: [
    { label: "", value: "" },
    {
      label: "TRUE",
      value: "TRUE",
    },
    {
      label: "FALSE",
      value: "FALSE",
    },
  ],
  clean: util.types.toString,
});

export const type = input({
  label: "Type",
  comments:
    "The workflow status category for the list (e.g., TODO, WORKING_ON, COMPLETED).",
  type: "string",
  required: true,
  model: [
    {
      label: "TODO",
      value: "TODO",
    },
    {
      label: "WORKING_ON",
      value: "WORKING_ON",
    },
    {
      label: "COMPLETED",
      value: "COMPLETED",
    },
  ],
  clean: util.types.toString,
});

export const index = input({
  label: "Index",
  comments:
    "The ordered position of the list within the project. Setting this property will re-order other lists to maintain sequential order. Defaults to 1 if not provided.",
  type: "string",
  required: false,
  placeholder: "Enter index position",
  example: "1",
  clean: util.types.toString,
});

export const taskName = input({
  label: "Task Name",
  type: "string",
  required: true,
  comments: "A descriptive label for the task within the project list.",
  placeholder: "Enter task name",
  example: "Complete project review",
  clean: util.types.toString,
});

export const contributors = input({
  label: "Contributors",
  type: "string",
  required: false,
  comments: "A JSON array of user IDs assigned as contributors to the task.",
  placeholder: "Enter contributor user IDs",
  example: "[27, 105]",
  clean: util.types.toString,
});

export const ownedBy = input({
  label: "Owned By",
  type: "string",
  required: false,
  comments: "The unique identifier of the Domo user that owns the task.",
  placeholder: "Enter owner user ID",
  example: "959463190",
  clean: util.types.toString,
});

export const priority = input({
  label: "Priority",
  type: "string",
  required: false,
  comments:
    "The priority position of the task within the list. Setting this property re-orders other tasks to maintain sequential order. Defaults to 1 if not provided.",
  placeholder: "Enter priority",
  example: "3",
  clean: util.types.toString,
});

export const tags = input({
  label: "Tags",
  type: "string",
  required: false,
  comments:
    "A JSON array of tag labels to assign to the task for categorization.",
  placeholder: "Enter tags",
  example: '["urgent", "review"]',
  clean: util.types.toString,
});

export const taskObjectBody = input({
  label: "Task Object",
  type: "code",
  language: "json",
  required: false,
  comments: "The task object to create or update.",
  example: JSON.stringify(
    {
      id: "3",
      projectId: "2",
      projectListId: "4",
      taskName: "Business Plan Review",
      priority: 3,
      contributors: [27],
      tags: [],
      archived: false,
    },
    null,
    2,
  ),
  clean: util.types.toString,
});

export const updateProjectMembersBody = input({
  label: "Update Project Members Body",
  type: "code",
  language: "json",
  required: false,
  comments: "Array of user IDs to assign as members of the project.",
  example: JSON.stringify([27, 105, 93, 84, 107], null, 2),
  clean: util.types.toString,
});

export const updateTaskBody = input({
  label: "Update Task Body",
  type: "code",
  language: "json",
  required: false,
  comments: "The task object to update.",
  example: JSON.stringify(
    {
      id: "3",
      projectId: "2",
      projectListId: "4",
      taskName: "Project Scaffolding and Infrastructure",
      priority: 3,
      contributors: [27],
      tags: [],
      archived: false,
    },
    null,
    2,
  ),
  clean: util.types.toString,
});

export const updateListBody = input({
  label: "Update List Body",
  type: "code",
  language: "json",
  required: false,
  comments: "The list object to update.",
  example: JSON.stringify(
    {
      name: "Needs QA",
      type: "TODO",
      index: 3,
    },
    null,
    2,
  ),
  clean: util.types.toString,
});

export const updateProjectBody = input({
  label: "Update Project Body",
  type: "code",
  language: "json",
  required: false,
  comments: "The project object to update.",
  example: JSON.stringify(
    {
      name: "Marketing Campaign",
    },
    null,
    2,
  ),
  clean: util.types.toString,
});

export const createListInputs = {
  connection,
  name: input({ ...name, required: true, comments: "The name of the list." }),
  type,
  index,
  projectId,
};

export const createProjectInputs = {
  connection,
  members,
  name: input({
    ...name,
    required: true,
    comments: "The name of the project.",
  }),
  publicInput,
  description: input({
    ...description,
    required: false,
    comments: "The description of the project.",
  }),
  dueDate,
  membersArray,
  publicBody,
  bodyName: input({ ...name, required: false, comments: "Body name" }),
};

export const createTaskInputs = {
  connection,
  projectId: input({
    ...projectId,
    required: true,
    comments: "The ID of the project that the task belongs to.",
  }),
  listId: input({
    ...listId,
    required: true,
    comments: "The ID of the list within a project that the task belongs to.",
  }),
  taskName,
  contributors,
  description: input({
    ...description,
    required: false,
    comments: "An optional description of the task.",
  }),
  dueDate: input({
    ...dueDate,
    required: false,
    comments: "The date the task is expected to be completed.",
  }),
  ownedBy,
  priority,
  tags,
  taskObjectBody,
};

export const deleteListInputs = {
  connection,
  projectId,
  listId,
};

export const deleteProjectInputs = {
  connection,
  projectId,
};

export const getListInputs = {
  connection,
  projectId,
  listId,
};

export const getListOfAttachmentsInputs = {
  connection,
  projectId,
  listId,
  taskId,
};

export const getProjectInputs = {
  connection,
  projectId,
};

export const getProjectMembersInputs = {
  connection,
  projectId,
};

export const getTaskInputs = {
  connection,
  listId,
  projectId,
  taskId,
};

export const listProjectListsInputs = {
  connection,
  projectId,
};

export const listProjectListTasksInputs = {
  connection,
  projectId,
  listId,
  fetchAll,
  limit: input({
    ...limit,
    required: false,
    comments:
      "The maximum number of results to return (defaults to 10 with a maximum of 50).",
  }),
  offset: input({
    ...offset,
    required: false,
    comments:
      "The number of records to skip from the beginning of the result list (defaults to 0).",
  }),
};

export const listProjectsInputs = {
  connection,
};

export const updateListInputs = {
  connection,
  listId,
  projectId,
  index: input({
    ...index,
    required: true,
    comments:
      "The updated index of the list within the project. Updating the index of a list may also change the order of the other lists in the project to remain sequential.",
  }),
  name: input({
    ...name,
    required: true,
    comments: "The updated name of the list.",
  }),
  type,
  updateListBody,
};

export const updateProjectInputs = {
  connection,
  projectId,
  updateProjectBody,
  description: input({
    ...description,
    required: false,
    comments: "Updates the description of the project.",
  }),
  dueDate: input({
    ...dueDate,
    required: false,
    comments: "Updates the due date of the project.",
  }),
  name: input({
    ...name,
    required: false,
    comments: "Updates the name of the project.",
  }),
  publicUpdate: input({
    ...publicInput,
    required: false,
    comments:
      "Updates whether or not the project is publicly available to Domo users.",
    default: "",
    model: [
      {
        label: "",
        value: "",
      },
      {
        label: "TRUE",
        value: "true",
      },
      {
        label: "FALSE",
        value: "false",
      },
    ],
  }),
};

export const updateProjectMembersInputs = {
  connection,
  projectId,
  updateProjectMembersBody,
};

export const updateTaskInputs = {
  connection,
  taskId,
  listId,
  projectId,
  contributors,
  description,
  dueDate,
  ownedBy,
  priority,
  tags,
  taskName,
  updateTaskBody,
};

export const addAttachmentInputs = {
  connection,
  projectId,
  listId,
  taskId,
};

export const deleteAttachmentInputs = {
  connection,
  projectId: input({
    ...projectId,
    required: true,
    comments: "The ID of the project that the attachment belongs to.",
  }),
  taskId: input({
    ...taskId,
    required: true,
    comments: "The ID of the task that the attachment belongs to.",
  }),
  attachmentId,
};

export const downloadAttachmentInputs = {
  connection,
  listId,
  projectId,
  taskId,
  attachmentId,
};
