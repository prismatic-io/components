import { input } from "@prismatic-io/spectral";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const queryString = input({
  label: "Query String",
  type: "string",
  example: "$select=ProjectId",
  required: false,
  comments: "Provide a string value to query for a specific property.",
});

export const guId = input({
  label: "Project GUID",
  type: "string",
  required: true,
  example: "9840c3b6-ac3d-ec11-bea0-00155d788e0a",
  comments: "Provide a string value for the GUID",
  dataSource: "selectProject",
});

export const projectName = input({
  label: "Project Name",
  type: "string",
  required: true,
  example: "MyExampleProject",
  comments:
    "Provide a string value for the name of the project. The name can NOT contain any special characters.",
});

export const projectDescription = input({
  label: "Project Description",
  type: "string",
  required: true,
  example: "This is an example description.",
  comments: "Provide a string value for the description of the project.",
});

export const projectStartDate = input({
  label: "Project Start Date",
  type: "string",
  required: true,
  example: "2021-11-04T20:29:49.305Z",
  comments: "Provide a valid datetime value for the start date of the project.",
});

export const taskId = input({
  label: "Task Id",
  type: "string",
  required: true,
  example: "9840c3b6-ac3d-ec11-bea0-00155d788e0a",
  comments: "Provide a unique identifier for the task.",
  dataSource: "selectTask",
});

export const draftTaskId = input({
  label: "Draft Task Id",
  type: "string",
  required: true,
  example: "9840c3b6-ac3d-ec11-bea0-00155d788e0a",
  comments: "Provide a unique identifier for the draft task.",
  dataSource: "selectDraftTask",
});

export const taskName = input({
  label: "Task Name",
  type: "string",
  required: true,
  example: "Example Name",
  comments: "Provide a string value for the name of the task.",
});

export const notes = input({
  label: "Notes",
  type: "string",
  required: false,
  example: "These are example notes.",
  comments: "Provide a string value for notes.",
});

export const taskStartDate = input({
  label: "Task Start Date",
  type: "string",
  required: false,
  example: "2021-11-04T20:29:49.305Z",
  comments: "Provide a valid datetime value for the start date of a task.",
});

export const parentId = input({
  label: "Parent Id",
  type: "string",
  required: false,
  example: "9840c3b6-ac3d-ec11-bea0-00155d788e0a",
  comments: "Provide the unique identifier of the parent object.",
});

export const assignmentFinishDate = input({
  label: "Finish Date",
  type: "string",
  required: false,
  example: "2021-11-04T20:29:49.305Z",
  comments: "Provide a valid date time value for the finish date of the assignment",
});

export const assignmentStartDate = input({
  label: "Assignment Start Date",
  type: "string",
  required: false,
  example: "2021-11-04T20:29:49.305Z",
  comments: "Provide a valid date time value for the start date of the assignment",
});

export const resourceId = input({
  label: "Resource Id",
  type: "string",
  required: false,
  example: "9840c3b6-ac3d-ec11-bea0-00155d788e0a",
  comments: "Provide the unique identifier for the resource.",
  dataSource: "selectProjectResource",
});

export const taskFinishDate = input({
  label: "Finish Date",
  type: "string",
  required: false,
  example: "2021-11-04T20:29:49.305Z",
  comments: "Provide a valid datetime value for the finish date of the task.",
});

export const email = input({
  label: "Email",
  type: "string",
  required: false,
  example: "someone@example.com",
  comments: "Provide a valid email address.",
});

export const account = input({
  label: "Account",
  type: "string",
  required: false,
  example: "36923632865023",
  comments: "Provide the unique identifier of the account.",
});

export const resourceName = input({
  label: "Name",
  type: "string",
  required: false,
  example: "MyExampleFile.txt",
  comments: "Provide a string value for the name of the resource.",
});

export const pageSize = input({
  label: "Page Size",
  type: "string",
  required: false,
  comments:
    "Provide an integer value for the maximum results returned per page when paginating results.",
  example: "20",
});
export const pageNumber = input({
  label: "Page Number",
  type: "string",
  required: false,
  comments: "Provide an integer value for which page to return when paginating results.",
  example: "3",
});
