import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";

export const defaultWebhookTriggerMessageBody = {
  current_user: {
    details: "{{current_user.details}}",
    email: "{{current_user.email}}",
    external_id: "{{current_user.external_id}}",
    first_name: "{{current_user.first_name}}",
    language: "{{current_user.language}}",
    name: "{{current_user.name}}",
    notes: "{{current_user.notes}}",
    "organization.details": "{{current_user.organization.details}}",
    "organization.name": "{{current_user.organization.name}}",
    "organization.notes": "{{current_user.organization.notes}}",
    phone: "{{current_user.phone}}",
    tags: "{{current_user.tags}}",
  },
  ticket: {
    account: "{{ticket.account}}",
    assignee: {
      first_name: "{{ticket.assignee.first_name}}",
      last_name: "{{ticket.assignee.last_name}}",
      name: "{{ticket.assignee.name}}",
    },
    brand: {
      name: "{{ticket.brand.name}}",
    },
    cc_names: "{{ticket.cc_names}}",
    ccs: "{{ticket.ccs}}",
    comments_formatted: "{{ticket.comments_formatted}}",
    description: "{{ticket.description}}",
    due_date: "{{ticket.due_date}}",
    email_cc_names: "{{ticket.email_cc_names}}",
    email_ccs: "{{ticket.email_ccs}}",
    external_id: "{{ticket.external_id}}",
    follower_names: "{{ticket.follower_names}}",
    follower_reply_type_message: "{{ticket.follower_reply_type_message}}",
    followers: "{{ticket.followers}}",
    group: {
      name: "{{ticket.group.name}}",
    },
    id: "{{ticket.id}}",
    in_business_hours: "{{ticket.in_business_hours}}",
    latest_comment_formatted: "{{ticket.latest_comment_formatted}}",
    latest_public_comment_formatted:
      "{{ticket.latest_public_comment_formatted}}",
    link: "{{ticket.link}}",
    organization: {
      external_id: "{{ticket.organization.external_id}}",
      name: "{{ticket.organization.name}}",
    },
    priority: "{{ticket.priority}}",
    public_comments_formatted: "{{ticket.public_comments_formatted}}",
    requester: {
      email: "{{ticket.requester.email}}",
      external_id: "{{ticket.requester.external_id}}",
      first_name: "{{ticket.requester.first_name}}",
      language: "{{ticket.requester.language}}",
      last_name: "{{ticket.requester.last_name}}",
      name: "{{ticket.requester.name}}",
      phone: "{{ticket.requester.phone}}",
    },
    status: "{{ticket.status}}",
    tags: "{{ticket.tags}}",
    ticket_field_ID: "{{ticket.ticket_field_ID}}",
    ticket_field_option_title_ID: "{{ticket.ticket_field_option_title_ID}}",
    ticket_form: "{{ticket.ticket_form}}",
    ticket_type: "{{ticket.ticket_type}}",
    title: "{{ticket.title}}",
    via: "{{ticket.via}}",
  },
};

export const defaultWebhookTriggerConditions = {
  all: [],
  any: [
    { field: "status", operator: "changed" },
    { field: "status", operator: "not_changed" },
  ],
};

export interface ZendeskTrigger {
  id: string;
  title: string;
}

export const fetchTriggers = async (client: HttpClient) => {
  let triggers: ZendeskTrigger[] = [];
  let after = null;
  let hasMore = false;
  do {
    const { data } = await client.get("/triggers", {
      params: { "page[after]": after },
    });
    triggers = [...triggers, ...data.triggers];
    hasMore = data.meta?.has_more;
    after = data.meta?.after_cursor;
  } while (hasMore);
  return triggers;
};
