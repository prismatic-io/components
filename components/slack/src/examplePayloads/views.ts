










export const openViewExamplePayload = {
  ok: true,
  view: {
    id: "VMHU10V25",
    team_id: "T8N4K1JN",
    type: "modal",
    title: {
      type: "plain_text",
      text: "Quite a plain modal",
    },
    submit: {
      type: "plain_text",
      text: "Create",
    },
    blocks: [
      {
        type: "input",
        block_id: "a_block_id",
        label: {
          type: "plain_text",
          text: "A simple label",
          emoji: true,
        },
        optional: false,
        element: {
          type: "plain_text_input",
          action_id: "an_action_id",
        },
      },
    ],
    private_metadata: "Shh it is a secret",
    callback_id: "identify_your_modals",
    external_id: "",
    state: {
      values: {},
    },
    hash: "156772938.1827394",
    clear_on_close: false,
    notify_on_close: false,
    root_view_id: "VMHU10V25",
    app_id: "AA4928AQ",
    bot_id: "BA13894H",
  },
};

export const publishViewExamplePayload = {
  ok: true,
  view: {
    id: "VMHU10V25",
    team_id: "T8N4K1JN",
    type: "home",
    close: null,
    submit: null,
    blocks: [
      {
        type: "section",
        block_id: "2WGp9",
        text: {
          type: "mrkdwn",
          text: "A simple section with some sample sentence.",
          verbatim: false,
        },
      },
    ],
    private_metadata: "Shh it is a secret",
    callback_id: "identify_your_home_tab",
    state: {
      values: {},
    },
    hash: "156772938.1827394",
    clear_on_close: false,
    notify_on_close: false,
    root_view_id: "VMHU10V25",
    previous_view_id: null,
    app_id: "AA4928AQ",
    external_id: "",
    bot_id: "BA13894H",
  },
};
