import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { SERVICES, WORKDAY_API_DOCS_URL } from "../constants";
import { cleanNumberInput, cleanStringInput } from "../util";
import {
  connection,
  extraBody,
  extraParameters,
  instanceDescriptor,
  instanceHref,
  instanceId,
  modelBooleanUpdateInput,
  paginationQueryStringInputs,
  referenceId,
  workerId,
} from "./common";
const workerTimeBlockId = input({
  label: "Worker Time Block ID",
  comments: "Identifies the worker's reported time block.",
  type: "string",
  example: "4e6a8c0e2a5b47d9f1b3d5f7a9c1e3b5",
  placeholder: "Enter worker time block ID",
  required: true,
  clean: util.types.toString,
});
const timeClockEventId = input({
  label: "Time Clock Event ID",
  comments: "Identifies the time clock event record.",
  type: "string",
  example: "8a0c2e4a6c7d49f1b3d5f7b9d1f3a5c7",
  placeholder: "Enter time clock event ID",
  required: true,
  clean: util.types.toString,
});
const clockEventOverrideRate = input({
  label: "Clock Event Override Rate",
  comments: "Optional rate that overrides the default pay rate for this event.",
  type: "string",
  example: "45.00",
  placeholder: "Enter clock event override rate",
  required: false,
  clean: cleanNumberInput,
});
const clockEventTimeEntryCodeId = input({
  label: "Clock Event Time Entry Code ID",
  comments: "Identifies the time entry code applied to the clock event.",
  type: "string",
  example: "c2e4a6c8e0b143f5b7d9f1a3c5e7a9c1",
  placeholder: "Enter clock event time entry code ID",
  required: false,
  clean: cleanStringInput,
});
const clockEventProjectPlanTaskId = input({
  label: "Clock Event Project Plan Task ID",
  comments: "Identifies the project plan task associated with the clock event.",
  type: "string",
  example: "a6c8e0a2c4d547f9b1d3f5a7c9e1b3d5",
  placeholder: "Enter clock event project plan task ID",
  required: false,
  clean: cleanStringInput,
});
const clockEventProjectId = input({
  label: "Clock Event Project ID",
  comments: "Identifies the project associated with the clock event.",
  type: "string",
  example: "e0a2c4e6a8f94b1d3f5b7d9f1a3c5e7b",
  placeholder: "Enter clock event project ID",
  required: false,
  clean: cleanStringInput,
});
const clockEventComment = input({
  label: "Clock Event Comment",
  comments: "Free-text comment attached to the time clock event.",
  type: "string",
  example: "Clocked in from the warehouse kiosk",
  placeholder: "Enter clock event comment",
  required: false,
  clean: cleanStringInput,
});
const assignmentIds = structuredObjectInput({
  label: "Assignment IDs",
  required: false,
  comments:
    "Write-action IDs that associate a record with related entities (offices, departments, tags, sources, etc.).",
  inputs: {
    clockEventTimeEntryCodeId,
    clockEventProjectId,
    clockEventProjectPlanTaskId,
  },
});
const workerTimeBlockExtraBodyExample = JSON.stringify(
  {
    customWorktag07: {
      id: "edb6a868245948108794fd638296e287",
    },
    customWorktag01: {
      id: "7ddca655c6d141139421993237a51615",
    },
    customWorktag13: {
      id: "f13eea6188db48dab70b4cc602ec970f",
    },
    customWorktag15: {
      id: "71551f2559ab45bd894353356327d1e7",
    },
    customWorktag08: {
      id: "51d40b89b17e4259b9405e5b9ec27bdb",
    },
    customWorktag14: {
      id: "ac294074acb74927aea072afa3aa8042",
    },
    customWorktag02: {
      id: "f348c0731f494b17bccb1c3677a54088",
    },
    customWorktag04: {
      id: "e098bc767c344c07aea9c19c3f0285ea",
    },
    customWorktag09: {
      id: "8f17e1c0b8d04845aa6d9af47158d85c",
    },
    customWorktag06: {
      id: "7f633b0064c8475ca38f6600b6c2ba6b",
    },
    customWorktag05: {
      id: "7e88c8c97b964159b0d34e7e63405b32",
    },
    customWorktag03: {
      id: "c7563a211566406ba8cf4b003c5ae41f",
    },
    customWorktag10: {
      id: "263623fc84cf4c7f8e8fddb908f2be50",
    },
    customWorktag11: {
      id: "08974bf6b3164f4fb818fd0c8eb79dc7",
    },
    customWorktag12: {
      id: "32688e78d6f949949cbf765ec8bf9ccb",
    },
    customOrganization10: {
      id: "bd7cbd05e5184404bd23da9c4780e9fa",
    },
    customOrganization06: {
      id: "c21a98df7a3f45a18af328c062d89347",
    },
    appropriation: {
      id: "5fc9eada8c9941e785401804706fafff",
    },
    customOrganization02: {
      id: "927ef357d263458987ed850016744fec",
    },
    allocationPool: {
      id: "67e47f1ed95b4c899889051908254bed",
    },
    customOrganization03: {
      id: "6a735c7a7ba04f489926c88a98d63a19",
    },
    customOrganization04: {
      id: "e838e6e1605f45e59695ceef6e5f38f3",
    },
    customOrganization05: {
      id: "f6ee416e77944fd6bd899f339fb649ae",
    },
    customOrganization01: {
      id: "baf36640051f48af8ebed4399a56984a",
    },
    customOrganization07: {
      id: "2071ae6a2fe74c8c9dcd3ac3fd1ab9e7",
    },
    customOrganization08: {
      id: "181549113d154d5e8c504d8e3eda6bde",
    },
    customOrganization09: {
      id: "add691e6f6a34a16b9602316b1057e28",
    },
    program: {
      id: "3ca5bafd904b4ec6b9f3bd23b8e31950",
    },
    jobProfile: {
      id: "11123be5aa7244388e772a8827621d1f",
    },
    costCenter: {
      id: "43c1f23afb1c41df8def56b9f6da8d1d",
    },
    location: {
      id: "49d80d18b03a4324a03d68f7fe55a452",
    },
    grant: {
      id: "b0bdb52a8eba412c9e7c7e439f62e6ae",
    },
    businessUnit: {
      id: "c03bf4aa5b90490897077ff545112f63",
    },
    region: {
      id: "e8439e98ac0541cda18fdd672f2f585d",
    },
    position: {
      id: "8c3c94cabd664260b16077e1dd56aaaf",
    },
    fund: {
      id: "cc287900aa4a4c22a0486a101d6e4d78",
    },
    reportedQuantity: "8",
    gift: {
      id: "b85c9c1cb6124d5eb2d9b83513cae519",
    },
    status: {
      id: "562c9774cc8d4b049e1ff8daf64f21ac",
    },
    unit: {
      id: "599330c7e61e41e59d3bf446daee8d92",
    },
    worker: {
      id: "3ecf777071f14e1c861073fe6b35690d",
    },
    calendarDate: "2024-06-01T07:00:00.000Z",
    timeEntryCode: {
      id: "5c5a72e5658244629fbc518891ad5e29",
    },
    projectRole: {
      id: "848431263b594196bff57da192988322",
    },
    overrideRate: "3",
    projectPlanPhase: {
      id: "99a0270269d94b4099996adf4a00462f",
    },
    outReason: {
      id: "25feff6c52bb43f098886904bd161d4f",
    },
    project: {
      id: "17a4a68190c644aa8d96b7a09d3b87dc",
    },
    projectPlanTask: {
      id: "88f01e603ed849c2b4a32591b4f9a9d3",
    },
    currency: {
      id: "e4930a3e1f744384979d18a80819e220",
    },
  },
  null,
  2,
);
const postWorkerTimeBlockExtraBodyComments = `${extraBody.comments} See [Workday API documentation](${WORKDAY_API_DOCS_URL}#${SERVICES.timeTracking.slice(1)}/post-/workers/-ID-/workerTimeBlock) for more information.`;
const doNotBill = input({
  label: "Do Not Bill",
  comments: "When true, marks the time block as non-billable.",
  type: "boolean",
  default: "false",
  required: false,
  clean: util.types.toBool,
});
const comment = input({
  label: "Comment",
  comments: "Free-text comment attached to the reported time block.",
  type: "string",
  required: false,
  placeholder: "Enter comment",
  clean: cleanStringInput,
});
const getTimeClockEventsParamsComments = `${extraParameters.comments} See optional (QUERY-STRING PARAMETERS) in the [Workday API documentation](${WORKDAY_API_DOCS_URL}#${SERVICES.timeTracking.slice(1)}/get-/timeClockEvents).`;
const getWorkersParamsComments = `${extraParameters.comments} See optional (QUERY-STRING PARAMETERS) in the [Workday API documentation](${WORKDAY_API_DOCS_URL}#${SERVICES.timeTracking.slice(1)}/get-/workers).`;
const updateTimeClockEventsByIdExtraBodyExample = JSON.stringify(
  {
    businessUnit: {
      id: "0658921d364a454181f5799ae226ae5b",
    },
    costCenter: {
      id: "b9df597186c7447a8125f83ebf48a847",
    },
    customWorktag08: {
      id: "1516be812ac047bb82bcf7a519162158",
    },
    worker: {
      id: "ef500cf977be4cea9035c04fe748a229",
    },
  },
  null,
  2,
);
const updateTimeClockEventsByIdExtraBodyComments = `${extraBody.comments} See [Workday API documentation](${WORKDAY_API_DOCS_URL}#${SERVICES.timeTracking.slice(1)}/put-/timeClockEvents/-ID-) for more information.`;
const updateWorkerTimeBlockExtraBodyComments = `${extraBody.comments} See [Workday API documentation](${WORKDAY_API_DOCS_URL}#${SERVICES.timeTracking.slice(1)}/patch-/workers/-ID-/workerTimeBlock/-subresourceID-) for more information.`;
export const deleteTimeClockEventsByIdInputs = {
  connection,
  timeClockEventId,
};
export const deleteWorkerTimeBlockInputs = {
  connection,
  workerId,
  workerTimeBlockId,
};
export const getTimeClockEventsInputs = {
  connection,
  ...paginationQueryStringInputs,
  extraParameters: {
    ...extraParameters,
    comments: getTimeClockEventsParamsComments,
  },
};
export const getTimeClockEventsByIdInputs = { connection, timeClockEventId };
export const getWorkerByIdInputs = { connection, workerId };
export const getWorkersInputs = {
  connection,
  ...paginationQueryStringInputs,
  extraParameters: { ...extraParameters, comments: getWorkersParamsComments },
};
export const postWorkerTimeBlockInputs = {
  connection,
  workerId,
  doNotBill,
  comment,
  instanceId: { ...instanceId, required: false },
  instanceDescriptor: { ...instanceDescriptor, required: false },
  extraBody: {
    ...extraBody,
    comments: postWorkerTimeBlockExtraBodyComments,
    example: workerTimeBlockExtraBodyExample,
  },
};
export const updateTimeClockEventsByIdInputs = {
  connection,
  timeClockEventId,
  instanceDescriptor,
  instanceHref,
  instanceId,
  clockEventOverrideRate,
  referenceId,
  assignmentIds,
  clockEventComment,
  extraBody: {
    ...extraBody,
    comments: updateTimeClockEventsByIdExtraBodyComments,
    example: updateTimeClockEventsByIdExtraBodyExample,
  },
};
const {
  connection: _connection,
  workerId: _workerId,
  ...postWorkerTimeBlockFields
} = postWorkerTimeBlockInputs;
export const updateWorkerTimeBlockInputs = {
  connection,
  workerId,
  workerTimeBlockId,
  ...postWorkerTimeBlockFields,
  doNotBill: {
    ...postWorkerTimeBlockInputs.doNotBill,
    ...modelBooleanUpdateInput,
    label: postWorkerTimeBlockInputs.doNotBill.label,
  },
  extraBody: {
    ...extraBody,
    comments: updateWorkerTimeBlockExtraBodyComments,
    example: workerTimeBlockExtraBodyExample,
  },
};
