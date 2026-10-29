const userIdObjectSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
    email: { type: "string" },
    has_pic: { type: "integer" },
    pic_hash: { type: ["string", "null"] },
    active_flag: { type: "boolean" },
    value: { type: "integer" },
  },
};

const personIdObjectSchema = {
  type: "object",
  properties: {
    active_flag: { type: "boolean" },
    name: { type: "string" },
    email: {
      type: "array",
      items: {
        type: "object",
        properties: {
          value: { type: "string" },
          primary: { type: "boolean" },
        },
      },
    },
    phone: {
      type: "array",
      items: {
        type: "object",
        properties: {
          value: { type: "string" },
          primary: { type: "boolean" },
        },
      },
    },
    owner_id: { type: "integer" },
    value: { type: "integer" },
  },
};

const orgIdObjectSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    people_count: { type: "integer" },
    owner_id: { type: "integer" },
    address: { type: ["string", "null"] },
    active_flag: { type: "boolean" },
    cc_email: { type: "string" },
    label_ids: { type: "array", items: { type: "integer" } },
    owner_name: { type: "string" },
    value: { type: "integer" },
  },
};

const singleDealSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    creator_user_id: userIdObjectSchema,
    user_id: userIdObjectSchema,
    person_id: personIdObjectSchema,
    org_id: orgIdObjectSchema,
    stage_id: { type: "integer" },
    title: { type: "string" },
    value: { type: "number" },
    currency: { type: "string" },
    add_time: { type: ["string", "null"] },
    update_time: { type: ["string", "null"] },
    stage_change_time: { type: ["string", "null"] },
    active: { type: "boolean" },
    deleted: { type: "boolean" },
    status: { type: "string" },
    probability: { type: ["number", "null"] },
    next_activity_date: { type: ["string", "null"] },
    next_activity_time: { type: ["string", "null"] },
    next_activity_id: { type: ["integer", "null"] },
    last_activity_id: { type: ["integer", "null"] },
    last_activity_date: { type: ["string", "null"] },
    lost_reason: { type: ["string", "null"] },
    visible_to: { type: "string" },
    close_time: { type: ["string", "null"] },
    pipeline_id: { type: "integer" },
    won_time: { type: ["string", "null"] },
    first_won_time: { type: ["string", "null"] },
    lost_time: { type: ["string", "null"] },
    products_count: { type: "integer" },
    files_count: { type: "integer" },
    notes_count: { type: "integer" },
    followers_count: { type: "integer" },
    email_messages_count: { type: "integer" },
    activities_count: { type: "integer" },
    done_activities_count: { type: "integer" },
    undone_activities_count: { type: "integer" },
    participants_count: { type: "integer" },
    expected_close_date: { type: ["string", "null"] },
    last_incoming_mail_time: { type: ["string", "null"] },
    last_outgoing_mail_time: { type: ["string", "null"] },
    label: { type: ["string", "null"] },
    local_won_date: { type: ["string", "null"] },
    local_lost_date: { type: ["string", "null"] },
    local_close_date: { type: ["string", "null"] },
    origin: { type: ["string", "null"] },
    origin_id: { type: ["string", "null"] },
    channel: { type: ["string", "null"] },
    channel_id: { type: ["string", "null"] },
    stage_order_nr: { type: "integer" },
    person_name: { type: ["string", "null"] },
    org_name: { type: ["string", "null"] },
    next_activity_subject: { type: ["string", "null"] },
    next_activity_type: { type: ["string", "null"] },
    next_activity_duration: { type: ["string", "null"] },
    next_activity_note: { type: ["string", "null"] },
    formatted_value: { type: "string" },
    weighted_value: { type: "number" },
    formatted_weighted_value: { type: "string" },
    weighted_value_currency: { type: "string" },
    rotten_time: { type: ["string", "null"] },
    owner_name: { type: "string" },
    cc_email: { type: "string" },
    org_hidden: { type: "boolean" },
    person_hidden: { type: "boolean" },
  },
};

export const getDealsOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "array",
      items: singleDealSchema,
    },
    additional_data: {
      type: "object",
      properties: {
        next_cursor: { type: ["string", "null"] },
      },
    },
  },
};

export const addDealOutputSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: singleDealSchema,
  },
};

export const getDealOutputSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: singleDealSchema,
  },
};

export const updateDealOutputSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: singleDealSchema,
  },
};

export const deleteDealOutputSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: {
      type: "object",
      properties: {
        id: { type: "integer" },
      },
    },
  },
};

export const searchDealsOutputSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: {
      type: "object",
      properties: {
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              result_score: { type: "number" },
              item: {
                type: "object",
                properties: {
                  id: { type: "integer" },
                  type: { type: "string" },
                  title: { type: "string" },
                  value: { type: "number" },
                  currency: { type: "string" },
                  status: { type: "string" },
                  visible_to: { type: "integer" },
                  owner: {
                    type: "object",
                    properties: {
                      id: { type: "integer" },
                    },
                  },
                  stage: {
                    type: "object",
                    properties: {
                      id: { type: "integer" },
                      name: { type: "string" },
                    },
                  },
                  person: {
                    type: "object",
                    properties: {
                      id: { type: "integer" },
                      name: { type: "string" },
                    },
                  },
                  organization: {
                    type: "object",
                    properties: {
                      id: { type: "integer" },
                      name: { type: "string" },
                    },
                  },
                  custom_fields: { type: "array" },
                  notes: { type: "array" },
                },
              },
            },
          },
        },
      },
    },
    additional_data: {
      type: "object",
      properties: {
        pagination: {
          type: "object",
          properties: {
            start: { type: "integer" },
            limit: { type: "integer" },
            more_items_in_collection: { type: "boolean" },
          },
        },
      },
    },
  },
};

export const getDealsSummaryOutputSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: {
      type: "object",
      properties: {
        values_total: { type: "object" },
        weighted_values_total: { type: "object" },
        total_count: { type: "integer" },
        total_currency_converted_value: { type: "number" },
        total_currency_converted_value_formatted: { type: "string" },
        total_weighted_currency_converted_value: { type: "number" },
        total_weighted_currency_converted_value_formatted: { type: "string" },
      },
    },
  },
};

export const getDealsTimelineOutputSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: {
      type: "object",
      properties: {
        totals: {
          type: "object",
          properties: {
            count: { type: "integer" },
            values: { type: "object" },
            weighted_values: { type: "object" },
            open_count: { type: "integer" },
            won_count: { type: "integer" },
            lost_count: { type: "integer" },
          },
        },
        periods: {
          type: "array",
          items: {
            type: "object",
            properties: {
              period_start: { type: "string" },
              period_end: { type: "string" },
              deals: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "integer" },
                    creator_user_id: { type: "integer" },
                    user_id: { type: "integer" },
                    person_id: { type: "integer" },
                    org_id: { type: "integer" },
                    stage_id: { type: "integer" },
                    title: { type: "string" },
                    value: { type: "number" },
                    currency: { type: "string" },
                    add_time: { type: "string" },
                    status: { type: "string" },
                    pipeline_id: { type: "integer" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const mergeDealsOutputSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: {
      type: "object",
      properties: {
        id: { type: "integer" },
        creator_user_id: { type: "integer" },
        user_id: { type: "integer" },
        person_id: { type: "integer" },
        org_id: { type: "integer" },
        stage_id: { type: "integer" },
        title: { type: "string" },
        value: { type: "number" },
        currency: { type: "string" },
        add_time: { type: ["string", "null"] },
        update_time: { type: ["string", "null"] },
        stage_change_time: { type: ["string", "null"] },
        active: { type: "boolean" },
        deleted: { type: "boolean" },
        status: { type: "string" },
        probability: { type: ["number", "null"] },
        next_activity_date: { type: ["string", "null"] },
        next_activity_time: { type: ["string", "null"] },
        next_activity_id: { type: ["integer", "null"] },
        last_activity_id: { type: ["integer", "null"] },
        last_activity_date: { type: ["string", "null"] },
        lost_reason: { type: ["string", "null"] },
        visible_to: { type: "string" },
        close_time: { type: ["string", "null"] },
        pipeline_id: { type: "integer" },
        won_time: { type: ["string", "null"] },
        first_won_time: { type: ["string", "null"] },
        lost_time: { type: ["string", "null"] },
        products_count: { type: "integer" },
        files_count: { type: "integer" },
        notes_count: { type: "integer" },
        followers_count: { type: "integer" },
        email_messages_count: { type: "integer" },
        activities_count: { type: "integer" },
        done_activities_count: { type: "integer" },
        undone_activities_count: { type: "integer" },
        participants_count: { type: "integer" },
        expected_close_date: { type: ["string", "null"] },
        last_incoming_mail_time: { type: ["string", "null"] },
        last_outgoing_mail_time: { type: ["string", "null"] },
        label: { type: ["string", "null"] },
        stage_order_nr: { type: "integer" },
        person_name: { type: ["string", "null"] },
        org_name: { type: ["string", "null"] },
        next_activity_subject: { type: ["string", "null"] },
        next_activity_type: { type: ["string", "null"] },
        next_activity_duration: { type: ["string", "null"] },
        next_activity_note: { type: ["string", "null"] },
        formatted_value: { type: "string" },
        weighted_value: { type: "number" },
        formatted_weighted_value: { type: "string" },
        weighted_value_currency: { type: "string" },
        rotten_time: { type: ["string", "null"] },
        owner_name: { type: "string" },
        cc_email: { type: "string" },
        merge_what_id: { type: "integer" },
      },
    },
  },
};

export const getDealActivitiesOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          company_id: { type: "integer" },
          user_id: { type: "integer" },
          done: { type: "boolean" },
          type: { type: "string" },
          reference_type: { type: ["string", "null"] },
          reference_id: { type: ["integer", "null"] },
          conference_meeting_client: { type: ["string", "null"] },
          conference_meeting_url: { type: ["string", "null"] },
          conference_meeting_id: { type: ["string", "null"] },
          due_date: { type: ["string", "null"] },
          due_time: { type: ["string", "null"] },
          duration: { type: ["string", "null"] },
          busy_flag: { type: "boolean" },
          add_time: { type: "string" },
          marked_as_done_time: { type: ["string", "null"] },
          last_notification_time: { type: ["string", "null"] },
          last_notification_user_id: { type: ["integer", "null"] },
          notification_language_id: { type: ["integer", "null"] },
          subject: { type: "string" },
          public_description: { type: ["string", "null"] },
          org_id: { type: ["integer", "null"] },
          person_id: { type: ["integer", "null"] },
          deal_id: { type: ["integer", "null"] },
          lead_id: { type: ["string", "null"] },
          project_id: { type: ["integer", "null"] },
          active_flag: { type: "boolean" },
          update_time: { type: "string" },
          update_user_id: { type: ["integer", "null"] },
          source_timezone: { type: ["string", "null"] },
          rec_rule: { type: ["string", "null"] },
          rec_rule_extension: { type: ["string", "null"] },
          rec_master_activity_id: { type: ["integer", "null"] },
          note: { type: ["string", "null"] },
          created_by_user_id: { type: "integer" },
          location: { type: ["string", "null"] },
          participants: {
            type: "array",
            items: {
              type: "object",
              properties: {
                person_id: { type: "integer" },
                primary_flag: { type: "boolean" },
              },
            },
          },
          org_name: { type: ["string", "null"] },
          person_name: { type: ["string", "null"] },
          deal_title: { type: ["string", "null"] },
          owner_name: { type: "string" },
          person_dropbox_bcc: { type: ["string", "null"] },
          deal_dropbox_bcc: { type: ["string", "null"] },
          assigned_to_user_id: { type: "integer" },
          file: { type: ["object", "null"] },
        },
      },
    },
    additional_data: {
      type: "object",
      properties: {
        next_cursor: { type: ["string", "null"] },
      },
    },
  },
};

export const getDealFilesOutputSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          user_id: { type: "integer" },
          deal_id: { type: ["integer", "null"] },
          person_id: { type: ["integer", "null"] },
          org_id: { type: ["integer", "null"] },
          product_id: { type: ["integer", "null"] },
          activity_id: { type: ["integer", "null"] },
          lead_id: { type: ["string", "null"] },
          log_id: { type: ["integer", "null"] },
          add_time: { type: "string" },
          update_time: { type: "string" },
          file_name: { type: "string" },
          file_type: { type: "string" },
          file_size: { type: "integer" },
          active_flag: { type: "boolean" },
          inline_flag: { type: "boolean" },
          remote_location: { type: "string" },
          remote_id: { type: "string" },
          cid: { type: ["string", "null"] },
          s3_bucket: { type: ["string", "null"] },
          mail_message_id: { type: ["integer", "null"] },
          mail_template_id: { type: ["integer", "null"] },
          deal_name: { type: ["string", "null"] },
          person_name: { type: ["string", "null"] },
          org_name: { type: ["string", "null"] },
          product_name: { type: ["string", "null"] },
          lead_name: { type: ["string", "null"] },
          url: { type: "string" },
          name: { type: "string" },
          description: { type: ["string", "null"] },
        },
      },
    },
    additional_data: {
      type: "object",
      properties: {
        pagination: {
          type: "object",
          properties: {
            start: { type: "integer" },
            limit: { type: "integer" },
            more_items_in_collection: { type: "boolean" },
          },
        },
      },
    },
  },
};

export const getDealFollowersOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          user_id: { type: "integer" },
          id: { type: "integer" },
          person_id: { type: ["integer", "null"] },
          deal_id: { type: "integer" },
          add_time: { type: "string" },
        },
      },
    },
    additional_data: {
      type: "object",
      properties: {
        next_cursor: { type: ["string", "null"] },
      },
    },
  },
};

export const addDealFollowerOutputSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: {
      type: "object",
      properties: {
        user_id: { type: "integer" },
        id: { type: "integer" },
        deal_id: { type: "integer" },
        add_time: { type: "string" },
      },
    },
  },
};

export const deleteDealFollowerOutputSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: {
      type: "object",
      properties: {
        id: { type: "integer" },
      },
    },
  },
};

export const getDealMailMessagesOutputSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          from: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "integer" },
                name: { type: "string" },
                email_address: { type: "string" },
                linked_person_id: { type: ["integer", "null"] },
                linked_person_name: { type: ["string", "null"] },
                mail_message_party_id: { type: "integer" },
              },
            },
          },
          to: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "integer" },
                name: { type: "string" },
                email_address: { type: "string" },
                linked_person_id: { type: ["integer", "null"] },
                linked_person_name: { type: ["string", "null"] },
                mail_message_party_id: { type: "integer" },
              },
            },
          },
          cc: { type: "array" },
          bcc: { type: "array" },
          body_url: { type: "string" },
          account_id: { type: "string" },
          user_id: { type: "integer" },
          mail_thread_id: { type: "integer" },
          subject: { type: "string" },
          snippet: { type: "string" },
          read_flag: { type: "integer" },
          draft: { type: ["string", "null"] },
          has_body_flag: { type: "integer" },
          sent_flag: { type: "integer" },
          sent_from_pipedrive_flag: { type: "integer" },
          message_time: { type: "string" },
          add_time: { type: "string" },
          update_time: { type: "string" },
          has_attachments_flag: { type: "integer" },
          has_inline_attachments_flag: { type: "integer" },
          has_real_attachments_flag: { type: "integer" },
          write_flag: { type: "boolean" },
          deal_id: { type: ["integer", "null"] },
          deal_name: { type: ["string", "null"] },
          item_type: { type: "string" },
        },
      },
    },
    additional_data: {
      type: "object",
      properties: {
        pagination: {
          type: "object",
          properties: {
            start: { type: "integer" },
            limit: { type: "integer" },
            more_items_in_collection: { type: "boolean" },
          },
        },
      },
    },
  },
};

const participantPersonSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    company_id: { type: "integer" },
    active_flag: { type: "boolean" },
    phone: {
      type: "array",
      items: {
        type: "object",
        properties: {
          value: { type: "string" },
          primary: { type: "boolean" },
        },
      },
    },
    email: {
      type: "array",
      items: {
        type: "object",
        properties: {
          value: { type: "string" },
          primary: { type: "boolean" },
        },
      },
    },
    first_char: { type: "string" },
    add_time: { type: "string" },
    update_time: { type: "string" },
    visible_to: { type: "string" },
    name: { type: "string" },
    owner_id: { type: "integer" },
  },
};

const participantSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    related_item_id: { type: "integer" },
    related_item_type: { type: "string" },
    person: participantPersonSchema,
    added_time: { type: "string" },
    related_item_data: {
      type: "object",
      properties: {
        id: { type: "integer" },
        title: { type: "string" },
        status: { type: "string" },
        value: { type: "number" },
        currency: { type: "string" },
      },
    },
  },
};

export const getDealParticipantsOutputSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: {
      type: "array",
      items: participantSchema,
    },
    additional_data: {
      type: "object",
      properties: {
        pagination: {
          type: "object",
          properties: {
            start: { type: "integer" },
            limit: { type: "integer" },
            more_items_in_collection: { type: "boolean" },
          },
        },
      },
    },
  },
};

export const addDealParticipantOutputSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: participantSchema,
  },
};

export const deleteDealParticipantOutputSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: {
      type: "object",
      properties: {
        id: { type: "integer" },
      },
    },
  },
};

export const getDealUsersOutputSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: {
      type: "array",
      items: { type: "integer" },
    },
  },
};

const dealProductSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    deal_id: { type: "integer" },
    product_id: { type: "integer" },
    product_variation_id: { type: ["integer", "null"] },
    order_nr: { type: "integer" },
    name: { type: "string" },
    item_price: { type: "number" },
    quantity: { type: "number" },
    discount: { type: "number" },
    discount_type: { type: "string" },
    sum: { type: "number" },
    currency: { type: "string" },
    is_enabled: { type: "boolean" },
    add_time: { type: "string" },
    last_edit: { type: "string" },
    comments: { type: ["string", "null"] },
    active_flag: { type: "boolean" },
    tax: { type: "number" },
    tax_method: { type: "string" },
  },
};

export const getDealProductsOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "array",
      items: {
        ...dealProductSchema,
        properties: {
          ...(dealProductSchema.properties as Record<string, unknown>),
          product: {
            type: "object",
            properties: {
              id: { type: "integer" },
              name: { type: "string" },
              code: { type: ["string", "null"] },
              unit: { type: ["string", "null"] },
              active_flag: { type: "boolean" },
              selectable: { type: "boolean" },
              visible_to: { type: "string" },
              owner_id: { type: "integer" },
            },
          },
        },
      },
    },
    additional_data: {
      type: "object",
      properties: {
        next_cursor: { type: ["string", "null"] },
      },
    },
  },
};

export const addDealProductOutputSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: dealProductSchema,
  },
};

export const updateDealProductOutputSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: dealProductSchema,
  },
};

export const deleteDealProductOutputSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: {
      type: "object",
      properties: {
        id: { type: "integer" },
      },
    },
  },
};
