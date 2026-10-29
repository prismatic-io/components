import type { TriggerPayload } from "@prismatic-io/spectral";

export const pollChangesTriggerV3ExamplePayload = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: {
      data: "",
      contentType: "application/json",
    },
    body: {
      data: {
        created: [
          {
            id: 69306314,
            candidate_id: 57683957,
            job_id: 107761,
            job_post_id: 123,
            referrer_id: 4080,
            source_id: 2,
            recruiter_id: 92120,
            coordinator_id: null,
            stage_id: 2708728,
            stage_name: "Application Review",
            status: "in_process",
            prospect: false,
            needs_decision: false,
            rejection_reason_id: null,
            created_at: "2026-05-20T14:00:00.000Z",
            updated_at: "2026-05-20T14:00:00.000Z",
            last_activity_at: "2026-05-20T14:00:00.000Z",
            custom_fields: {},
            answers: [
              {
                question: "Why do you want to work for us?",
                answer: "Compelling reasons.",
              },
            ],
          },
        ],
        updated: [
          {
            id: 69306509,
            candidate_id: 57683958,
            job_id: 107762,
            job_post_id: 124,
            referrer_id: null,
            source_id: 7,
            recruiter_id: 92120,
            coordinator_id: 92121,
            stage_id: 2708730,
            stage_name: "Offer",
            status: "hired",
            prospect: false,
            needs_decision: false,
            rejection_reason_id: null,
            created_at: "2026-04-01T09:30:00.000Z",
            updated_at: "2026-05-21T10:15:00.000Z",
            last_activity_at: "2026-05-21T10:15:00.000Z",
            custom_fields: {},
            answers: [],
          },
        ],
      },
    },
  } as unknown as TriggerPayload,
};
