export const updateFormInput = [
  {
    op: "replace",
    path: "/title",
    value: "foo",
  },
  {
    op: "replace",
    path: "/settings/is_public",
    value: false,
  },
  {
    op: "replace",
    path: "/settings/meta",
    value: {
      allow_indexing: true,
      canva_design_id: "DAElrx6aq-A",
      description: "meta description",
      image: {
        href: "https://images.typeform.com/images/4bcd3",
      },
      title: "meta title",
    },
  },
  {
    op: "replace",
    path: "/cui_settings",
    value: {
      avatar: "https://images.typeform.com/images/4bcd3",
      is_typing_emulation_disabled: false,
      typing_emulation_speed: "fast",
    },
  },
  {
    op: "replace",
    path: "/workspace",
    value: {
      href: "https://api.typeform.com/workspaces/123",
    },
  },
  {
    op: "replace",
    path: "/theme",
    value: {
      href: "https://api.typeform.com/themes/123",
    },
  },
];

export const cuiSettingsInput = {
  avatar: "https://images.typeform.com/images/4BKUhw8A9cSM",
};

export const fieldsInput = [
  {
    attachment: {
      href: "https://www.youtube.com/watch?v=Uui3oT-XBxs",
      properties: {
        description: "Typeform Home documentary",
      },
      scale: 0.8,
      type: "video",
    },
    properties: {
      description: "Cool description for the date",
      separator: "-",
      structure: "DDMMYYYY",
    },
    ref: "nice_readable_date_reference",
    title: "Date Title",
    type: "date",
    validations: {
      required: false,
    },
  },
  {
    layout: {
      attachment: {
        href: "https://images.typeform.com/images/4BKUhw8A9cSM",
        type: "image",
      },
      placement: "right",
      type: "float",
    },
    properties: {
      alphabetical_order: false,
      choices: [
        {
          label: "Foo",
        },
        {
          label: "Bar",
        },
      ],
      description: "Cool description for the dropdown",
      randomize: false,
    },
    ref: "nice_readable_dropdown_reference",
    title: "Dropdown Title",
    type: "dropdown",
    validations: {
      required: false,
    },
  },
];

export const hiddenInput = ["id", "created_at", "last_updated_at"];

export const logicInput = [
  {
    actions: [
      {
        action: "jump",
        condition: {
          op: "equal",
          vars: [
            {
              type: "field",
              value: "nice_readable_number_reference",
            },
            {
              type: "constant",
              value: 5,
            },
          ],
        },
        details: {
          to: {
            type: "field",
            value: "nice_readable_rating_reference",
          },
        },
      },
      {
        action: "add",
        condition: {
          op: "is",
          vars: [
            {
              type: "field",
              value: "nice_readable_yes_no_reference",
            },
            {
              type: "constant",
              value: true,
            },
          ],
        },
        details: {
          target: {
            type: "variable",
            value: "score",
          },
          value: {
            type: "constant",
            value: 5,
          },
        },
      },
    ],
    ref: "nice_readable_yes_no_reference",
    type: "field",
  },
];

export const settingsInput = {
  autosave_progress: true,
  facebook_pixel: "4347295725729872",
  free_form_navigation: false,
  google_analytics: "UA-1111-22",
  google_tag_manager: "GTM-43959999",
  hide_navigation: false,
  is_public: false,
  language: "en",
  meta: {
    allow_indexing: true,
    canva_design_id: "DAElrx6aq-A",
    description: "Cool meta description",
    image: {
      href: "https://images.typeform.com/images/4BKUhw8A9cSM",
    },
    title: "Meta title",
  },
  progress_bar: "percentage",
  redirect_after_submit_url: "https://www.redirecttohere.com",
  show_cookie_consent: false,
  show_key_hint_on_choices: true,
  show_number_of_submissions: false,
  show_progress_bar: true,
  show_question_number: true,
  show_time_to_complete: true,
  show_typeform_branding: false,
};

export const thankyouScreensInput = [
  {
    attachment: {
      href: "https://images.typeform.com/images/4BKUhw8A9cSM",
      type: "image",
    },
    properties: {
      button_mode: "redirect",
      button_text: "start",
      redirect_url: "https://www.typeform.com",
      share_icons: false,
      show_button: true,
    },
    ref: "nice-readable-thank-you-ref",
    title: "Thank you Title",
  },
];

export const themeInput = {
  href: "https://api.typeform.com/themes/qHWOQ7",
};

export const variableInput = {
  age: 28,
  name: "typeform",
  price: 10.59,
  score: 0,
};

export const welcomeScreensInput = [
  {
    layout: {
      attachment: {
        href: "https://images.typeform.com/images/4BKUhw8A9cSM",
        properties: {
          decorative: true,
        },
        type: "image",
      },
      placement: "left",
      type: "split",
      viewport_overrides: {
        small: {
          type: "wallpaper",
        },
      },
    },
    properties: {
      button_text: "start",
      description: "Cool description for the welcome",
      show_button: true,
    },
    ref: "nice-readable-welcome-ref",
    title: "Welcome Title",
  },
];

export const workspaceInput = {
  href: "https://api.typeform.com/workspaces/Aw33bz",
};
