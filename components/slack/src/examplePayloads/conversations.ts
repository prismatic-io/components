












export const createConversationExamplePayload = {
  ok: true,
  channels: [
    {
      id: "COZ7e3d",
      name: "example channel",
      is_channel: true,
      is_group: false,
      is_im: false,
      is_private: false,
      is_archived: false,
      created: 6426934241,
      creator: "example",
      unlinked: 0,
      name_normalized: "example channel",
      shared_team_ids: ["TW2oP78"],
      purpose: {
        value: "This channel was created for an example response.",
      },
    },
  ],
};

export const closeConversationExamplePayload = {
  ok: true,
  no_op: true,
  already_closed: true,
};

export const renameConversationExamplePayload = {
  ok: true,
  channel: {
    id: "C012AB3CD",
    name: "general",
    is_channel: true,
    is_group: false,
    is_im: false,
    created: 1449252889,
    creator: "W012A3BCD",
    is_archived: false,
    is_general: true,
    unlinked: 0,
    name_normalized: "general",
    is_read_only: false,
    is_shared: false,
    is_ext_shared: false,
    is_org_shared: false,
    pending_shared: [],
    is_pending_ext_shared: false,
    is_member: true,
    is_private: false,
    is_mpim: false,
    last_read: "1502126650.228446",
    topic: {
      value: "For public discussion of generalities",
      creator: "W012A3BCD",
      last_set: 1449709364,
    },
    purpose: {
      value: "This part of the workspace is for fun. Make fun here.",
      creator: "W012A3BCD",
      last_set: 1449709364,
    },
    previous_names: ["specifics", "abstractions", "etc"],
    num_members: 23,
    locale: "en-US",
  },
};

export const getConversationHistoryExamplePayload = {
  ok: true,
  messages: [
    {
      client_msg_id: "123123-123123-123123",
      type: "message",
      text: "hello world",
      user: "U01QFFSE2QK",
      ts: "166149417.178179",
      team: "TH0GJM0M8",
    },
  ],
};

export const listConversationsExamplePayload = {
  ok: true,
  channels: [
    {
      id: "COZ7e3d",
      name: "example channel",
      is_channel: true,
      is_group: false,
      is_im: false,
      is_private: false,
      is_archived: false,
      created: 6426934241,
      creator: "example",
      unlinked: 0,
      name_normalized: "example channel",
      shared_team_ids: ["TW2oP78"],
      purpose: {
        value: "This channel was created for an example response.",
      },
    },
  ],
};

export const leaveConversationExamplePayload = {
  ok: true,
  not_in_channel: true,
};

export const listConversationMembersExamplePayload = {
  ok: true,
  members: ["U023BECGF", "U061F7AUR", "W012A3CDE"],
  response_metadata: {
    next_cursor: "e3VzZXJfaWQ6IFcxMjM0NTY3fQ==",
  },
};

export const archiveConversationExamplePayload = {
  ok: true,
};

export const inviteUserToConversationExamplePayload = {
  ok: true,
  channel: {
    id: "C012AB3CD",
    name: "general",
    is_channel: true,
    is_group: false,
    is_im: false,
    created: 1449252889,
    creator: "W012A3BCD",
    is_archived: false,
    is_general: true,
    unlinked: 0,
    name_normalized: "general",
    is_read_only: false,
    is_shared: false,
    is_ext_shared: false,
    is_org_shared: false,
    pending_shared: [],
    is_pending_ext_shared: false,
    is_member: true,
    is_private: false,
    is_mpim: false,
    last_read: "1502126650.228446",
    topic: {
      value: "For public discussion of generalities",
      creator: "W012A3BCD",
      last_set: 1449709364,
    },
    purpose: {
      value: "This part of the workspace is for fun. Make fun here.",
      creator: "W012A3BCD",
      last_set: 1449709364,
    },
    previous_names: ["specifics", "abstractions", "etc"],
  },
};

export const listUserConversationsExamplePayload = {
  ok: true,
  channels: [
    {
      id: "COZ7e3d",
      name: "example channel",
      is_channel: true,
      is_group: false,
      is_im: false,
      is_private: false,
      is_archived: false,
      created: 6426934241,
      creator: "example",
      unlinked: 0,
      name_normalized: "example channel",
      shared_team_ids: ["TW2oP78"],
      purpose: {
        value: "This channel was created for an example response.",
      },
    },
  ],
};
