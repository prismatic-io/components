const routingFormQuestionSchema = {
  type: "object",
  properties: {
    uuid: { type: "string" },
    name: { type: "string" },
    type: { type: "string" },
    required: { type: "boolean" },
    answer_choices: {
      type: ["array", "null"],
      items: { type: "string" },
    },
  },
};
const routingFormResource = {
  type: "object",
  properties: {
    uri: { type: "string" },
    organization: { type: "string" },
    name: { type: ["string", "null"] },
    status: { type: "string" },
    questions: {
      type: "array",
      items: routingFormQuestionSchema,
    },
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" },
  },
  required: ["uri", "organization", "status", "created_at", "updated_at"],
};
export const getRoutingFormOutputSchema = {
  type: "object",
  properties: {
    resource: routingFormResource,
  },
  required: ["resource"],
};
export const listRoutingFormsOutputSchema = {
  type: "array",
  items: routingFormResource,
};
const trackingSchema = {
  type: ["object", "null"],
  properties: {
    utm_campaign: { type: ["string", "null"] },
    utm_source: { type: ["string", "null"] },
    utm_medium: { type: ["string", "null"] },
    utm_content: { type: ["string", "null"] },
    utm_term: { type: ["string", "null"] },
    salesforce_uuid: { type: ["string", "null"] },
  },
};
const routingFormSubmissionResource = {
  type: "object",
  properties: {
    uri: { type: "string" },
    routing_form: { type: "string" },
    questions_and_answers: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question_uuid: { type: "string" },
          question: { type: "string" },
          answer: { type: ["string", "null"] },
        },
      },
    },
    tracking: trackingSchema,
    result: {
      type: ["object", "null"],
      properties: {
        type: { type: "string" },
        value: { type: "string" },
      },
    },
    submitter: { type: ["string", "null"] },
    submitter_type: { type: ["string", "null"] },
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" },
  },
  required: ["uri", "routing_form", "created_at", "updated_at"],
};
export const getRoutingFormSubmissionOutputSchema = {
  type: "object",
  properties: {
    resource: routingFormSubmissionResource,
  },
  required: ["resource"],
};
export const listRoutingFormSubmissionsOutputSchema = {
  type: "array",
  items: routingFormSubmissionResource,
};
