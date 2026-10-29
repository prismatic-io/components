export const getFormResponse = {
  id: "id",
  title: "title",
  language: "en",
  fields: [{}],
  hidden: ["string"],
  variables: {
    score: 0,
    price: 0,
  },
  welcome_screens: [
    {
      ref: "nice-readable-welcome-ref",
      title: "Welcome Title",
      properties: {
        description: "Cool description for the welcome",
        show_button: true,
        button_text: "start",
      },
      attachment: {
        type: "image",
        href: {
          image: {
            value: "https://images.typeform.com/images/4bcd3",
          },
          Pexels: {
            value:
              "https://www.pexels.com/video/people-traveling-in-the-desert-1739011",
          },
          Vimeo: {
            value: "https://vimeo.com/245714980",
          },
          YouTube: {
            value: "https://www.youtube.com/watch?v=cGk3tZIIpXE",
          },
        },
        scale: 0,
        properties: {
          description: "description",
        },
      },
      layout: {
        type: "float",
        placement: "left",
        attachment: {
          type: "image",
          href: {
            image: {
              value: "https://images.typeform.com/images/4bcd3",
            },
            Pexels: {
              value:
                "https://www.pexels.com/video/people-traveling-in-the-desert-1739011",
            },
            Vimeo: {
              value: "https://vimeo.com/245714980",
            },
            YouTube: {
              value: "https://www.youtube.com/watch?v=cGk3tZIIpXE",
            },
          },
          scale: 0,
          properties: {
            description: "description",
          },
        },
        viewport_overrides: {
          small: {
            type: "float",
            placement: "left",
          },
          large: {
            type: "split",
            placement: "right",
          },
        },
      },
    },
  ],
  thankyou_screens: [
    {
      ref: "nice-readable-thank-you-ref",
      title: "Thank you Title",
      type: "type",
      properties: {
        show_button: true,
        button_text: "start",
        button_mode: "redirect",
        redirect_url: "https://www.typeform.com",
        share_icons: true,
      },
      attachment: {
        type: "image",
        href: {
          image: {
            value: "https://images.typeform.com/images/4bcd3",
          },
          Pexels: {
            value:
              "https://www.pexels.com/video/people-traveling-in-the-desert-1739011",
          },
          Vimeo: {
            value: "https://vimeo.com/245714980",
          },
          YouTube: {
            value: "https://www.youtube.com/watch?v=cGk3tZIIpXE",
          },
        },
        scale: 0,
        properties: {
          description: "description",
        },
      },
      layout: {
        type: "float",
        placement: "left",
        attachment: {
          type: "image",
          href: {
            image: {
              value: "https://images.typeform.com/images/4bcd3",
            },
            Pexels: {
              value:
                "https://www.pexels.com/video/people-traveling-in-the-desert-1739011",
            },
            Vimeo: {
              value: "https://vimeo.com/245714980",
            },
            YouTube: {
              value: "https://www.youtube.com/watch?v=cGk3tZIIpXE",
            },
          },
          scale: 0,
          properties: {
            description: "description",
          },
        },
        viewport_overrides: {
          small: {
            type: "float",
            placement: "left",
          },
          large: {
            type: "split",
            placement: "right",
          },
        },
      },
    },
  ],
  logic: [
    {
      type: "type",
      ref: "ref",
      actions: [
        {
          action: "action",
          details: {
            to: {
              type: "type",
              value: "value",
            },
            target: {
              type: "type",
              value: "value",
            },
            value: {
              type: "type",
            },
          },
          condition: {
            op: "op",
            vars: [
              {
                type: "type",
                value: {},
              },
            ],
          },
        },
      ],
    },
  ],
  theme: {
    href: "https://api.typeform.com/themes/Fs24as",
  },
  workspace: {
    href: "https://api.typeform.com/workspaces/Aw33bz",
  },
  _links: {
    display: "https://subdomain.typeform.com/to/abc123",
  },
  settings: {
    language: "language",
    is_public: true,
    autosave_progress: true,
    progress_bar: "proportion",
    show_progress_bar: true,
    show_typeform_branding: true,
    show_time_to_complete: true,
    show_number_of_submissions: true,
    show_cookie_consent: true,
    show_question_number: true,
    show_key_hint_on_choices: true,
    hide_navigation: true,
    meta: {
      title: "title",
      allow_indexing: true,
      description: "description",
      image: {
        href: "href",
      },
    },
    redirect_after_submit_url: "redirect_after_submit_url",
    google_analytics: "google_analytics",
    facebook_pixel: "facebook_pixel",
    google_tag_manager: "google_tag_manager",
    milestones: [
      {
        field_ref: "field_ref",
        status: "status",
        reason: "reason",
      },
    ],
    enrichment_in_renderer: {
      toggle: true,
      active: true,
    },
  },
  cui_settings: {
    avatar: "https://images.typeform.com/images/4bcd3",
    is_typing_emulation_disabled: true,
    typing_emulation_speed: "fast",
  },
};

export const listFormsResponse = {
  items: [getFormResponse],
};
