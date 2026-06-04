import { input, util } from "@prismatic-io/spectral";
import { SERVICES } from "../constants";
import { cleanDate, cleanNumberInput, cleanStringInput } from "../util";
import {
  additionalFields,
  connection,
  instanceDescriptor,
  instanceHref,
  instanceId,
  modelBooleanUpdateInput,
  paginationQueryStringInputs,
  params,
  referenceId,
  workerId,
} from "./shared";

const workerTimeBlockId = input({
  label: "Worker Time Block ID",
  comments: "Identifies the worker's reported time block.",
  type: "string",
  example: "",
  placeholder: "Enter worker time block ID",
  required: true,
  clean: util.types.toString,
});

const timeClockEventId = input({
  label: "Time Clock Event ID",
  comments: "Identifies the time clock event record.",
  type: "string",
  example: "",
  placeholder: "Enter time clock event ID",
  required: true,
  clean: util.types.toString,
});

const clockEventDateTime = input({
  label: "Clock Event Date Time",
  comments: "Timestamp when the time clock event occurred.",
  type: "string",
  example: "2024-06-01T07:00:00.000Z",
  placeholder: "2024-06-01T07:00:00.000Z",
  required: false,
  clean: (value: unknown) => cleanDate(value, "Clock Event Date Time"),
});

const clockEventTimeZoneId = input({
  label: "Clock Event Time Zone ID",
  comments: "Identifies the time zone applied to the clock event.",
  type: "string",
  example: "",
  placeholder: "Enter clock event time zone ID",
  required: false,
  clean: cleanStringInput,
});

const clockEventOverrideRate = input({
  label: "Clock Event Override Rate",
  comments: "Optional rate that overrides the default pay rate for this event.",
  type: "string",
  example: "",
  placeholder: "Enter clock event override rate",
  required: false,
  clean: cleanNumberInput,
});

const clockEventTimeEntryCodeId = input({
  label: "Clock Event Time Entry Code ID",
  comments: "Identifies the time entry code applied to the clock event.",
  type: "string",
  example: "",
  placeholder: "Enter clock event time entry code ID",
  required: false,
  clean: cleanStringInput,
});

const clockEventProjectPlanTaskId = input({
  label: "Clock Event Project Plan Task ID",
  comments: "Identifies the project plan task associated with the clock event.",
  type: "string",
  example: "",
  placeholder: "Enter clock event project plan task ID",
  required: false,
  clean: cleanStringInput,
});

const clockEventProjectId = input({
  label: "Clock Event Project ID",
  comments: "Identifies the project associated with the clock event.",
  type: "string",
  example: "",
  placeholder: "Enter clock event project ID",
  required: false,
  clean: cleanStringInput,
});

const clockEventComment = input({
  label: "Clock Event Comment",
  comments: "Free-text comment attached to the time clock event.",
  type: "string",
  example: "",
  placeholder: "Enter clock event comment",
  required: false,
  clean: cleanStringInput,
});


export const additionalFieldsExample = JSON.stringify(
  {
    customWorktag07: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    customWorktag01: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    customWorktag13: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    customWorktag15: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    customWorktag08: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    customWorktag14: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    customWorktag02: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    customWorktag04: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    customWorktag09: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    customWorktag06: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    customWorktag05: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    customWorktag03: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    customWorktag10: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    customWorktag11: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    customWorktag12: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    customOrganization10: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    customOrganization06: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    appropriation: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    customOrganization02: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    allocationPool: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    customOrganization03: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    customOrganization04: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    customOrganization05: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    customOrganization01: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    customOrganization07: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    customOrganization08: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    customOrganization09: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    program: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    jobProfile: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    costCenter: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    location: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    grant: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    businessUnit: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    region: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    position: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    fund: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    reportedQuantity: "8",
    gift: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    status: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    unit: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    worker: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    calendarDate: "2024-06-01T07:00:00.000Z",
    timeEntryCode: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    projectRole: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    overrideRate: "3",
    projectPlanPhase: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    inTimeZone: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    outTimeZone: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    inTime: "2024-06-01T07:00:00.000Z",
    outReason: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    outTime: "2024-06-01T07:00:00.000Z",
    project: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    projectPlanTask: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    currency: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
  },
  null,
  2,
);
const postWorkerTimeBlockAdditionalFieldsComments = `${additionalFields.comments} See [Workday API documentation](https://community.workday.com/sites/default/files/file-hosting/restapi/index.html#${SERVICES.timeTracking.slice(1)}/post-/workers/-ID-/workerTimeBlock) for more information.`;

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

const getWorkersParamsComments = `${params.comments} See optional (QUERY-STRING PARAMETERS) at https://community.workday.com/sites/default/files/file-hosting/restapi/index.html#${SERVICES.timeTracking.slice(1)}/get-/workers`;

const updateTimeClockEventsByIdAdditionalFieldsExample = JSON.stringify(
  {
    businessUnit: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    costCenter: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    customWorktag08: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
    worker: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
    },
  },
  null,
  2,
);
const updateTimeClockEventsByIdAdditionalFieldsComments = `${additionalFields.comments} See [Workday API documentation](https://community.workday.com/sites/default/files/file-hosting/restapi/index.html#${SERVICES.timeTracking.slice(1)}/put-/timeClockEvents/-ID-) for more information.`;

const updateWorkerTimeBlockAdditionalFieldsComments = `${postWorkerTimeBlockAdditionalFieldsComments} See [Workday API documentation](https://community.workday.com/sites/default/files/file-hosting/restapi/index.html#${SERVICES.timeTracking.slice(1)}/patch-/workers/-ID-/workerTimeBlock/-subresourceID-) for more information.`;

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
  params,
};

export const getTimeClockEventsByIdInputs = { connection, timeClockEventId };

export const getWorkerByIdInputs = { connection, workerId };

export const getWorkersInputs = {
  connection,
  ...paginationQueryStringInputs,
  params: { ...params, comments: getWorkersParamsComments },
};

export const postWorkerTimeBlockInputs = {
  connection,
  workerId,
  doNotBill,
  comment,
  instanceId: { ...instanceId, required: false },
  instanceDescriptor: { ...instanceDescriptor, required: false },
  additionalFields: {
    ...additionalFields,
    comments: postWorkerTimeBlockAdditionalFieldsComments,
    example: additionalFieldsExample,
  },
};

export const updateTimeClockEventsByIdInputs = {
  connection,
  timeClockEventId,
  clockEventDateTime,
  clockEventTimeZoneId,
  clockEventOverrideRate,
  referenceId,
  clockEventTimeEntryCodeId,
  clockEventProjectPlanTaskId,
  clockEventProjectId,
  clockEventComment,
  additionalFields: {
    ...additionalFields,
    comments: updateTimeClockEventsByIdAdditionalFieldsComments,
    example: updateTimeClockEventsByIdAdditionalFieldsExample,
  },
  instanceDescriptor,
  instanceHref,
  instanceId,
};

export const updateWorkerTimeBlockInputs = {
  workerTimeBlockId,
  ...postWorkerTimeBlockInputs,
  doNotBill: {
    ...postWorkerTimeBlockInputs.doNotBill,
    ...modelBooleanUpdateInput,
    label: postWorkerTimeBlockInputs.doNotBill.label,
  },
  additionalFields: {
    ...additionalFields,
    comments: updateWorkerTimeBlockAdditionalFieldsComments,
    example: additionalFieldsExample,
  },
};
