



export const getSessionExamplePayload = {
  data: {
    code: "string",
    state: "string",
    groupid: "string",
    custom_module_id: "string",
    waiting_message: "string",
    description: "string",
    end_customer: {
      name: "string",
      email: "string",
    },
    assigned_userid: "string",
    assigned_at: "2024-12-03T22:25:44.414Z",
    end_customer_link: "string",
    supporter_link: "string",
    webclient_supporter_link: "string",
    custom_api: "string",
    created_at: "2024-12-03T22:25:44.414Z",
    valid_until: "2024-12-03T22:25:44.414Z",
    closed_at: "2024-12-03T22:25:44.414Z",
    tv_version: "string",
    online: true,
    support_session_type: "string",
  },
};

export const createSessionExamplePayload = getSessionExamplePayload;

export const listSessionsExamplePayload = {
  data: {
    sessions: [getSessionExamplePayload.data],
    next_offset: "string",
    sessions_remaining: 0,
  },
};
