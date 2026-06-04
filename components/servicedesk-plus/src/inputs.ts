import { input, util } from "@prismatic-io/spectral";
import {
  CRITERIA_TYPES,
  pollResourceModel,
  SUPPORTED_CONDITIONS,
} from "./constants";
import {
  cleanBool,
  cleanKeyValueListInput,
  cleanNumber,
  cleanObject,
  cleanString,
  cleanValueListInput,
  mapModel,
} from "./util";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const id = input({
  label: "ID",
  type: "string",
  required: false,
  comments: "Unique identifier to identify the resource",
  example: "1510894167438614",
  placeholder: "1510894167438614",
  clean: cleanString,
});

export const name = input({
  label: "Name",
  type: "string",
  required: false,
  comments: "Unique identifier to identify the resource",
  example: "test-name",
  placeholder: "test-name",
  clean: cleanString,
});

export const assetId = input({
  label: "Asset ID",
  type: "string",
  required: false,
  comments: "Unique identifier to identify the asset",
  example: "1510894167438614",
  placeholder: "1510894167438614",
  clean: cleanString,
});

export const assetName = input({
  label: "Asset Name",
  type: "string",
  required: false,
  comments: "Unique name to identify the asset",
  example: "192.0.2.1",
  placeholder: "192.0.2.1",
  clean: cleanString,
});

export const barCode = input({
  label: "Bar Code",
  type: "string",
  required: false,
  comments: "Unique barcode used to identify the asset",
  example: "test-barcode",
  placeholder: "test-barcode",
  clean: cleanString,
});

export const keyValuePairParams = input({
  label: "Extra parameters",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments: "Additional parameters to add to the request",
  example: "key1=value1,key2=value2",
  clean: cleanKeyValueListInput,
});

export const product = input({
  label: "Product",
  type: "code",
  language: "json",
  required: false,
  comments: "Product of the asset. Remove the default value if not needed.",
  default: JSON.stringify(
    {
      name: "test-product",
      id: "234567890123456",
    },
    null,
    2,
  ),
  clean: cleanObject,
});

export const state = input({
  label: "State",
  type: "code",
  language: "json",
  required: true,
  comments:
    "Indicates the state of the asset. Remove the default value if not needed.",
  default: JSON.stringify(
    {
      name: "test-state",
      id: "234567890123456",
    },
    null,
    2,
  ),
  clean: cleanObject,
});

export const assetTag = input({
  label: "Asset Tag",
  type: "string",
  required: false,
  comments: "Asset tag used to identify the asset",
  example: "Sample Content",
  placeholder: "Sample Content",
  clean: cleanString,
});

export const stateHistoryComments = input({
  label: "State History Comments",
  type: "string",
  required: false,
  comments:
    "A text in a plain format. No rich text or new line characters allowed.",
  example: "Sample Content",
  placeholder: "Sample Content",
  clean: cleanString,
});

export const productType = input({
  label: "Product Type",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Product type of the product. Remove the default value if not needed.",
  default: JSON.stringify(
    {
      name: "test-product_type",
      id: "234567890123456",
    },
    null,
    2,
  ),
  clean: cleanObject,
});

export const attributes = input({
  label: "Attributes",
  type: "code",
  language: "json",
  required: false,
  comments: "Other attributes to add to the payload",
  example: JSON.stringify(
    {
      is_laptop: false,
      part_no: "test-part_no",
      comments: "test-comments",
      software: {
        name: "test-name",
        id: "1537003994714405",
      },
      manufacturer: "test-manufacturer",
    },
    null,
    2,
  ),
  clean: cleanObject,
});

export const manufacturer = input({
  label: "Manufacturer",
  type: "string",
  required: false,
  comments: "Name to identify the product manufacturer.",
  example: "test-manufacturer",
  placeholder: "test-manufacturer",
  clean: cleanString,
});

export const isLaptop = input({
  label: "Is Laptop",
  type: "string",
  required: false,
  comments:
    "Boolean value indicating whether the product type is laptop or not.",
  model: [
    { label: "True", value: "true" },
    { label: "False", value: "false" },
    { label: "Empty", value: "" },
  ],
  default: "",
  clean: cleanBool,
});

export const partNo = input({
  label: "Part No",
  type: "string",
  required: false,
  comments: "Part no of the productPart no of the product",
  example: "test-part_no",
  placeholder: "test-part_no",
  clean: cleanString,
});

export const category = input({
  label: "Category",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Category of the product type. Remove the default value if not needed.",
  default: JSON.stringify(
    {
      name: "Non-IT",
      id: "234567890123456",
    },
    null,
    2,
  ),
  clean: cleanObject,
});

export const assetType = input({
  label: "Asset Type",
  type: "code",
  language: "json",
  required: false,
  comments: "Type of the product type. Remove the default value if not needed.",
  default: JSON.stringify(
    {
      name: "Asset",
      id: "234567890123456",
    },
    null,
    2,
  ),
  clean: cleanObject,
});

export const ciTypeApiName = input({
  label: "CI Type API Name",
  type: "string",
  required: true,
  comments: "Denotes the unique identifier used to identify the CI.",
  example: "ci_application",
  placeholder: "ci_application",
  clean: cleanString,
});

export const ciId = input({
  label: "CI ID",
  type: "string",
  required: true,
  comments: "Denotes the unique identifier used to identify the CI.",
  example: "100000000000034020",
  placeholder: "100000000000034020",
  clean: cleanString,
});

export const ciIds = input({
  label: "CI IDs",
  type: "string",
  collection: "valuelist",
  required: true,
  comments: "Unique identifier used to identify the CI.",
  example: "100000000000034020",
  placeholder: "100000000000034020",
  clean: cleanValueListInput,
});

export const description = input({
  label: "Description",
  type: "string",
  required: false,
  comments: "Description of the CI",
  example: "API Test",
  placeholder: "API Test",
  clean: cleanString,
});

export const rowCount = input({
  label: "Row Count",
  type: "string",
  required: false,
  comments: "Number of rows to be returned",
  example: "100",
  placeholder: "100",
  default: "100",
  clean: cleanNumber,
});

export const page = input({
  label: "Page",
  type: "string",
  required: false,
  comments: "Page number to be returned",
  example: "1",
  placeholder: "1",
  default: "1",
  clean: cleanNumber,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  comments:
    "Fetch all the data. If true, it will ignore Row Count and Page inputs.",
  default: "true",
  clean: cleanBool,
});

export const conditionsCriteria = input({
  label: "Conditions Criteria",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments:
    "Conditions are the operators for criteria construction. Select the condition to be applied to the field.",
  model: mapModel(SUPPORTED_CONDITIONS, true),
  example: "created_time=Greater Than",
});

export const conditionsCriteriaValue = input({
  label: "Conditions Criteria Value",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments: "The value of the field to be compared.",
  example: "created_time=1488451440000",
});

export const conditionsCriteriaType = input({
  label: "Conditions Criteria Type",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments: "Type of the field to be compared.",
  example: "created_time=number",
  model: mapModel(CRITERIA_TYPES, true),
});

const problemsDocumentationText =
  "See [ServiceDesk Plus API documentation](https://www.manageengine.com/products/service-desk/sdpod-v3-api/problems/problem.html) for details.";

const problemTitle = input({
  label: "Problem Title",
  type: "string",
  required: true,
  comments: "Title of the problem.",
  example: "Sample Content",
  placeholder: "Sample Content",
  clean: util.types.toString,
});

const problemDescription = input({
  label: "Problem Description",
  type: "string",
  required: false,
  comments: "Description of the problem.",
  example: "<b>The content to be displayed</b>",
  placeholder: "<b>The content to be displayed</b>",
  clean: cleanString,
});

const problemReportedTime = input({
  label: "Problem Reported Time",
  type: "code",
  language: "json",
  required: false,
  comments: `Indicates the reported time of the problem. ${problemsDocumentationText}`,
  example: JSON.stringify(
    {
      value: 1488451440000,
      display_value: "2017-03-02T12:00:00Z",
    },
    null,
    2,
  ),
  clean: cleanObject,
});

const problemDueByTime = input({
  label: "Problem Due By Time",
  type: "code",
  language: "json",
  required: false,
  comments: `Indicates the due by time of the problem. ${problemsDocumentationText}`,
  example: JSON.stringify({
    value: 1488451440000,
    display_value: "2017-03-02T12:00:00Z",
  }),
  clean: cleanObject,
});

const problemClosedTime = input({
  label: "Problem Closed Time",
  type: "code",
  language: "json",
  required: false,
  comments: `Indicates the closed time of the problem. ${problemsDocumentationText}`,
  example: JSON.stringify({
    value: 1488451440000,
    display_value: "2017-03-02T12:00:00Z",
  }),
  clean: cleanObject,
});

const additionalFields = input({
  label: "Additional Fields",
  type: "code",
  language: "json",
  comments:
    "Additional fields that might not be covered by the standard inputs.",
  required: false,
  clean: (value) => cleanObject(value) || {},
});

export const createProblemInputs = {
  connectionInput,
  problemTitle,
  problemDescription,
  problemReportedTime,
  problemDueByTime,
  problemClosedTime,
  additionalFields: input({
    ...additionalFields,
    comments: `${additionalFields.comments} ${problemsDocumentationText}`,
  }),
};

const toUpdateProblemId = input({
  label: "To Update Problem ID",
  type: "string",
  required: true,
  comments: "ID of the problem to be updated.",
  example: "234759602834500",
  placeholder: "234759602834500",
  clean: util.types.toString,
});

export const updateProblemInputs = {
  connectionInput,
  toUpdateProblemId,
  problemTitle: input({ ...problemTitle, required: false, clean: cleanString }),
  problemDescription,
  problemReportedTime,
  problemDueByTime,
  problemClosedTime,
  additionalFields: input({
    ...additionalFields,
    comments: `${additionalFields.comments} ${problemsDocumentationText}`,
  }),
};

const toGetProblemId = input({
  label: "To Get Problem ID",
  type: "string",
  required: true,
  comments: "ID of the problem to be retrieved.",
  example: "234759602834500",
  placeholder: "234759602834500",
  clean: util.types.toString,
});

export const getProblemInputs = {
  connectionInput,
  toGetProblemId,
};

export const listProblemsInputs = {
  connectionInput,
  fetchAll,
  rowCount,
  page,
  conditionsCriteria,
  conditionsCriteriaValue,
};

const toDeleteProblemId = input({
  label: "To Delete Problem ID",
  type: "string",
  required: true,
  comments: "ID of the problem to be deleted.",
  example: "234759602834500",
  placeholder: "234759602834500",
  clean: util.types.toString,
});

export const deleteProblemInputs = {
  connectionInput,
  toDeleteProblemId,
};

const problemNotesDocumentationText =
  "See [ServiceDesk Plus API documentation](https://www.manageengine.com/products/service-desk/sdpod-v3-api/problems/problem_note.html) for details.";

const noteProblemId = input({
  label: "Problem ID",
  type: "string",
  required: true,
  comments: "ID of the problem.",
  example: "234759602834500",
  placeholder: "234759602834500",
  clean: util.types.toString,
});

const noteDescription = input({
  label: "Note Description",
  type: "string",
  required: true,
  comments: "Contains description about the note.",
  example: "<b>The content to be displayed</b>",
  placeholder: "<b>The content to be displayed</b>",
  clean: util.types.toString,
});

const notifyTo = input({
  label: "Notify To",
  type: "code",
  language: "json",
  required: false,
  comments: `Contains info on users or roles to be notified on add/edit operation of the note. ${problemNotesDocumentationText}`,
  example: JSON.stringify(
    {
      xpaths: [
        {
          xpath: "problem.technician",
        },
      ],
      users: [
        {
          name: "John",
          id: "100000000000036077",
        },
      ],
    },

    null,
    2,
  ),
  clean: cleanObject,
});

export const createProblemNoteInputs = {
  connectionInput,
  noteProblemId,
  noteDescription,
  notifyTo,
  additionalFields: input({
    ...additionalFields,
    comments: `${additionalFields.comments} ${problemNotesDocumentationText}`,
  }),
};

const toDeleteNoteId = input({
  label: "To Delete Note ID",
  type: "string",
  required: true,
  comments: "ID of the note to be deleted.",
  example: "4149000001300019",
  placeholder: "4149000001300019",
  clean: util.types.toString,
});

export const deleteProblemNoteInputs = {
  connectionInput,
  noteProblemId,
  toDeleteNoteId,
};

const toGetNoteId = input({
  label: "To Get Note ID",
  type: "string",
  required: true,
  comments: "ID of the note to be retrieved.",
  example: "4149000001300019",
  placeholder: "4149000001300019",
  clean: util.types.toString,
});

export const getProblemNoteInputs = {
  connectionInput,
  noteProblemId,
  toGetNoteId,
};

export const listProblemNotesInputs = {
  connectionInput,
  noteProblemId,
  fetchAll,
  page,
  rowCount,
  conditionsCriteria,
  conditionsCriteriaValue,
};

const toUpdateNoteId = input({
  label: "To Update Note ID",
  type: "string",
  required: true,
  comments: "ID of the note to be updated.",
  example: "4149000001300019",
  placeholder: "4149000001300019",
  clean: util.types.toString,
});

export const updateProblemNoteInputs = {
  connectionInput,
  noteProblemId,
  toUpdateNoteId,
  noteDescription: input({
    ...noteDescription,
    required: false,
    clean: cleanString,
  }),
  notifyTo,
  additionalFields: input({
    ...additionalFields,
    comments: `${additionalFields.comments} ${problemNotesDocumentationText}`,
  }),
};

const taskProblemId = noteProblemId;

const taskTitle = input({
  label: "Task Title",
  type: "string",
  required: true,
  comments: "Title of the task.",
  example: "Sample Content",
  placeholder: "Sample Content",
  clean: util.types.toString,
});

const taskDescription = input({
  label: "Task Description",
  type: "string",
  required: false,
  comments: "Contains description about the task.",
  example: "<b>The content to be displayed</b>",
  placeholder: "<b>The content to be displayed</b>",
  clean: cleanString,
});

const problemTasksDocumentationText =
  "See [ServiceDesk Plus API documentation](https://www.manageengine.com/products/service-desk/sdpod-v3-api/problems/problem_task.html) for details.";

const taskType = input({
  label: "Task Type",
  type: "code",
  language: "json",
  required: false,
  comments: `Used to categorize the tasks of similar cases. ${problemTasksDocumentationText}`,
  example: JSON.stringify(
    {
      name: "test task_type",
      id: "10000000023123",
    },
    null,
    2,
  ),
  clean: cleanObject,
});

const taskOwner = input({
  label: "Owner",
  type: "code",
  language: "json",
  required: false,
  comments: `The User assigned to the task. ${problemTasksDocumentationText}`,
  example: JSON.stringify({
    email_id: "john@zylker.com",
    name: "John",
    id: "100000000000220612",
  }),
  clean: cleanObject,
});

const estimatedEffortMinutes = input({
  label: "Estimated Effort Minutes",
  type: "string",
  required: false,
  comments: "Estimated number of minutes to finish the task.",
  example: "234759602834500",
  placeholder: "234759602834500",
  clean: cleanNumber,
});

const estimatedEffortHours = input({
  label: "Estimated Effort Hours",
  type: "string",
  required: false,
  comments: "Estimated number of hours to finish the task.",
  example: "234759602834500",
  placeholder: "234759602834500",
  clean: cleanNumber,
});

const estimatedEffortDays = input({
  label: "Estimated Effort Days",
  type: "string",
  required: false,
  comments: "Estimated number of days to finish the task.",
  example: "234759602834500",
  placeholder: "234759602834500",
  clean: cleanNumber,
});

const percentageCompletion = input({
  label: "Percentage Completion",
  type: "string",
  required: false,
  comments: "Indicates the progress of the task in percentage of completion.",
  example: "100",
  placeholder: "100",
  clean: cleanNumber,
});

const group = input({
  label: "Group",
  type: "code",
  language: "json",
  required: false,
  comments: `Indicates the assigned group of the task. ${problemTasksDocumentationText}`,
  example: JSON.stringify(
    {
      name: "group 1",
      id: "1003333001243212",
    },

    null,
    2,
  ),
  clean: cleanObject,
});

export const createProblemTaskInputs = {
  connectionInput,
  taskProblemId,
  taskTitle,
  taskDescription,
  taskType,
  taskOwner,
  estimatedEffortMinutes,
  estimatedEffortHours,
  estimatedEffortDays,
  percentageCompletion,
  group,
  additionalFields: input({
    ...additionalFields,
    comments: `${additionalFields.comments} ${problemTasksDocumentationText}`,
  }),
};

const toDeleteTaskId = input({
  label: "To Delete Task ID",
  type: "string",
  required: true,
  comments: "ID of the task to be deleted.",
  example: "4149000001300019",
  placeholder: "4149000001300019",
  clean: util.types.toString,
});

export const deleteProblemTaskInputs = {
  connectionInput,
  taskProblemId,
  toDeleteTaskId,
};

const toGetTaskId = input({
  label: "To Get Task ID",
  type: "string",
  required: true,
  comments: "ID of the task to be retrieved.",
  example: "4149000001300019",
  placeholder: "4149000001300019",
  clean: util.types.toString,
});

export const getProblemTaskInputs = {
  connectionInput,
  taskProblemId,
  toGetTaskId,
};

export const listProblemTasksInputs = {
  connectionInput,
  taskProblemId,
  fetchAll,
  page,
  rowCount,
  conditionsCriteria,
  conditionsCriteriaValue,
};

const toUpdateTaskId = input({
  label: "To Update Task ID",
  type: "string",
  required: true,
  comments: "ID of the task to be updated.",
  example: "4149000001300019",
  placeholder: "4149000001300019",
  clean: util.types.toString,
});

export const updateProblemTaskInputs = {
  connectionInput,
  taskProblemId,
  toUpdateTaskId,
  taskTitle: input({ ...taskTitle, required: false, clean: cleanString }),
  taskDescription,
  taskType,
  taskOwner,
  estimatedEffortMinutes,
  estimatedEffortHours,
  estimatedEffortDays,
  percentageCompletion,
  group,
  additionalFields: input({
    ...additionalFields,
    comments: `${additionalFields.comments} ${problemTasksDocumentationText}`,
  }),
};

const requestSubject = input({
  label: "Request Subject",
  type: "string",
  required: true,
  comments: "Subject of this request.",
  example: "Sample Content",
  placeholder: "Sample Content",
  clean: cleanString,
});

const requestDescription = input({
  label: "Request Description",
  type: "string",
  required: false,
  comments: "Description of this request.",
  example: "<b>The content to be displayed</b>",
  placeholder: "<b>The content to be displayed</b>",
  clean: cleanString,
});

const impactDetails = input({
  label: "Impact Details",
  type: "string",
  required: false,
  comments: "Description about the impact of this request.",
  example: "Sample Content",
  placeholder: "Sample Content",
  clean: cleanString,
});

const emailIdsToNotify = input({
  label: "Email IDs To Notify",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Email ids, which needs to be notified about the happenings of this request.",
  example: "abc.gmail.com",
  placeholder: "abc.gmail.com",
  clean: cleanValueListInput,
});

const deletePreTemplateTasks = input({
  label: "Delete Pre Template Tasks",
  type: "boolean",
  required: false,
  comments:
    "Boolean value indicating whether the pre template tasks need to be deleted.",
  default: "false",
  clean: util.types.toBool,
});

const requestsDocumentationText =
  "See [ServiceDesk Plus API documentation](https://www.manageengine.com/products/service-desk/sdpod-v3-api/requests/request.html) for details.";

export const createRequestInputs = {
  connectionInput,
  requestSubject,
  requestDescription,
  impactDetails,
  emailIdsToNotify,
  deletePreTemplateTasks,
  additionalFields: input({
    ...additionalFields,
    comments: `${additionalFields.comments} ${requestsDocumentationText}`,
  }),
};

const toDeleteRequestId = input({
  label: "To Delete Request ID",
  type: "string",
  required: true,
  comments: "ID of the request to be deleted.",
  example: "4149000001300019",
  placeholder: "4149000001300019",
  clean: util.types.toString,
});

export const deleteRequestInputs = {
  connectionInput,
  toDeleteRequestId,
};

const toGetRequestId = input({
  label: "To Get Request ID",
  type: "string",
  required: true,
  comments: "ID of the request to be retrieved.",
  example: "4149000001300019",
  placeholder: "4149000001300019",
  clean: util.types.toString,
});

export const getRequestInputs = {
  connectionInput,
  toGetRequestId,
};

export const listRequestsInputs = {
  connectionInput,
  fetchAll,
  rowCount,
  page,
  conditionsCriteria,
  conditionsCriteriaValue,
};

const toUpdateRequestId = input({
  label: "To Update Request ID",
  type: "string",
  required: true,
  comments: "ID of the request to be updated.",
  example: "4149000001300019",
  placeholder: "4149000001300019",
  clean: util.types.toString,
});

export const updateRequestInputs = {
  connectionInput,
  toUpdateRequestId,
  requestSubject: input({
    ...requestSubject,
    required: false,
    clean: cleanString,
  }),
  requestDescription,
  impactDetails,
  emailIdsToNotify,
  deletePreTemplateTasks,
  additionalFields: input({
    ...additionalFields,
    comments: `${additionalFields.comments} ${requestsDocumentationText}`,
  }),
};

const taskRequestId = input({
  label: "Request ID",
  type: "string",
  required: true,
  comments: "ID of the request.",
  example: "4149000001300019",
  placeholder: "4149000001300019",
  clean: util.types.toString,
});

const taskRequestTitle = input({
  label: "Request Task Title",
  type: "string",
  required: true,
  comments: "Title of the task.",
  example: "Sample Content",
  placeholder: "Sample Content",
  clean: util.types.toString,
});

const taskRequestPercentageCompletion = input({
  label: "Request Task Percentage Completion",
  type: "string",
  required: false,
  comments: "Indicates the progress of the task in percentage of completion.",
  example: "100",
  placeholder: "100",
  clean: cleanNumber,
});

const taskRequestEstimatedEffortHours = input({
  label: "Request Task Estimated Effort Hours",
  type: "string",
  required: false,
  comments: "Estimated number of hours to finish the task.",
  example: "12",
  placeholder: "12",
  clean: cleanNumber,
});

const taskRequestAdditionalCost = input({
  label: "Request Task Additional Cost",
  type: "string",
  required: false,
  comments: "Cost spent other than the actual cost of the task.",
  example: "23.08",
  placeholder: "23.08",
  clean: cleanNumber,
});

const requestTasksDocumentationText =
  "See [ServiceDesk Plus API documentation](https://www.manageengine.com/products/service-desk/sdpod-v3-api/requests/request_task.html) for details.";

const taskRequestActualStartTime = input({
  label: "Request Task Actual Start Time",
  type: "code",
  language: "json",
  required: false,
  comments: `Date and time at which the task actually got started. ${requestTasksDocumentationText}`,
  example: JSON.stringify({
    value: 1488451440000,
    display_value: "2017-03-02T12:00:00Z",
  }),
  clean: cleanObject,
});

const taskRequestActualEndTime = input({
  label: "Request Task Actual End Time",
  type: "code",
  language: "json",
  required: false,
  comments: `Date and time at which the task actually got finished. ${requestTasksDocumentationText}`,
  example: JSON.stringify({
    value: 1488451440000,
    display_value: "2017-03-02T12:00:00Z",
  }),
  clean: cleanObject,
});

const taskRequestDescription = input({
  label: "Request Task Description",
  type: "string",
  required: false,
  comments: "Contains description about the task.",
  example: "<b>The content to be displayed</b>",
  placeholder: "<b>The content to be displayed</b>",
  clean: cleanString,
});

const taskRequestOwner = input({
  label: "Request Task Owner",
  type: "code",
  language: "json",
  required: false,
  comments: `The User assigned to the task. ${requestTasksDocumentationText}`,
  example: JSON.stringify({
    name: "test-owner",
    id: "234567890123456",
  }),
  clean: cleanObject,
});

export const createRequestTaskInputs = {
  connectionInput,
  taskRequestId,
  taskRequestTitle,
  taskRequestPercentageCompletion,
  taskRequestEstimatedEffortHours,
  taskRequestDescription,
  taskRequestOwner,
  taskRequestAdditionalCost,
  taskRequestActualEndTime,
  taskRequestActualStartTime,
  additionalFields: input({
    ...additionalFields,
    comments: `${additionalFields.comments} ${requestTasksDocumentationText}`,
  }),
};

const toDeleteRequestTaskId = input({
  label: "To Delete Request Task ID",
  type: "string",
  required: true,
  comments: "ID of the task to be deleted.",
  example: "4149000001300019",
  placeholder: "4149000001300019",
  clean: util.types.toString,
});

export const deleteRequestTaskInputs = {
  connectionInput,
  taskRequestId,
  toDeleteRequestTaskId,
};

const toGetRequestTaskId = input({
  label: "To Get Request Task ID",
  type: "string",
  required: true,
  comments: "ID of the task to be retrieved.",
  example: "4149000001300019",
  placeholder: "4149000001300019",
  clean: util.types.toString,
});

export const getRequestTaskInputs = {
  connectionInput,
  taskRequestId,
  toGetRequestTaskId,
};

export const listRequestTasksInputs = {
  connectionInput,
  taskRequestId,
  fetchAll,
  rowCount,
  page,
  conditionsCriteria,
  conditionsCriteriaValue,
};

const toUpdateRequestTaskId = input({
  label: "To Update Request Task ID",
  type: "string",
  required: true,
  comments: "ID of the task to be updated.",
  example: "4149000001300019",
  placeholder: "4149000001300019",
  clean: util.types.toString,
});

export const updateRequestTaskInputs = {
  connectionInput,
  taskRequestId,
  toUpdateRequestTaskId,
  taskRequestTitle: input({
    ...taskRequestTitle,
    required: false,
    clean: cleanString,
  }),
  taskRequestPercentageCompletion,
  taskRequestEstimatedEffortHours,
  taskRequestDescription,
  taskRequestOwner,
  taskRequestAdditionalCost,
  taskRequestActualEndTime,
  taskRequestActualStartTime,
  additionalFields: input({
    ...additionalFields,
    comments: `${additionalFields.comments} ${requestTasksDocumentationText}`,
  }),
};

export const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  model: pollResourceModel,
  default: "requests",
  comments: "The type of resource to poll for new records.",
  clean: util.types.toString,
});

export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: true,
  default: "true",
  comments: "Include records that are new since the last poll.",
  clean: util.types.toBool,
});
