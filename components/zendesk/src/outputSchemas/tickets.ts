export const ticketSchema = {
  type: "object" as const,
  properties: {
    additional_collaborators: {
      type: "array",
      items: {
        type: "object",
        properties: {
          email: { type: "string", format: "email" },
          name: { type: "string" },
        },
      },
    },
    allow_attachments: { type: "boolean" },
    allow_channelback: { type: "boolean" },
    assignee_email: { type: "string", format: "email" },
    assignee_id: { type: ["integer", "null"], format: "int64" },
    attribute_value_ids: {
      type: "array",
      items: { type: "integer", format: "int64" },
    },
    brand_id: { type: ["integer", "null"], format: "int64" },
    collaborator_ids: {
      type: "array",
      items: { type: "integer", format: "int64" },
    },
    collaborators: {
      type: "array",
      items: {
        type: "object",
        properties: {
          email: { type: "string", format: "email" },
          name: { type: "string" },
        },
      },
    },
    comment: {
      type: "object",
      properties: {
        add_short_url: { type: "boolean" },
        attachments: {
          type: "array",
          items: {
            type: "object",
            properties: {
              content_type: { type: "string" },
              content_url: { type: "string" },
              deleted: { type: "boolean" },
              file_name: { type: "string" },
              height: { type: "integer" },
              id: { type: "integer", format: "int64" },
              inline: { type: "boolean" },
              malware_access_override: { type: "boolean" },
              malware_scan_result: { type: "string" },
              mapped_content_url: { type: "string" },
              size: { type: "integer" },
              thumbnails: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    content_type: { type: "string" },
                    content_url: { type: "string" },
                    deleted: { type: "boolean" },
                    file_name: { type: "string" },
                    height: { type: "integer" },
                    id: { type: "integer", format: "int64" },
                    inline: { type: "boolean" },
                    malware_access_override: { type: "boolean" },
                    malware_scan_result: { type: "string" },
                    mapped_content_url: { type: "string" },
                    size: { type: "integer" },
                    url: { type: "string" },
                    width: { type: "integer" },
                  },
                },
              },
              url: { type: "string" },
              width: { type: "integer" },
            },
          },
        },
        audit_id: { type: "integer", format: "int64" },
        author_id: { type: ["integer", "null"], format: "int64" },
        body: { type: "string" },
        channel_back: { type: "string" },
        channel_source_id: { type: ["string", "null"] },
        created_at: { type: "string", format: "date-time" },
        html_body: { type: "string" },
        id: { type: "integer", format: "int64" },
        metadata: { type: "object", additionalProperties: true },
        plain_body: { type: "string" },
        public: { type: "boolean" },
        translate_to: { type: ["string", "null"] },
        type: { type: "string" },
        uploads: { type: "array", items: { type: "string" } },
        via: {
          type: "object",
          properties: {
            channel: { type: "string" },
            source: { type: "object", additionalProperties: true },
          },
        },
      },
    },
    created_at: { type: "string", format: "date-time" },
    custom_fields: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer", format: "int64" },
          value: {
            type: ["string", "number", "boolean", "array"],
            items: { type: "string" },
          },
        },
        required: ["id"],
      },
    },
    custom_status_id: { type: ["integer", "null"], format: "int64" },
    description: { type: "string" },
    due_at: { type: ["string", "null"], format: "date-time" },
    email_cc_ids: {
      type: "array",
      items: { type: "integer", format: "int64" },
    },
    email_ccs: {
      type: ["array", "null"],
      items: {
        type: "object",
        properties: {
          action: { type: "string", enum: ["put", "delete"] },
          user_email: { type: "string" },
          user_id: { type: "integer", format: "int64" },
          user_name: { type: ["string", "null"] },
        },
      },
    },
    encoded_id: { type: "string" },
    external_id: { type: ["string", "null"] },
    fields: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer", format: "int64" },
          value: {
            type: ["string", "number", "boolean", "array"],
            items: { type: "string" },
          },
        },
        required: ["id"],
      },
    },
    follower_ids: {
      type: "array",
      items: { type: "integer", format: "int64" },
    },
    followers: {
      type: "array",
      items: {
        type: "object",
        properties: {
          action: { type: "string", enum: ["put", "delete"] },
          user_email: { type: "string", format: "email" },
          user_id: { type: "integer", format: "int64" },
          user_name: { type: ["string", "null"] },
        },
      },
    },
    followup_ids: {
      type: "array",
      items: { type: "integer", format: "int64" },
    },
    forum_topic_id: { type: "integer", format: "int64" },
    from_messaging_channel: { type: "boolean" },
    generated_timestamp: { type: "integer" },
    group_id: { type: ["integer", "null"], format: "int64" },
    has_incidents: { type: "boolean" },
    id: { type: "integer", format: "int64" },
    is_public: { type: "boolean" },
    macro_id: { type: "integer", format: "int64" },
    macro_ids: { type: "array", items: { type: "integer", format: "int64" } },
    metadata: { type: "object", additionalProperties: true },
    organization_id: { type: ["integer", "null"], format: "int64" },
    origin_zrn: { type: "string" },
    priority: {
      type: ["string", "null"],
      enum: ["urgent", "high", "normal", "low"],
    },
    problem_id: { type: ["integer", "null"], format: "int64" },
    raw_subject: { type: "string" },
    recipient: { type: "string" },
    requester: {
      type: ["string", "integer", "object"],
      properties: {
        email: { type: "string", format: "email" },
        locale: { type: "string" },
        locale_id: { type: "integer", format: "int64" },
        name: { type: "string" },
        organization_id: { type: "integer", format: "int64" },
        role: { type: "string" },
        verified: { type: "boolean" },
      },
    },
    requester_id: { type: ["integer", "null"], format: "int64" },
    safe_update: { type: "boolean" },
    satisfaction_probability: { type: "number" },
    satisfaction_rating: { type: "object", additionalProperties: true },
    sharing_agreement_ids: {
      type: "array",
      items: { type: "integer", format: "int64" },
    },
    sharing_agreements: {
      type: ["object", "array"],
      properties: {
        custom_fields: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "integer", format: "int64" },
              value: {
                type: ["string", "number", "boolean", "array"],
                items: { type: "string" },
              },
            },
            required: ["id"],
          },
        },
        id: { type: "integer", format: "int64" },
      },
      items: {
        type: "object",
        properties: {
          custom_fields: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "integer", format: "int64" },
                value: {
                  type: ["string", "number", "boolean", "array"],
                  items: { type: "string" },
                },
              },
              required: ["id"],
            },
          },
          id: { type: "integer", format: "int64" },
        },
      },
    },
    status: {
      type: "string",
      enum: ["new", "open", "pending", "hold", "solved", "closed"],
    },
    subject: { type: ["string", "null"] },
    submitter_id: { type: ["integer", "null"], format: "int64" },
    support_type: { type: ["string", "null"], enum: ["agent", "ai_agent"] },
    suspended_ticket_id: { type: "integer", format: "int64" },
    suspension_type_id: { type: "integer", format: "int64" },
    system_metadata: {
      type: "object",
      properties: {
        client: { type: "string" },
        ip_address: { type: "string" },
      },
    },
    tags: { type: ["array", "string"], items: { type: "string" } },
    tde_workspace: {
      type: "object",
      properties: {
        previous_workspace: {
          type: "object",
          properties: {
            id: { type: "integer", format: "int64" },
            title: { type: "string" },
          },
        },
        type: { type: "string", enum: ["ADD", "CHANGE", "DELETE"] },
        workspace: {
          type: "object",
          properties: {
            id: { type: "integer", format: "int64" },
            title: { type: "string" },
          },
        },
      },
    },
    ticket_form_id: { type: ["integer", "null"], format: "int64" },
    tpe_voice_comment: {
      type: "object",
      properties: {
        agent_id: { type: ["integer", "null"], format: "int64" },
        answering_machine_detection_status: { type: ["string", "null"] },
        app_id: { type: "integer", format: "int64" },
        app_name: { type: ["string", "null"] },
        author_id: { type: "integer", format: "int64" },
        call_connected_at: { type: ["string", "null"], format: "date-time" },
        call_disposition: { type: ["string", "null"] },
        call_ended_at: { type: ["string", "null"], format: "date-time" },
        call_id: { type: "integer", format: "int64" },
        call_recording_consent: { type: ["string", "null"] },
        call_recording_consent_action: { type: ["string", "null"] },
        call_recording_consent_keypress: { type: ["string", "null"] },
        call_started_at: { type: "string", format: "date-time" },
        call_type: { type: ["string", "null"] },
        callback_number: { type: ["string", "null"] },
        callback_requested_at: {
          type: ["string", "null"],
          format: "date-time",
        },
        completion_status: { type: ["string", "null"] },
        connection_attempts: { type: ["integer", "null"] },
        consultation_time: { type: ["integer", "null"] },
        direction: { type: "string" },
        disconnection_reason: { type: ["string", "null"] },
        dnis: { type: ["string", "null"] },
        duration: { type: ["integer", "null"] },
        end_user_id: { type: ["integer", "null"], format: "int64" },
        end_user_location: { type: ["string", "null"] },
        exceeded_queue_time: { type: ["boolean", "null"] },
        extension: { type: ["string", "null"] },
        external_id: { type: "string" },
        from_line: { type: "string" },
        from_line_nickname: { type: ["string", "null"] },
        hold_time: { type: ["integer", "null"] },
        intent: { type: ["string", "null"] },
        ivr_destination_group_name: { type: ["string", "null"] },
        ivr_time_spent: { type: ["integer", "null"] },
        language: { type: ["string", "null"] },
        line_type: { type: "string" },
        longest_hold_time: { type: ["integer", "null"] },
        number_of_holds: { type: ["integer", "null"] },
        outside_business_hours: { type: ["boolean", "null"] },
        overflowed_to: { type: ["string", "null"] },
        phone_name: { type: ["string", "null"] },
        public: { type: "boolean" },
        quality_score: { type: ["integer", "null"] },
        queue_name: { type: ["string", "null"] },
        queue_time: { type: ["integer", "null"] },
        recorded: { type: "boolean" },
        recording_time: { type: ["integer", "null"] },
        recording_type: { type: "string" },
        recording_url: { type: ["string", "null"] },
        sentiment_agent: { type: ["string", "null"] },
        sentiment_call: { type: ["string", "null"] },
        sentiment_customer: { type: ["string", "null"] },
        sentiment_trend: { type: ["string", "null"] },
        short_summary: { type: ["string", "null"] },
        summary: { type: ["string", "null"] },
        talk_time: { type: ["integer", "null"] },
        time_to_answer: { type: ["integer", "null"] },
        title: { type: "string" },
        to_line: { type: "string" },
        to_line_nickname: { type: ["string", "null"] },
        transcript: { type: ["string", "null"] },
        via_id: { type: "integer", format: "int64" },
        video_recording_url: { type: ["string", "null"] },
        voicemail: { type: ["boolean", "null"] },
        voicemail_requested_at: {
          type: ["string", "null"],
          format: "date-time",
        },
        wait_time: { type: ["integer", "null"] },
      },
    },
    type: {
      type: ["string", "null"],
      enum: ["problem", "incident", "question", "task"],
    },
    updated_at: { type: "string", format: "date-time" },
    updated_stamp: { type: "string", format: "date-time" },
    url: { type: "string" },
    via: {
      type: "object",
      properties: {
        channel: { type: ["string", "integer"] },
        source: {
          type: "object",
          properties: {
            from: {
              type: "object",
              properties: {
                address: { type: ["string", "null"] },
                id: { type: ["integer", "null"], format: "int64" },
                name: { type: ["string", "null"] },
                title: { type: ["string", "null"] },
              },
            },
            rel: { type: ["string", "null"] },
            to: {
              type: "object",
              properties: {
                address: { type: "string" },
                name: { type: "string" },
              },
            },
          },
          additionalProperties: true,
        },
      },
    },
    via_followup_source_id: { type: "integer", format: "int64" },
    via_id: { type: "integer", format: "int64" },
    voice_comment: {
      type: "object",
      properties: {
        answered_by_id: { type: ["integer", "null"], format: "int64" },
        call_duration: { type: "integer" },
        from: { type: "string" },
        location: { type: ["string", "null"] },
        recording_url: { type: ["string", "null"] },
        to: { type: "string" },
        transcription_text: { type: ["string", "null"] },
      },
      additionalProperties: true,
    },
  },
};
export const createTicketOutputSchema = ticketSchema;
export const deleteTicketOutputSchema = { type: "string" as const };
export const getByExternalIdOutputSchema = {
  type: "array" as const,
  items: ticketSchema,
};
export const listTicketsByUserOutputSchema = {
  type: "array" as const,
  items: ticketSchema,
};
export const listTicketsOutputSchema = {
  type: "array" as const,
  items: ticketSchema,
};
export const listTicketsToUserOutputSchema = {
  type: "array" as const,
  items: ticketSchema,
};
export const showTicketOutputSchema = ticketSchema;
export const updateTicketOutputSchema = ticketSchema;
