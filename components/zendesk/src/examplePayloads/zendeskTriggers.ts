const createWebhookTriggerRaw = {
  trigger: {
    url: "https://example.zendesk.com/api/v2/triggers/10849292971419.json",
    id: 10849292971419,
    title: "Trigger for 01GK8E6BKWMJZD2TEXAMPLE",
    active: true,
    updated_at: "2022-12-02T03:36:44Z",
    created_at: "2022-12-02T03:36:44Z",
    default: false,
    actions: [
      {
        field: "notification_webhook",
        value: [
          "01GK8E6BKWMJZD2TEXAMPLE",
          '{"current_user": "{{current_user.details}}"}',
        ],
      },
    ],
    conditions: {
      all: [],
      any: [
        { field: "status", operator: "changed", value: null },
        { field: "status", operator: "not_changed", value: null },
      ],
    },
    description: null,
    position: 10,
    raw_title: "01GK8E6BKWMJZD2TEXAMPLE",
    category_id: "4558610559259",
  },
};
const listTriggersRaw = [createWebhookTriggerRaw.trigger];
export const createWebhookTriggerExamplePayload = {
  data: createWebhookTriggerRaw,
};
export const listTriggersExamplePayload = { data: listTriggersRaw as unknown };
