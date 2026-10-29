import type {
  PlannerBucket,
  PlannerPlan,
  PlannerPlanDetails,
  PlannerTask,
  PlannerTaskDetails,
} from "@microsoft/microsoft-graph-types";
import type { TriggerPayload } from "@prismatic-io/spectral";
import type { DeleteResult, Etagged, GraphCollectionResponse } from "./types";
const PLAN_ID = "xqQg5FS2LkCp935s-FIFm2QAFkHM";
const BUCKET_ID = "hsOf2dhOJkqyYYZEtdzDe2QAIUCR";
const TASK_ID = "01gzSlKkIUSUl6DF_EilrmQAKDhh";
const GROUP_ID = "ebf3b108-5234-4e22-b93d-656d7dae5874";
const USER_ID = "fbab97d0-4932-4511-b675-204639209557";
const APP_ID = "09abbdfd-ed23-44ee-a2d9-a627aa1c90f3";
const identitySet = {
  application: { displayName: null, id: APP_ID },
  user: { displayName: null, id: USER_ID },
};
const plan: PlannerPlan & Etagged = {
  "@odata.etag": 'W/"JzEtUGxhbiAgQEBAQEBAQEBAQEBAQEBAWCc="',
  id: PLAN_ID,
  title: "Q3 Marketing Launch",
  owner: GROUP_ID,
  createdDateTime: "2024-01-08T16:22:41.3466667Z",
  createdBy: identitySet,
  container: {
    containerId: GROUP_ID,
    type: "group",
    url: `https://graph.microsoft.com/v1.0/groups/${GROUP_ID}`,
  },
};
const bucket: PlannerBucket & Etagged = {
  "@odata.etag": 'W/"JzEtQnVja2V0QEBAQEBAQEBAQEBAQEBAQEBAWCc="',
  id: BUCKET_ID,
  name: "In Review",
  planId: PLAN_ID,
  orderHint: "85752723360752+",
};
const task: PlannerTask & Etagged = {
  "@odata.etag": 'W/"JzEtVGFzayAgQEBAQEBAQEBAQEBAQEBAWCc="',
  id: TASK_ID,
  planId: PLAN_ID,
  bucketId: BUCKET_ID,
  title: "Update the client list",
  orderHint: "8586633654432719852",
  assigneePriority: "8586633654432719852",
  percentComplete: 50,
  priority: 5,
  startDateTime: "2024-01-15T12:00:00Z",
  dueDateTime: "2024-01-22T12:00:00Z",
  createdDateTime: "2024-01-09T09:12:03.1533333Z",
  completedDateTime: null,
  completedBy: null,
  hasDescription: true,
  previewType: "automatic",
  referenceCount: 1,
  checklistItemCount: 2,
  activeChecklistItemCount: 1,
  conversationThreadId: null,
  createdBy: identitySet,
  appliedCategories: { category3: true },
  assignments: {
    [USER_ID]: {
      "@odata.type": "#microsoft.graph.plannerAssignment",
      assignedDateTime: "2024-01-09T09:14:11.2Z",
      orderHint: "8586633654432719852P(",
      assignedBy: identitySet,
    },
  },
};
const completedTask: PlannerTask & Etagged = {
  ...task,
  "@odata.etag": 'W/"JzItVGFzayAgQEBAQEBAQEBAQEBAQEBAWCc="',
  percentComplete: 100,
  completedDateTime: "2024-01-20T15:40:22.7Z",
  completedBy: identitySet,
};
const planDetails: PlannerPlanDetails & Etagged = {
  "@odata.etag": 'W/"JzEtUGxhbkRldGFpbHNAQEBAQEBAQEBAQEBAQEBARCc="',
  id: PLAN_ID,
  sharedWith: { [USER_ID]: true },
  categoryDescriptions: {
    category1: "Blocked",
    category2: "Needs Review",
    category3: "Customer Facing",
    category4: null,
    category5: null,
    category6: null,
    category7: null,
    category8: null,
    category9: null,
    category10: null,
    category11: null,
    category12: null,
    category13: null,
    category14: null,
    category15: null,
    category16: null,
    category17: null,
    category18: null,
    category19: null,
    category20: null,
    category21: null,
    category22: null,
    category23: null,
    category24: null,
    category25: null,
  },
};
const taskDetails: PlannerTaskDetails & Etagged = {
  "@odata.etag": 'W/"JzEtVGFza0RldGFpbHNAQEBAQEBAQEBAQEBAQEBARCc="',
  id: TASK_ID,
  description: "Confirm every contact before the launch.",
  previewType: "description",
  references: {
    "https%3A//example%2Ecom/spec": {
      "@odata.type": "#microsoft.graph.plannerExternalReference",
      alias: "Launch specification",
      type: "Other",
      previewPriority: "8586633654432719852",
      lastModifiedDateTime: "2024-01-09T09:20:44.1Z",
      lastModifiedBy: identitySet,
    },
  },
  checklist: {
    "95e27074-6c4a-447a-aa24-9d718a0b86fa": {
      "@odata.type": "#microsoft.graph.plannerChecklistItem",
      title: "Confirm the mailing address",
      isChecked: true,
      orderHint: "8586633654432719852",
      lastModifiedDateTime: "2024-01-09T09:21:02.4Z",
      lastModifiedBy: identitySet,
    },
    "d280ed1a-9f6b-4f9c-a962-fb4d00dc50ff": {
      "@odata.type": "#microsoft.graph.plannerChecklistItem",
      title: "Verify the contact owner",
      isChecked: false,
      orderHint: "8586633654432719853",
      lastModifiedDateTime: "2024-01-09T09:21:15.9Z",
      lastModifiedBy: identitySet,
    },
  },
};
const planCollectionContext =
  "https://graph.microsoft.com/v1.0/$metadata#planner/plans";
const bucketCollectionContext =
  "https://graph.microsoft.com/v1.0/$metadata#planner/buckets";
const taskCollectionContext =
  "https://graph.microsoft.com/v1.0/$metadata#planner/tasks";
export const listPlansInGroupExamplePayload: {
  data: GraphCollectionResponse<PlannerPlan & Etagged> & {
    truncated: boolean;
  };
} = {
  data: {
    "@odata.context": planCollectionContext,
    value: [plan],
    truncated: false,
  },
};
export const listPlansForUserExamplePayload: {
  data: GraphCollectionResponse<PlannerPlan & Etagged> & {
    truncated: boolean;
  };
} = {
  data: {
    "@odata.context": planCollectionContext,
    value: [plan],
    truncated: false,
  },
};
export const getPlanExamplePayload: {
  data: PlannerPlan & Etagged;
} = { data: plan };
export const createPlanExamplePayload: {
  data: PlannerPlan & Etagged;
} = { data: plan };
export const updatePlanExamplePayload: {
  data: PlannerPlan & Etagged;
} = {
  data: {
    ...plan,
    "@odata.etag": 'W/"JzItUGxhbiAgQEBAQEBAQEBAQEBAQEBAWCc="',
    title: "Q3 Marketing Launch (Revised)",
  },
};
export const deletePlanExamplePayload: {
  data: DeleteResult;
} = {
  data: { success: true, id: PLAN_ID, message: "Plan deleted successfully" },
};
export const getPlanDetailsExamplePayload: {
  data: PlannerPlanDetails & Etagged;
} = {
  data: planDetails,
};
export const updatePlanDetailsExamplePayload: {
  data: PlannerPlanDetails & Etagged;
} = {
  data: planDetails,
};
export const listBucketsInPlanExamplePayload: {
  data: GraphCollectionResponse<PlannerBucket & Etagged> & {
    truncated: boolean;
  };
} = {
  data: {
    "@odata.context": bucketCollectionContext,
    value: [bucket],
    truncated: false,
  },
};
export const getBucketExamplePayload: {
  data: PlannerBucket & Etagged;
} = { data: bucket };
export const createBucketExamplePayload: {
  data: PlannerBucket & Etagged;
} = { data: bucket };
export const updateBucketExamplePayload: {
  data: PlannerBucket & Etagged;
} = {
  data: {
    ...bucket,
    "@odata.etag": 'W/"JzItQnVja2V0QEBAQEBAQEBAQEBAQEBAQEBAWCc="',
    name: "Ready to Ship",
  },
};
export const deleteBucketExamplePayload: {
  data: DeleteResult;
} = {
  data: {
    success: true,
    id: BUCKET_ID,
    message: "Bucket deleted successfully",
  },
};
export const listTasksInPlanExamplePayload: {
  data: GraphCollectionResponse<PlannerTask & Etagged> & {
    truncated: boolean;
  };
} = {
  data: {
    "@odata.context": taskCollectionContext,
    value: [task],
    truncated: false,
  },
};
export const listTasksInBucketExamplePayload: {
  data: GraphCollectionResponse<PlannerTask & Etagged> & {
    truncated: boolean;
  };
} = {
  data: {
    "@odata.context": taskCollectionContext,
    value: [task],
    truncated: false,
  },
};
export const listTasksForUserExamplePayload: {
  data: GraphCollectionResponse<PlannerTask & Etagged> & {
    truncated: boolean;
  };
} = {
  data: {
    "@odata.context": taskCollectionContext,
    value: [task],
    truncated: false,
  },
};
export const getTaskExamplePayload: {
  data: PlannerTask & Etagged;
} = { data: task };
export const createTaskExamplePayload: {
  data: {
    task: PlannerTask & Etagged;
    details: (PlannerTaskDetails & Etagged) | null;
  };
} = {
  data: { task, details: taskDetails },
};
export const updateTaskExamplePayload: {
  data: PlannerTask & Etagged;
} = {
  data: {
    ...task,
    "@odata.etag": 'W/"JzItVGFzayAgQEBAQEBAQEBAQEBAQEBAWCc="',
    title: "Update the client list before launch",
  },
};
export const deleteTaskExamplePayload: {
  data: DeleteResult;
} = {
  data: { success: true, id: TASK_ID, message: "Task deleted successfully" },
};
export const getTaskDetailsExamplePayload: {
  data: PlannerTaskDetails & Etagged;
} = {
  data: taskDetails,
};
export const updateTaskDetailsExamplePayload: {
  data: PlannerTaskDetails & Etagged;
} = {
  data: taskDetails,
};
export const completeTaskExamplePayload: {
  data: PlannerTask & Etagged;
} = { data: completedTask };
export const assignTaskExamplePayload: {
  data: PlannerTask & Etagged;
} = {
  data: { ...task, "@odata.etag": 'W/"JzItVGFzayAgQEBAQEBAQEBAQEBAQEBAWCc="' },
};
export const moveTaskToBucketExamplePayload: {
  data: PlannerTask & Etagged;
} = {
  data: {
    ...task,
    "@odata.etag": 'W/"JzItVGFzayAgQEBAQEBAQEBAQEBAQEBAWCc="',
    bucketId: "vNZfhYs0GkWQ2Bo0R0h3upcAG5rB",
  },
};
export const rawRequestExamplePayload = {
  data: { "@odata.context": planCollectionContext, value: [plan] },
};
export const selectPlanExamplePayload = {
  result: [{ label: "Q3 Marketing Launch", key: PLAN_ID }],
};
export const selectBucketExamplePayload = {
  result: [{ label: "In Review", key: BUCKET_ID }],
};
export const selectTaskExamplePayload = {
  result: [{ label: "Update the client list", key: TASK_ID }],
};
export const selectGroupExamplePayload = {
  result: [{ label: "Marketing", key: GROUP_ID }],
};
export const selectUserExamplePayload = {
  result: [{ label: "Jane Smith", key: USER_ID }],
};
export const pollChangesTriggerExamplePayload: {
  payload: TriggerPayload;
  polledNoChanges: boolean;
} = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: null },
    body: { data: { created: [task] } },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId:
      "SW5zdGFuY2VFeGVjdXRpb25SZXN1bHQ6ZjMwZjk4NDgtNzk1Ny00ZTBmLTk5NzMtMTU5NzZlNzAwZjA5",
    customer: {
      id: "Q3VzdG9tZXI6ZTU5YQ==",
      externalId: "abc-123",
      name: "Contoso",
    },
    instance: { id: "SW5zdGFuY2U6NTU1", name: "Contoso Planner Sync" },
    user: {
      id: "VXNlcjo3ODk=",
      email: "jane@example.com",
      name: "Jane Smith",
      externalId: "user-789",
    },
    integration: {
      id: "SW50ZWdyYXRpb246MTIz",
      name: "Planner Task Sync",
      versionSequenceId: "SW50ZWdyYXRpb25WZXJzaW9uOjQ1Ng==",
      externalVersion: "1.0.0",
    },
    flow: {
      id: "SW50ZWdyYXRpb25GbG93Ojk5OQ==",
      name: "New Tasks",
      stableId: "new-tasks",
    },
    startedAt: "2024-01-22T14:05:00.000Z",
    globalDebug: false,
  },
  polledNoChanges: false,
};
