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
const questionAndAnswerSchema = {
  type: "object",
  properties: {
    answer: { type: "string" },
    position: { type: "number" },
    question: { type: "string" },
  },
};
const paymentSchema = {
  type: ["object", "null"],
  properties: {
    external_id: { type: "string" },
    provider: { type: "string" },
    amount: { type: "number" },
    currency: { type: "string" },
    terms: { type: ["string", "null"] },
    successful: { type: "boolean" },
  },
};
const reconfirmationSchema = {
  type: ["object", "null"],
  properties: {
    created_at: { type: "string", format: "date-time" },
    confirmed_at: { type: ["string", "null"], format: "date-time" },
  },
};
const inviteeResource = {
  type: "object",
  properties: {
    cancel_url: { type: "string" },
    created_at: { type: "string", format: "date-time" },
    email: { type: "string" },
    event: { type: "string" },
    name: { type: "string" },
    first_name: { type: ["string", "null"] },
    last_name: { type: ["string", "null"] },
    new_invitee: { type: ["string", "null"] },
    old_invitee: { type: ["string", "null"] },
    questions_and_answers: {
      type: "array",
      items: questionAndAnswerSchema,
    },
    reschedule_url: { type: "string" },
    rescheduled: { type: "boolean" },
    status: { type: "string" },
    text_reminder_number: { type: ["string", "null"] },
    timezone: { type: ["string", "null"] },
    tracking: trackingSchema,
    updated_at: { type: "string", format: "date-time" },
    uri: { type: "string" },
    routing_form_submission: { type: ["string", "null"] },
    payment: paymentSchema,
    no_show: {
      type: ["object", "null"],
      properties: {
        uri: { type: "string" },
        created_at: { type: "string", format: "date-time" },
      },
    },
    reconfirmation: reconfirmationSchema,
    scheduling_method: { type: ["string", "null"] },
    invitee_scheduled_by: { type: ["string", "null"] },
  },
  required: ["uri", "email", "event", "status", "created_at", "updated_at"],
};
export const getEventInviteeOutputSchema = {
  type: "object",
  properties: {
    resource: inviteeResource,
  },
  required: ["resource"],
};
export const listEventInviteesOutputSchema = {
  type: "array",
  items: inviteeResource,
};
export const deleteInviteeDataOutputSchema = {
  type: "object",
  properties: {},
};
