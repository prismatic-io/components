export const CUSTOM_ATTRIBUTES_DEFAULT = [
  {
    key: "cbf_cywdkexrtqc73f97gd4w6g",
    name: "A1",
    value: "1",
  },
];

export const PHONE_NUMBERS_DEFAULT = [
  {
    code: "+1",
    country: "US",
    label: "Mobile",
    number: "5550100",
  },
];

export const SETTINGS_EXTRA_FIELDS_DEFAULT = {
  additional_data_center_regions: ["TY"],
  allow_multiple_devices: true,
  alternative_hosts: "jchill@example.com;thill@example.com",
  alternative_hosts_email_notification: true,

  approved_or_denied_countries_or_regions: {
    approved_list: ["CX"],
    denied_list: ["CA"],
    enable: true,
    method: "approve",
  },

  audio_conference_info: "test",
  authentication_domains: "example.com",
  authentication_exception: [
    {
      email: "jchill@example.com",
      name: "Jill Chill",
    },
  ],
  authentication_option: "signIn_D8cJuqWVQ623CI4Q8yQK0Q",

  breakout_room: {
    enable: true,
    rooms: [
      {
        name: "room1",
        participants: ["jchill@example.com"],
      },
    ],
  },
  calendar_type: 1,
  close_registration: false,
  contact_email: "jchill@example.com",
  contact_name: "Jill Chill",
  email_notification: true,
  encryption_type: "enhanced_encryption",
  focus_mode: true,

  jbh_time: 0,

  language_interpretation: {
    enable: true,
    interpreters: [
      {
        email: "interpreter@example.com",
        languages: "US,FR",
      },
    ],
  },
  sign_language_interpretation: {
    enable: true,
    interpreters: [
      {
        email: "interpreter@example.com",
        sign_language: "American",
      },
    ],
  },
  meeting_authentication: true,
  meeting_invitees: [
    {
      email: "jchill@example.com",
    },
  ],

  private_meeting: false,
  registrants_confirmation_email: true,

  show_share_button: true,

  waiting_room: false,

  host_save_video_order: true,
  alternative_host_update_polls: true,
  internal_meeting: false,
  continuous_meeting_chat: {
    enable: true,
    auto_add_invited_external_users: true,
  },
  participant_focused_meeting: false,
  push_change_to_calendar: false,
  resources: [
    {
      resource_type: "whiteboard",
      resource_id: "X4Hy02w3QUOdskKofgb9Jg",
      permission_level: "editor",
    },
  ],
  auto_start_meeting_summary: false,
  auto_start_ai_companion_questions: false,
};

export const TRACKING_FIELDS_DEFAULT = [
  {
    field: "field1",
    value: "value1",
  },
];
export const ZOOM_ONE_TYPE_OFF = {
  label: "Turn off Zoom One license.",
  value: "0",
};

export const ZOOM_ONE_TYPES = [
  { label: "Zoom One Business Plus with US/CA Unlimited.", value: "16" },
  { label: "Zoom One Business Plus with UK/IR Unlimited.", value: "32" },
  { label: "Zoom One Business Plus with AU/NZ Unlimited.", value: "64" },
  { label: "Zoom One Business Plus with Japan Unlimited.", value: "128" },
  { label: "Zoom One Business Plus with Global Select.", value: "33554432" },
  {
    label: "Zoom One Enterprise Premier with US/CA Unlimited.",
    value: "134217728",
  },
  {
    label: "Zoom One Enterprise Premier with AU/NZ Unlimited.",
    value: "1073741824",
  },
  {
    label: "Zoom One Enterprise Premier with UK/IR Unlimited.",
    value: "536870912",
  },
  {
    label: "Zoom One Enterprise Premier with Japan Unlimited.",
    value: "268435456",
  },
  { label: "Zoom One Business Plus for Gov accounts.", value: "16" },
  {
    label: "Zoom One for Education School and Campus.",
    value: "18014398509481984",
  },
  {
    label: "Zoom One for Education Enterprise Essentials.",
    value: "72057594037927936",
  },
  {
    label: "Zoom One for Education Enterprise Student.",
    value: "576460752303423488",
  },
  {
    label: "Zoom One for Education Enterprise Plus.",
    value: "144115188075855872",
  },
  {
    label:
      "Zoom One for Education School and Campus Plus with US/CA Unlimited.",
    value: "137438953472",
  },
  {
    label:
      "Zoom One for Education School and Campus Plus with AU/NZ Unlimited.",
    value: "1099511627776",
  },
  {
    label:
      "Zoom One for Education School and Campus Plus with UK/IR Unlimited.",
    value: "549755813888",
  },
  {
    label:
      "Zoom One for Education School and Campus Plus with Japan Unlimited.",
    value: "274877906944",
  },
  {
    label: "Zoom One for Education School and Campus Plus with Global Select.",
    value: "2199023255552",
  },
  {
    label: "Zoom One for Education Enterprise Premier with US/CA Unlimited.",
    value: "4294967296",
  },
  {
    label: "Zoom One for Education Enterprise Premier with AU/NZ Unlimited.",
    value: "34359738368",
  },
  {
    label: "Zoom One for Education Enterprise Premier with UK/IR Unlimited.",
    value: "17179869184",
  },
  {
    label: "Zoom One for Education Enterprise Premier with Japan Unlimited.",
    value: "8589934592",
  },
  {
    label: "Zoom One for Education Enterprise Premier with Global Select.",
    value: "68719476736",
  },
];

export const ZOOM_UNITED_PLANS = [
  { label: "Zoom United Pro-United with US/CA Unlimited.", value: "1" },
  { label: "Zoom United Pro-United with UK/IR Unlimited.", value: "2" },
  { label: "Zoom United Pro-United with AU/NZ Unlimited.", value: "4" },
  { label: "Zoom United Pro-United with Global Select.", value: "8" },
  { label: "Zoom United Pro-United with Zoom Phone Pro.", value: "16" },
  { label: "Zoom United Biz-United with US/CA Unlimited.", value: "32" },
  { label: "Zoom United Biz-United with UK/IR Unlimited.", value: "64" },
  { label: "Zoom United Biz-United with AU/NZ Unlimited.", value: "128" },
  { label: "Zoom United Biz-United with Global Select.", value: "256" },
  { label: "Zoom United Biz-United with Zoom Phone Pro.", value: "512" },
  { label: "Zoom United Ent-United with US/CA Unlimited.", value: "1024" },
  { label: "Zoom United Ent-United with UK/IR Unlimited.", value: "2048" },
  { label: "Zoom United Ent-United with AU/NZ Unlimited.", value: "4096" },
  { label: "Zoom United Ent-United with Global Select.", value: "8192" },
  { label: "Zoom United Ent-United with Zoom Phone Pro.", value: "16384" },
  { label: "Zoom United Pro-United with JP Unlimited.", value: "32768" },
  { label: "Zoom United Biz-United with JP Unlimited.", value: "65536" },
  { label: "Zoom United Ent-United with JP Unlimited.", value: "131072" },
];

export const ZOOM_UNITED_PLAN_OFF = {
  label: "Turn off Zoom United type.",
  value: "none",
};

export const LOGIN_TYPES = [
  { label: "Facebook OAuth", value: "0" },
  { label: "Google OAuth", value: "1" },
  { label: "Apple OAuth", value: "24" },
  { label: "Microsoft OAuth", value: "27" },
  { label: "Mobile device", value: "97" },
  { label: "RingCentral OAuth", value: "98" },
  { label: "API user", value: "99" },
  { label: "Zoom Work email", value: "100" },
  { label: "Single Sign-On (SSO)", value: "101" },
  { label: "Phone number", value: "11" },
  { label: "WeChat", value: "21" },
  { label: "Alipay", value: "23" },
];
