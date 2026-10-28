export const archiveBatchEngagementExamplePayload = { data: "" };
export const createBatchEngagementExamplePayload = {
  data: {
    status: "COMPLETE",
    results: [
      {
        id: "47231018154",
        properties: {
          hs_body_preview: "Follow up with John Doe about the proposal",
          hs_body_preview_html:
            "<html>\n <head></head>\n <body>\n Follow up with John Doe about the proposal\n </body>\n</html>",
          hs_body_preview_is_truncated: "false",
          hs_createdate: "2024-01-15T14:09:49.695Z",
          hs_lastmodifieddate: "2024-01-15T14:09:49.695Z",
          hs_object_id: "47231018154",
          hs_object_source: "INTEGRATION",
          hs_object_source_id: "654321",
          hs_object_source_label: "INTEGRATION",
          hs_pipeline_stage: "dd5826e4-c976-4654-a527-b59ada512345",
          hs_task_body: "Follow up with John Doe about the proposal",
          hs_task_completion_count: "0",
          hs_task_family: "SALES",
          hs_task_for_object_type: "OWNER",
          hs_task_is_all_day: "false",
          hs_task_is_completed: "0",
          hs_task_is_completed_call: "0",
          hs_task_is_completed_email: "0",
          hs_task_is_completed_linked_in: "0",
          hs_task_is_completed_sequence: "0",
          hs_task_is_overdue: "false",
          hs_task_is_past_due_date: "false",
          hs_task_missed_due_date: "false",
          hs_task_missed_due_date_count: "0",
          hs_task_priority: "HIGH",
          hs_task_status: "WAITING",
          hs_task_subject: "Follow up: Q1 2024 Proposal",
          hs_task_type: "CALL",
          hs_timestamp: "2024-01-16T15:30:00.000Z",
        },
        createdAt: "2024-01-15T14:09:49.695Z",
        updatedAt: "2024-01-15T14:09:49.695Z",
        archived: false,
      },
    ],
    startedAt: "2024-01-15T14:09:49.666Z",
    completedAt: "2024-01-15T14:09:49.903Z",
  },
};
export const createEngagementExamplePayload = {
  data: {
    id: "47231018317",
    properties: {
      hs_body_preview: "Schedule demo for new product features",
      hs_body_preview_html:
        "<html>\n <head></head>\n <body>\n Schedule demo for new product features\n </body>\n</html>",
      hs_body_preview_is_truncated: "false",
      hs_createdate: "2024-01-15T21:27:23.876Z",
      hs_lastmodifieddate: "2024-01-15T21:27:23.876Z",
      hs_object_id: "47231018317",
      hs_object_source: "INTEGRATION",
      hs_object_source_id: "789012",
      hs_object_source_label: "INTEGRATION",
      hs_task_body: "Schedule demo for new product features",
      hs_task_completion_count: "0",
      hs_task_family: "SALES",
      hs_task_for_object_type: "OWNER",
      hs_task_is_all_day: "false",
      hs_task_is_completed: "0",
      hs_task_is_completed_call: "0",
      hs_task_is_completed_email: "0",
      hs_task_is_completed_linked_in: "0",
      hs_task_is_completed_sequence: "0",
      hs_task_is_overdue: "false",
      hs_task_is_past_due_date: "false",
      hs_task_missed_due_date: "false",
      hs_task_missed_due_date_count: "0",
      hs_task_priority: "MEDIUM",
      hs_task_status: "NOT_STARTED",
      hs_task_subject: "Product Demo: Enterprise Plan",
      hs_task_type: "TODO",
      hs_timestamp: "2024-01-18T14:00:00.000Z",
    },
    createdAt: "2024-01-15T21:27:23.876Z",
    updatedAt: "2024-01-15T21:27:23.876Z",
    archived: false,
  },
};
export const deleteEngagementExamplePayload = { data: "" };
export const getEngagementExamplePayload = {
  data: {
    id: "47231018154",
    properties: {
      hs_createdate: "2024-01-15T01:42:51.758Z",
      hs_lastmodifieddate: "2024-01-15T01:42:51.950Z",
      hs_object_id: "47231018154",
      hs_task_body:
        '<div style="" dir="auto" data-top-level="true">Review contract terms and prepare questions for legal team.</div>',
      hs_task_subject: "Contract Review Meeting Prep",
      hs_task_type: "TODO",
      hs_task_status: "NOT_STARTED",
      hs_task_priority: "HIGH",
      hs_timestamp: "2024-01-16T14:00:00Z",
    },
    propertiesWithHistory: {
      hs_task_body: [
        {
          value:
            '<div style="" dir="auto" data-top-level="true">Review contract terms and prepare questions for legal team.</div>',
          timestamp: "2024-01-15T01:42:51.758Z",
          sourceType: "CRM_UI",
          sourceId: "userId:45678",
          updatedByUserId: 45678,
        },
      ],
    },
    createdAt: "2024-01-15T01:42:51.758Z",
    updatedAt: "2024-01-15T01:42:51.950Z",
    archived: false,
  },
};
export const listEngagementsExamplePayload = {
  data: [
    {
      id: "47231018154",
      properties: {
        hs_createdate: "2024-01-15T01:42:51.758Z",
        hs_lastmodifieddate: "2024-01-15T01:42:51.950Z",
        hs_object_id: "47231018154",
        hs_task_subject: "Follow up call",
        hs_task_type: "CALL",
        hs_task_status: "COMPLETED",
      },
      createdAt: "2024-01-15T01:42:51.758Z",
      updatedAt: "2024-01-15T01:42:51.950Z",
      archived: false,
    },
    {
      id: "47231018317",
      properties: {
        hs_createdate: "2024-01-15T01:43:03.422Z",
        hs_lastmodifieddate: "2024-01-15T01:43:03.891Z",
        hs_object_id: "47231018317",
        hs_task_subject: "Send proposal",
        hs_task_type: "TODO",
        hs_task_status: "NOT_STARTED",
      },
      createdAt: "2024-01-15T01:43:03.422Z",
      updatedAt: "2024-01-15T01:43:03.891Z",
      archived: false,
    },
  ],
};
export const updateBatchEngagementExamplePayload = {
  data: {
    status: "COMPLETE",
    results: [
      {
        id: "47231018154",
        properties: {
          hs_body_preview: "Updated task description",
          hs_body_preview_html:
            "<html>\n <head></head>\n <body>\n Updated task description\n </body>\n</html>",
          hs_body_preview_is_truncated: "false",
          hs_createdate: "2024-01-15T02:31:49.230Z",
          hs_lastmodifieddate: "2024-01-15T02:31:49.651Z",
          hs_object_id: "47231018154",
          hs_pipeline_stage: "dd5826e4-c976-4654-a527-b59ada512345",
          hs_task_body: "Updated task description",
          hs_task_status: "COMPLETED",
        },
        createdAt: "2024-01-15T02:31:49.230Z",
        updatedAt: "2024-01-15T02:31:49.651Z",
        archived: false,
      },
    ],
    startedAt: "2024-01-15T02:31:49.629Z",
    completedAt: "2024-01-15T02:31:49.703Z",
  },
};
export const updateEngagementExamplePayload = {
  data: {
    id: "47231018317",
    properties: {
      hs_body_preview: "Task completed successfully",
      hs_body_preview_html:
        "<html>\n <head></head>\n <body>\n Task completed successfully\n </body>\n</html>",
      hs_body_preview_is_truncated: "false",
      hs_createdate: "2024-01-15T22:04:01.144Z",
      hs_lastmodifieddate: "2024-01-15T22:04:01.871Z",
      hs_object_id: "47231018317",
      hs_task_body: "Task completed successfully",
      hs_task_status: "COMPLETED",
    },
    createdAt: "2024-01-15T22:04:01.144Z",
    updatedAt: "2024-01-15T22:04:01.871Z",
    archived: false,
  },
};
