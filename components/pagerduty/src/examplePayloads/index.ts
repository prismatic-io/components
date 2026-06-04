import type { TriggerPayload } from "@prismatic-io/spectral";

export const NO_RESPONSE_SUCCESSFULL_PAYLOAD = {
  data: "Action successfully completed.",
};

export const updateChangeEventExamplePayload = {
  data: {
    summary: "Build Success - Increase snapshot create timeout to 30 seconds",
    timestamp: "2020-07-17T08:42:58Z",
    type: "change_event",
    source: "acme-build-pipeline-tool-default-i-9999",
    integration: { id: "PEYSGVF", type: "inbound_integration_reference" },
    services: [{ id: "PEYSGRV", type: "service_reference" }],
    custom_details: {
      build_state: "passed",
      build_number: "2",
      run_time: "1236s",
    },
    links: [
      {
        href: "https://acme.pagerduty.dev/build/2",
        text: "View more details in Acme!",
      },
    ],
  },
};

export const createChangeEventExamplePayload = {
  data: {
    status: "success",
    message: "Event processed",
    dedup_key: "srv01/HTTP",
  },
};

export const listChangeEventsExamplePayload = {
  data: {
    change_events: [
      {
        summary:
          "Build Success - Increase snapshot create timeout to 30 seconds",
        id: "01BBYA6PEVW6A852BUO6QYUE7O",
        timestamp: "2020-07-17T08:42:58Z",
        type: "change_event",
        source: "acme-build-pipeline-tool-default-i-9999",
        integration: {
          id: "PEYSGVF",
          type: "inbound_integration_reference",
        },
        services: [
          {
            id: "PEYSGRV",
            type: "service_reference",
          },
        ],
        custom_details: {
          build_state: "passed",
          build_number: "2",
          run_time: "1236s",
        },
        links: [
          {
            href: "https://acme.pagerduty.dev/build/2",
            text: "View more details in Acme!",
          },
        ],
      },
      {
        summary:
          "Build Success - Increase snapshot create timeout to 15 seconds",
        id: "01BBYA6PDIXPL8KO1HPIUL9CZN",
        timestamp: "2020-07-17T07:42:58Z",
        type: "change_event",
        source: "acme-build-pipeline-tool-default-i-9999",
        integration: {
          id: "PEYSGVF",
          type: "inbound_integration_reference",
        },
        services: [
          {
            id: "PEYSGRV",
            type: "service_reference",
          },
        ],
        custom_details: {
          build_state: "passed",
          build_number: "1",
          run_time: "1233s",
        },
        links: [
          {
            href: "https://acme.pagerduty.dev/build/1",
            text: "View more details in Acme!",
          },
        ],
      },
    ],
    limit: null,
    offset: null,
    total: null,
    more: false,
  },
};

export const sendEventExamplePayload = {
  data: {
    status: "success",
    message: "Event processed",
    dedup_key: "srv01/HTTP",
  },
};

export const listNotificationsExamplePayload = {
  data: {
    notifications: [
      {
        id: "PWL7QXS",
        type: "phone_notification",
        started_at: "2013-03-06T15:28:51-05:00",
        address: "+15555551234",
        user: {
          id: "PT23IWX",
          type: "user_reference",
          summary: "Tim Wright",
          self: "https://api.pagerduty.com/users/PT23IWX",
          html_url: "https://subdomain.pagerduty.com/users/PT23IWX",
        },
      },
      {
        id: "PKN7NBH",
        type: "push_notification",
        started_at: "2013-03-06T15:28:51-05:00",
        user: {
          id: "PT23IWX",
          type: "user_reference",
          summary: "Tim Wright",
          self: "https://api.pagerduty.com/users/PT23IWX",
          html_url: "https://subdomain.pagerduty.com/users/PT23IWX",
        },
      },
    ],
    limit: 100,
    offset: 0,
    more: false,
    total: null,
  },
};

export const createUserExamplePayload = {
  data: {
    user: {
      id: "PXPGF42",
      type: "user",
      summary: "Earline Greenholt",
      self: "https://api.pagerduty.com/users/PXPGF42",
      html_url: "https://subdomain.pagerduty.com/users/PXPGF42",
      name: "Earline Greenholt",
      email: "125.greenholt.earline@graham.name",
      time_zone: "America/Lima",
      color: "green",
      role: "admin",
      avatar_url:
        "https://secure.gravatar.com/avatar/a8b714a39626f2444ee05990b078995f.png?d=mm&r=PG",
      description: "I'm the boss",
      invitation_sent: false,
      contact_methods: [
        {
          id: "PTDVERC",
          type: "email_contact_method_reference",
          summary: "Default",
          self: "https://api.pagerduty.com/users/PXPGF42/contact_methods/PTDVERC",
        },
      ],
      notification_rules: [
        {
          id: "P8GRWKK",
          type: "assignment_notification_rule_reference",
          summary: "Default",
          self: "https://api.pagerduty.com/users/PXPGF42/notification_rules/P8GRWKK",
          html_url: null,
        },
      ],
      job_title: "Director of Engineering",
      teams: [
        {
          id: "PQ9K7I8",
          type: "team_reference",
          summary: "Engineering",
          self: "https://api.pagerduty.com/teams/PQ9K7I8",
          html_url: "https://subdomain.pagerduty.com/teams/PQ9K7I8",
        },
      ],
    },
  },
};

export const updateUserExamplePayload = {
  data: {
    user: {
      id: "PXPGF42",
      type: "user",
      summary: "Earline Greenholt",
      self: "https://api.pagerduty.com/users/PXPGF42",
      html_url: "https://subdomain.pagerduty.com/users/PXPGF42",
      name: "Earline Greenholt",
      email: "125.greenholt.earline@graham.name",
      time_zone: "America/Lima",
      color: "green",
      role: "admin",
      avatar_url:
        "https://secure.gravatar.com/avatar/a8b714a39626f2444ee05990b078995f.png?d=mm&r=PG",
      description: "I'm the boss",
      invitation_sent: false,
      contact_methods: [
        {
          id: "PTDVERC",
          type: "email_contact_method_reference",
          summary: "Default",
          self: "https://api.pagerduty.com/users/PXPGF42/contact_methods/PTDVERC",
        },
      ],
      notification_rules: [
        {
          id: "P8GRWKK",
          type: "assignment_notification_rule_reference",
          summary: "Default",
          self: "https://api.pagerduty.com/users/PXPGF42/notification_rules/P8GRWKK",
          html_url: null,
        },
      ],
      job_title: "Director of Engineering",
      teams: [
        {
          id: "PQ9K7I8",
          type: "team_reference",
          summary: "Engineering",
          self: "https://api.pagerduty.com/teams/PQ9K7I8",
          html_url: "https://subdomain.pagerduty.com/teams/PQ9K7I8",
        },
      ],
    },
  },
};

export const getUserExamplePayload = {
  data: {
    user: {
      id: "PXPGF42",
      type: "user",
      summary: "Earline Greenholt",
      self: "https://api.pagerduty.com/users/PXPGF42",
      html_url: "https://subdomain.pagerduty.com/users/PXPGF42",
      name: "Earline Greenholt",
      email: "125.greenholt.earline@graham.name",
      time_zone: "America/Lima",
      color: "green",
      role: "admin",
      avatar_url:
        "https://secure.gravatar.com/avatar/a8b714a39626f2444ee05990b078995f.png?d=mm&r=PG",
      description: "I'm the boss",
      invitation_sent: false,
      contact_methods: [
        {
          id: "PTDVERC",
          type: "email_contact_method_reference",
          summary: "Default",
          self: "https://api.pagerduty.com/users/PXPGF42/contact_methods/PTDVERC",
        },
      ],
      notification_rules: [
        {
          id: "P8GRWKK",
          type: "assignment_notification_rule_reference",
          summary: "Default",
          self: "https://api.pagerduty.com/users/PXPGF42/notification_rules/P8GRWKK",
          html_url: null,
        },
      ],
      job_title: "Director of Engineering",
      teams: [
        {
          id: "PQ9K7I8",
          type: "team_reference",
          summary: "Engineering",
          self: "https://api.pagerduty.com/teams/PQ9K7I8",
          html_url: "https://subdomain.pagerduty.com/teams/PQ9K7I8",
        },
      ],
    },
  },
};

export const listUsersExamplePayloads = {
  data: {
    users: [
      {
        id: "PXPGF42",
        type: "user",
        summary: "Earline Greenholt",
        self: "https://api.pagerduty.com/users/PXPGF42",
        html_url: "https://subdomain.pagerduty.com/users/PXPGF42",
        name: "Earline Greenholt",
        email: "125.greenholt.earline@graham.name",
        time_zone: "America/Lima",
        color: "green",
        role: "admin",
        avatar_url:
          "https://secure.gravatar.com/avatar/a8b714a39626f2444ee05990b078995f.png?d=mm&r=PG",
        description: "I'm the boss",
        invitation_sent: false,
        contact_methods: [
          {
            id: "PTDVERC",
            type: "email_contact_method_reference",
            summary: "Default",
            self: "https://api.pagerduty.com/users/PXPGF42/contact_methods/PTDVERC",
          },
        ],
        notification_rules: [
          {
            id: "P8GRWKK",
            type: "assignment_notification_rule_reference",
            summary: "Default",
            self: "https://api.pagerduty.com/users/PXPGF42/notification_rules/P8GRWKK",
            html_url: null,
          },
        ],
        job_title: "Director of Engineering",
        teams: [
          {
            id: "PQ9K7I8",
            type: "team_reference",
            summary: "Engineering",
            self: "https://api.pagerduty.com/teams/PQ9K7I8",
            html_url: "https://subdomain.pagerduty.com/teams/PQ9K7I8",
          },
        ],
      },
      {
        id: "PAM4FGS",
        type: "user",
        summary: "Kyler Kuhn",
        self: "https://api.pagerduty.com/users/PAM4FGS",
        html_url: "https://subdomain.pagerduty.com/users/PAM4FGS",
        name: "Kyler Kuhn",
        email: "126_dvm_kyler_kuhn@beahan.name",
        time_zone: "Asia/Hong_Kong",
        color: "red",
        role: "admin",
        avatar_url:
          "https://secure.gravatar.com/avatar/47857d059adacf9a41dc4030c2e14b0a.png?d=mm&r=PG",
        description: "Actually, I am the boss",
        invitation_sent: false,
        contact_methods: [
          {
            id: "PVMGSML",
            type: "email_contact_method_reference",
            summary: "Work",
            self: "https://api.pagerduty.com/users/PAM4FGS/contact_methods/PVMGSMLL",
          },
        ],
        notification_rules: [
          {
            id: "P8GRWKK",
            type: "assignment_notification_rule_reference",
            summary: "Default",
            self: "https://api.pagerduty.com/users/PXPGF42/notification_rules/P8GRWKK",
            html_url: null,
          },
        ],
        job_title: "Senior Engineer",
        teams: [
          {
            id: "PQ9K7I8",
            type: "team_reference",
            summary: "Engineering",
            self: "https://api.pagerduty.com/teams/PQ9K7I8",
            html_url: "https://subdomain.pagerduty.com/teams/PQ9K7I8",
          },
        ],
      },
    ],
    limit: 25,
    offset: 0,
    more: false,
    total: null,
  },
};

export const listPrioritiesExamplePayloads = {
  data: {
    priorities: [
      {
        id: "PSLWBL8",
        type: "priority",
        summary: "P1",
        self: "https://api.pagerduty.com/priorities/PSLWBL8",
        name: "P1",
        description:
          "Critical issue that warrants public notification and liaison with executive teams",
      },
      {
        id: "P53ZZH5",
        type: "priority",
        summary: "P2",
        self: "https://api.pagerduty.com/priorities/P53ZZH5",
        name: "P2",
        description:
          "Critical system issue actively impacting many customers' ability to use the product",
      },
      {
        id: "PGE9YCZ",
        type: "priority",
        summary: "P3",
        self: "https://api.pagerduty.com/priorities/PGE9YCZ",
        name: "P3",
        description:
          "Stability or minor customer-impacting issues that require immediate attention from service owners",
      },
      {
        id: "PVJPWYW",
        type: "priority",
        summary: "P4",
        self: "https://api.pagerduty.com/priorities/PVJPWYW",
        name: "P4",
        description:
          "Minor issues requiring action, but not affecting customer ability to use the product",
      },
      {
        id: "P81SUUT",
        type: "priority",
        summary: "P5",
        self: "https://api.pagerduty.com/priorities/P81SUUT",
        name: "P5",
        description:
          "Cosmetic issues or bugs, not affecting customer ability to use the product",
      },
    ],
    limit: 25,
    offset: 0,
    more: false,
    total: null,
  },
};

export const listTemplatesExamplePayload = {
  data: {
    limit: 25,
    more: false,
    offset: 0,
    templates: [
      {
        created_at: "2022-12-30T16:00:00Z",
        created_by: {
          id: "PDZR4CN",
          self: "https://api.pagerduty.com/users/PDZR4CN",
          type: "user_reference",
        },
        description: "Sample template description",
        id: "PBZUP2B",
        name: "Sample Template 160",
        self: "https://api.pagerduty.com/templates/PBZUP2B",
        template_type: "status_update",
        type: "template",
        updated_at: "2022-12-30T16:00:00Z",
        updated_by: {
          id: "PGY287N",
          self: "https://api.pagerduty.com/users/PGY287N",
          type: "user_reference",
        },
      },
    ],
    total: null,
  },
};

export const getTemplateExamplePayload = {
  data: {
    template: {
      created_at: "2022-12-30T16:00:00Z",
      created_by: {
        id: "PDZR4CN",
        self: "https://api.pagerduty.com/users/PDZR4CN",
        type: "user_reference",
      },
      description: "Sample template description",
      templated_fields: {
        email_body: "<div> sample </div>",
        email_subject: "Sample email Subject",
        message: "Sample template message",
      },
      id: "PBZUP2B",
      name: "Sample Template 160",
      self: "https://api.pagerduty.com/templates/PBZUP2B",
      template_type: "status_update",
      type: "template",
      updated_at: "2022-12-30T16:00:00Z",
      updated_by: {
        id: "PGY287N",
        self: "https://api.pagerduty.com/users/PGY287N",
        type: "user_reference",
      },
    },
  },
};

export const updateTemplateExamplePayload = {
  data: {
    template: {
      created_at: "2022-08-19T13:46:22Z",
      created_by: {
        id: "PF9KMXH",
        self: "https://api.pagerduty.com/users/PF9KMXH",
        type: "user_reference",
      },
      description: "Sample template description",
      templated_fields: {
        email_body: "<div> sample </div>",
        email_subject: "Sample email Subject",
        message: "Sample SMS message",
      },
      id: "PCCR863",
      name: "Sample Template",
      self: "https://api.pagerduty.com/templates/PCCR863",
      template_type: "status_update",
      type: "template",
      updated_at: "2022-08-19T13:46:22Z",
      updated_by: {
        id: "PF9KMXH",
        self: "https://api.pagerduty.com/users/PF9KMXH",
        type: "user_reference",
      },
    },
  },
};

export const createTemplateExamplePayload = {
  data: {
    template: {
      created_at: "2022-08-19T13:46:22Z",
      created_by: {
        id: "PF9KMXH",
        self: "https://api.pagerduty.com/users/PF9KMXH",
        type: "user_reference",
      },
      description: "Sample template description",
      templated_fields: {
        email_body: "<div> sample </div>",
        email_subject: "Sample email Subject",
        message: "Sample SMS message",
      },
      id: "PCCR863",
      name: "Sample Template",
      self: "https://api.pagerduty.com/templates/PCCR863",
      template_type: "status_update",
      type: "template",
      updated_at: "2022-08-19T13:46:22Z",
      updated_by: {
        id: "PF9KMXH",
        self: "https://api.pagerduty.com/users/PF9KMXH",
        type: "user_reference",
      },
    },
  },
};

export const renderTemplateExamplePayload = {
  data: {
    templated_fields: {
      email_subject: "Update: Status update message",
      email_body: '<div class="test">Status update message</div>',
      message: "Update: Status update message",
    },
    warnings: [
      {
        email_body: ["{{incident.bad_value}} does not exist."],
      },
    ],
    errors: [],
  },
};

export const listServicesExamplePayload = {
  data: {
    services: [
      {
        id: "PIJ90N7",
        summary: "My Application Service",
        type: "service",
        self: "https://api.pagerduty.com/services/PIJ90N7",
        html_url: "https://subdomain.pagerduty.com/service-directory/PIJ90N7",
        name: "My Application Service",
        auto_resolve_timeout: 14400,
        acknowledgement_timeout: 600,
        created_at: "2015-11-06T11:12:51-05:00",
        status: "active",
        alert_creation: "create_alerts_and_incidents",
        alert_grouping_parameters: {
          type: "intelligent",
        },
        integrations: [
          {
            id: "PQ12345",
            type: "generic_email_inbound_integration_reference",
            summary: "Email Integration",
            self: "https://api.pagerduty.com/services/PIJ90N7/integrations/PQ12345",
            html_url:
              "https://subdomain.pagerduty.com/services/PIJ90N7/integrations/PQ12345",
          },
        ],
        escalation_policy: {
          id: "PT20YPA",
          type: "escalation_policy_reference",
          summary: "Another Escalation Policy",
          self: "https://api.pagerduty.com/escalation_policies/PT20YPA",
          html_url:
            "https://subdomain.pagerduty.com/escalation_policies/PT20YPA",
        },
        teams: [
          {
            id: "PQ9K7I8",
            type: "team_reference",
            summary: "Engineering",
            self: "https://api.pagerduty.com/teams/PQ9K7I8",
            html_url: "https://subdomain.pagerduty.com/teams/PQ9K7I8",
          },
        ],
        incident_urgency_rule: {
          type: "use_support_hours",
          during_support_hours: {
            type: "constant",
            urgency: "high",
          },
          outside_support_hours: {
            type: "constant",
            urgency: "low",
          },
        },
        support_hours: {
          type: "fixed_time_per_day",
          time_zone: "America/Lima",
          start_time: "09:00:00",
          end_time: "17:00:00",
          days_of_week: [1, 2, 3, 4, 5],
        },
        scheduled_actions: [
          {
            type: "urgency_change",
            at: {
              type: "named_time",
              name: "support_hours_start",
            },
            to_urgency: "high",
          },
        ],
        auto_pause_notifications_parameters: {
          enabled: true,
          timeout: 300,
        },
      },
    ],
    limit: 25,
    offset: 0,
    more: false,
    total: null,
  },
};

export const getServiceExamplePayload = {
  data: {
    service: {
      id: "PIJ90N7",
      type: "service",
      summary: "My Application Service",
      self: "https://api.pagerduty.com/services/PIJ90N7",
      html_url: "https://subdomain.pagerduty.com/service-directory/PIJ90N7",
      name: "My Application Service",
      auto_resolve_timeout: 14400,
      acknowledgement_timeout: 600,
      created_at: "2015-11-06T11:12:51-05:00",
      status: "active",
      alert_creation: "create_alerts_and_incidents",
      integrations: [
        {
          id: "PQ12345",
          type: "generic_email_inbound_integration_reference",
          summary: "Email Integration",
          self: "https://api.pagerduty.com/services/PIJ90N7/integrations/PQ12345",
          html_url:
            "https://subdomain.pagerduty.com/services/PIJ90N7/integrations/PQ12345",
        },
      ],
      escalation_policy: {
        id: "PT20YPA",
        type: "escalation_policy_reference",
        summary: "Another Escalation Policy",
        self: "https://api.pagerduty.com/escalation_policies/PT20YPA",
        html_url: "https://subdomain.pagerduty.com/escalation_policies/PT20YPA",
      },
      teams: [
        {
          id: "PQ9K7I8",
          type: "team_reference",
          summary: "Engineering",
          self: "https://api.pagerduty.com/teams/PQ9K7I8",
          html_url: "https://subdomain.pagerduty.com/teams/PQ9K7I8",
        },
      ],
      incident_urgency_rule: {
        type: "use_support_hours",
        during_support_hours: {
          type: "constant",
          urgency: "high",
        },
        outside_support_hours: {
          type: "constant",
          urgency: "low",
        },
      },
      support_hours: {
        type: "fixed_time_per_day",
        time_zone: "America/Lima",
        start_time: "09:00:00",
        end_time: "17:00:00",
        days_of_week: [1, 2, 3, 4, 5],
      },
      scheduled_actions: [
        {
          type: "urgency_change",
          at: {
            type: "named_time",
            name: "support_hours_start",
          },
          to_urgency: "high",
        },
      ],
      auto_pause_notifications_parameters: {
        enabled: true,
        timeout: 300,
      },
    },
  },
};

export const updateServiceExamplePayload = {
  data: {
    service: {
      id: "PIJ90N7",
      type: "service",
      summary: "My Application Service",
      self: "https://api.pagerduty.com/services/PIJ90N7",
      html_url: "https://subdomain.pagerduty.com/service-directory/PIJ90N7",
      name: "My Application Service",
      auto_resolve_timeout: 14400,
      acknowledgement_timeout: 600,
      created_at: "2015-11-06T11:12:51-05:00",
      status: "active",
      alert_creation: "create_alerts_and_incidents",
      alert_grouping_parameters: {
        type: "time",
        config: {
          timeout: 2,
        },
      },
      integrations: [
        {
          id: "PQ12345",
          type: "generic_email_inbound_integration_reference",
          summary: "Email Integration",
          self: "https://api.pagerduty.com/services/PIJ90N7/integrations/PQ12345",
          html_url:
            "https://subdomain.pagerduty.com/services/PIJ90N7/integrations/PQ12345",
        },
      ],
      escalation_policy: {
        id: "PT20YPA",
        type: "escalation_policy_reference",
        summary: "Another Escalation Policy",
        self: "https://api.pagerduty.com/escalation_policies/PT20YPA",
        html_url: "https://subdomain.pagerduty.com/escalation_policies/PT20YPA",
      },
      teams: [
        {
          id: "PQ9K7I8",
          type: "team_reference",
          summary: "Engineering",
          self: "https://api.pagerduty.com/teams/PQ9K7I8",
          html_url: "https://subdomain.pagerduty.com/teams/PQ9K7I8",
        },
      ],
      incident_urgency_rule: {
        type: "use_support_hours",
        during_support_hours: {
          type: "constant",
          urgency: "high",
        },
        outside_support_hours: {
          type: "constant",
          urgency: "low",
        },
      },
      support_hours: {
        type: "fixed_time_per_day",
        time_zone: "America/Lima",
        start_time: "09:00:00",
        end_time: "17:00:00",
        days_of_week: [1, 2, 3, 4, 5],
      },
      scheduled_actions: [
        {
          type: "urgency_change",
          at: {
            type: "named_time",
            name: "support_hours_start",
          },
          to_urgency: "high",
        },
      ],
      auto_pause_notifications_parameters: {
        enabled: true,
        timeout: 300,
      },
    },
  },
};

export const createServiceExamplePayload = {
  data: {
    service: {
      id: "PIJ90N7",
      summary: "My Application Service",
      type: "service",
      self: "https://api.pagerduty.com/services/PIJ90N7",
      html_url: "https://subdomain.pagerduty.com/service-directory/PIJ90N7",
      name: "My Application Service",
      auto_resolve_timeout: 14400,
      acknowledgement_timeout: 600,
      created_at: "2015-11-06T11:12:51-05:00",
      status: "active",
      alert_creation: "create_alerts_and_incidents",
      integrations: [
        {
          id: "PQ12345",
          type: "generic_email_inbound_integration_reference",
          summary: "Email Integration",
          self: "https://api.pagerduty.com/services/PIJ90N7/integrations/PQ12345",
          html_url:
            "https://subdomain.pagerduty.com/services/PIJ90N7/integrations/PQ12345",
        },
      ],
      escalation_policy: {
        id: "PT20YPA",
        type: "escalation_policy_reference",
        summary: "Another Escalation Policy",
        self: "https://api.pagerduty.com/escalation_policies/PT20YPA",
        html_url: "https://subdomain.pagerduty.com/escalation_policies/PT20YPA",
      },
      teams: [
        {
          id: "PQ9K7I8",
          type: "team_reference",
          summary: "Engineering",
          self: "https://api.pagerduty.com/teams/PQ9K7I8",
          html_url: "https://subdomain.pagerduty.com/teams/PQ9K7I8",
        },
      ],
      incident_urgency_rule: {
        type: "use_support_hours",
        during_support_hours: {
          type: "constant",
          urgency: "high",
        },
        outside_support_hours: {
          type: "constant",
          urgency: "low",
        },
      },
      support_hours: {
        type: "fixed_time_per_day",
        time_zone: "America/Lima",
        start_time: "09:00:00",
        end_time: "17:00:00",
        days_of_week: [1, 2, 3, 4, 5],
      },
      scheduled_actions: [
        {
          type: "urgency_change",
          at: {
            type: "named_time",
            name: "support_hours_start",
          },
          to_urgency: "high",
        },
      ],
      auto_pause_notifications_parameters: {
        enabled: true,
        timeout: 300,
      },
    },
  },
};

export const createIncidentExamplePayload = {
  data: {
    incident: {
      id: "PT4KHLK",
      type: "incident",
      title: "The server is on fire.",
      summary: "[#1234] The server is on fire.",
      self: "https://api.pagerduty.com/incidents/PT4KHLK",
      html_url: "https://subdomain.pagerduty.com/incidents/PT4KHLK",
      incident_number: 1234,
      created_at: "2015-10-06T21:30:42Z",
      updated_at: "2015-10-06T21:40:23Z",
      status: "triggered",
      incident_key: "baf7cf21b1da41b4b0221008339ff357",
      service: {
        id: "PWIXJZS",
        type: "service_reference",
        summary: "My Mail Service",
        self: "https://api.pagerduty.com/services/PWIXJZS",
        html_url: "https://subdomain.pagerduty.com/service-directory/PWIXJZS",
      },
      priority: {
        id: "P53ZZH5",
        type: "priority_reference",
        summary: "P2",
        self: "https://api.pagerduty.com/priorities/P53ZZH5",
      },
      assigned_via: "escalation_policy",
      assignments: [
        {
          at: "2015-11-10T00:31:52Z",
          assignee: {
            id: "PXPGF42",
            type: "user_reference",
            summary: "Earline Greenholt",
            self: "https://api.pagerduty.com/users/PXPGF42",
            html_url: "https://subdomain.pagerduty.com/users/PXPGF42",
          },
        },
      ],
      resolved_at: null,
      last_status_change_at: "2015-10-06T21:38:23Z",
      last_status_change_by: {
        id: "PXPGF42",
        type: "user_reference",
        summary: "Earline Greenholt",
        self: "https://api.pagerduty.com/users/PXPGF42",
        html_url: "https://subdomain.pagerduty.com/users/PXPGF42",
      },
      first_trigger_log_entry: {
        id: "Q02JTSNZWHSEKV",
        type: "trigger_log_entry_reference",
        summary: "Triggered through the API",
        self: "https://api.pagerduty.com/log_entries/Q02JTSNZWHSEKV?incident_id=PT4KHLK",
        html_url:
          "https://subdomain.pagerduty.com/incidents/PT4KHLK/log_entries/Q02JTSNZWHSEKV",
      },
      incident_type: {
        name: "major_incident",
      },
      escalation_policy: {
        id: "PT20YPA",
        type: "escalation_policy_reference",
        summary: "Another Escalation Policy",
        self: "https://api.pagerduty.com/escalation_policies/PT20YPA",
        html_url: "https://subdomain.pagerduty.com/escalation_policies/PT20YPA",
      },
      teams: [
        {
          id: "PQ9K7I8",
          type: "team_reference",
          summary: "Engineering",
          self: "https://api.pagerduty.com/teams/PQ9K7I8",
          html_url: "https://subdomain.pagerduty.com/teams/PQ9K7I8",
        },
      ],
      urgency: "high",
    },
  },
};

export const listIncidentsExamplePayload = {
  data: {
    incidents: [
      {
        id: "PT4KHLK",
        type: "incident",
        summary: "[#1234] The server is on fire.",
        self: "https://api.pagerduty.com/incidents/PT4KHLK",
        html_url: "https://subdomain.pagerduty.com/incidents/PT4KHLK",
        incident_number: 1234,
        title: "The server is on fire.",
        created_at: "2015-10-06T21:30:42Z",
        updated_at: "2015-10-06T21:40:23Z",
        status: "resolved",
        incident_key: "baf7cf21b1da41b4b0221008339ff357",
        service: {
          id: "PIJ90N7",
          type: "service_reference",
          summary: "My Mail Service",
          self: "https://api.pagerduty.com/services/PIJ90N7",
          html_url: "https://subdomain.pagerduty.com/service-directory/PIJ90N7",
        },
        assignments: [],
        assigned_via: "escalation_policy",
        last_status_change_at: "2015-10-06T21:38:23Z",
        resolved_at: "2015-10-06T21:38:23Z",
        first_trigger_log_entry: {
          id: "Q02JTSNZWHSEKV",
          type: "trigger_log_entry_reference",
          summary: "Triggered through the API",
          self: "https://api.pagerduty.com/log_entries/Q02JTSNZWHSEKV?incident_id=PT4KHLK",
          html_url:
            "https://subdomain.pagerduty.com/incidents/PT4KHLK/log_entries/Q02JTSNZWHSEKV",
        },
        alert_counts: {
          all: 2,
          triggered: 0,
          resolved: 2,
        },
        is_mergeable: true,
        incident_type: {
          name: "incident_default",
        },
        escalation_policy: {
          id: "PT20YPA",
          type: "escalation_policy_reference",
          summary: "Another Escalation Policy",
          self: "https://api.pagerduty.com/escalation_policies/PT20YPA",
          html_url:
            "https://subdomain.pagerduty.com/escalation_policies/PT20YPA",
        },
        teams: [
          {
            id: "PQ9K7I8",
            type: "team_reference",
            summary: "Engineering",
            self: "https://api.pagerduty.com/teams/PQ9K7I8",
            html_url: "https://subdomain.pagerduty.com/teams/PQ9K7I8",
          },
        ],
        pending_actions: [],
        acknowledgements: [],
        alert_grouping: {
          grouping_type: "advanced",
          started_at: "2015-10-06T21:30:42Z",
          ended_at: null,
          alert_grouping_active: true,
        },
        last_status_change_by: {
          id: "PXPGF42",
          type: "user_reference",
          summary: "Earline Greenholt",
          self: "https://api.pagerduty.com/users/PXPGF42",
          html_url: "https://subdomain.pagerduty.com/users/PXPGF42",
        },
        priority: {
          id: "P53ZZH5",
          type: "priority_reference",
          summary: "P2",
          self: "https://api.pagerduty.com/priorities/P53ZZH5",
        },
        resolve_reason: null,
        conference_bridge: {
          conference_number: "+1-415-555-1212,,,,1234#",
          conference_url: "https://example.com/acb-123",
        },
        incidents_responders: [],
        responder_requests: [],
        urgency: "high",
      },
    ],
    limit: 1,
    offset: 0,
    more: true,
  },
};

export const getIncidentExamplePayload = {
  data: {
    incident: {
      id: "PT4KHLK",
      type: "incident",
      summary: "[#1234] The server is on fire.",
      self: "https://api.pagerduty.com/incidents/PT4KHLK",
      html_url: "https://subdomain.pagerduty.com/incidents/PT4KHLK",
      incident_number: 1234,
      title: "The server is on fire.",
      created_at: "2015-10-06T21:30:42Z",
      updated_at: "2015-10-06T21:40:23Z",
      status: "acknowledged",
      incident_key: "baf7cf21b1da41b4b0221008339ff357",
      service: {
        id: "PIJ90N7",
        type: "service_reference",
        summary: "My Mail Service",
        self: "https://api.pagerduty.com/services/PIJ90N7",
        html_url: "https://subdomain.pagerduty.com/service-directory/PIJ90N7",
      },
      assignments: [
        {
          at: "2015-11-10T00:31:52Z",
          assignee: {
            id: "PXPGF42",
            type: "user_reference",
            summary: "Earline Greenholt",
            self: "https://api.pagerduty.com/users/PXPGF42",
            html_url: "https://subdomain.pagerduty.com/users/PXPGF42",
          },
        },
      ],
      assigned_via: "escalation_policy",
      last_status_change_at: "2015-10-06T21:38:23Z",
      resolved_at: null,
      first_trigger_log_entry: {
        id: "Q02JTSNZWHSEKV",
        type: "trigger_log_entry_reference",
        summary: "Triggered through the API",
        self: "https://api.pagerduty.com/log_entries/Q02JTSNZWHSEKV?incident_id=PT4KHLK",
        html_url:
          "https://subdomain.pagerduty.com/incidents/PT4KHLK/log_entries/Q02JTSNZWHSEKV",
      },
      alert_counts: {
        all: 2,
        triggered: 1,
        resolved: 1,
      },
      is_mergeable: true,
      incident_type: {
        name: "incident_default",
      },
      escalation_policy: {
        id: "PT20YPA",
        type: "escalation_policy_reference",
        summary: "Another Escalation Policy",
        self: "https://api.pagerduty.com/escalation_policies/PT20YPA",
        html_url: "https://subdomain.pagerduty.com/escalation_policies/PT20YPA",
      },
      teams: [
        {
          id: "PQ9K7I8",
          type: "team_reference",
          summary: "Engineering",
          self: "https://api.pagerduty.com/teams/PQ9K7I8",
          html_url: "https://subdomain.pagerduty.com/teams/PQ9K7I8",
        },
      ],
      pending_actions: [
        {
          type: "unacknowledge",
          at: "2015-11-10T01:02:52Z",
        },
        {
          type: "resolve",
          at: "2015-11-10T04:31:52Z",
        },
      ],
      acknowledgements: [
        {
          at: "2015-11-10T00:32:52Z",
          acknowledger: {
            id: "PXPGF42",
            type: "user_reference",
            summary: "Earline Greenholt",
            self: "https://api.pagerduty.com/users/PXPGF42",
            html_url: "https://subdomain.pagerduty.com/users/PXPGF42",
          },
        },
      ],
      alert_grouping: {
        grouping_type: "advanced",
        started_at: "2015-10-06T21:30:42Z",
        ended_at: null,
        alert_grouping_active: true,
      },
      last_status_change_by: {
        id: "PXPGF42",
        type: "user_reference",
        summary: "Earline Greenholt",
        self: "https://api.pagerduty.com/users/PXPGF42",
        html_url: "https://subdomain.pagerduty.com/users/PXPGF42",
      },
      priority: {
        id: "P53ZZH5",
        type: "priority_reference",
        summary: "P2",
        self: "https://api.pagerduty.com/priorities/P53ZZH5",
      },
      resolve_reason: null,
      conference_bridge: {
        conference_number: "+1-415-555-1212,,,,1234#",
        conference_url: "https://example.com/acb-123",
      },
      incidents_responders: [
        {
          state: "pending",
          user: {
            id: "PL7A2O4",
            type: "user_reference",
            summary: "Lee Turner",
            self: "https://api.pagerduty.com/users/PL7A2O4",
            html_url: "https://subdomain.pagerduty.com/users/PL7A2O4",
            avatar_url:
              "https://secure.gravatar.com/avatar/51c673f51f6b483b24c889bbafbd2a67.png?d=mm&r=PG",
          },
          incident: {
            id: "PXP12GZ",
            type: "incident_reference",
            summary: "Ongoing Incident in Mailroom",
            self: "https://api.pagerduty.com/incidents/PXP12GZ",
            html_url: "https://subdomain.pagerduty.com/incidents/PXP12GZ",
          },
          updated_at: "2018-08-09T14:40:48-07:00",
          message: "Please help with issue - join bridge at +1(234)-567-8910",
          requester: {
            id: "P09TT3C",
            type: "user_reference",
            summary: "Jane Doe",
            self: "https://api.pagerduty.com/users/P09TT3C",
            html_url: "https://subdomain.pagerduty.com/users/P09TT3C",
            avatar_url:
              "https://secure.gravatar.com/avatar/1c747247b75acc1f724e2784c838b3f8.png?d=mm&r=PG",
          },
          requested_at: "2018-08-09T21:40:49Z",
        },
      ],
      responder_requests: [
        {
          incident: {
            id: "PXP12GZ",
            type: "incident_reference",
            summary: "Ongoing Incident in Mailroom",
            self: "https://api.pagerduty.com/incidents/PXP12GZ",
            html_url: "https://subdomain.pagerduty.com/incidents/PXP12GZ",
          },
          requester: {
            id: "P09TT3C",
            type: "user_reference",
            summary: "Jane Doe",
            self: "https://api.pagerduty.com/users/P09TT3C",
            html_url: "https://subdomain.pagerduty.com/users/P09TT3C",
          },
          requested_at: "2018-08-16T14:55:17-07:00",
          message: "Please help with issue - join bridge at +1(234)-567-8910",
          responder_request_targets: [
            {
              responder_request_target: {
                type: "user",
                id: "PL7A2O4",
                incidents_responders: [
                  {
                    state: "pending",
                    user: {
                      id: "PL7A2O4",
                      type: "user_reference",
                      summary: "Lee Turner",
                      self: "https://api.pagerduty.com/users/PL7A2O4",
                      html_url: "https://subdomain.pagerduty.com/users/PL7A2O4",
                      avatar_url:
                        "https://secure.gravatar.com/avatar/51c673f51f6b483b24c889bbafbd2a67.png?d=mm&r=PG",
                    },
                    incident: {
                      id: "PXP12GZ",
                      type: "incident_reference",
                      summary: "Ongoing Incident in Mailroom",
                      self: "https://api.pagerduty.com/incidents/PXP12GZ",
                      html_url:
                        "https://subdomain.pagerduty.com/incidents/PXP12GZ",
                    },
                    updated_at: "2018-08-09T14:40:48-07:00",
                    message:
                      "Please help with issue - join bridge at +1(234)-567-8910",
                    requester: {
                      id: "P09TT3C",
                      type: "user_reference",
                      summary: "Jane Doe",
                      self: "https://api.pagerduty.com/users/P09TT3C",
                      html_url: "https://subdomain.pagerduty.com/users/P09TT3C",
                      avatar_url:
                        "https://secure.gravatar.com/avatar/1c747247b75acc1f724e2784c838b3f8.png?d=mm&r=PG",
                    },
                    requested_at: "2018-08-09T21:40:49Z",
                  },
                ],
              },
            },
          ],
        },
      ],
      urgency: "high",
      custom_fields: [
        {
          id: "PT4KHEE",
          type: "field_value",
          name: "environment",
          display_name: "Runtime Environment",
          description: "environment where incident occurred",
          data_type: "string",
          field_type: "single_value_fixed",
          value: "production",
        },
      ],
    },
  },
};

export const updateIncidentExamplePayload = {
  data: {
    incident: {
      id: "PT4KHLK",
      type: "incident",
      summary: "[#1234] The server is on fire.",
      self: "https://api.pagerduty.com/incidents/PT4KHLK",
      html_url: "https://subdomain.pagerduty.com/incidents/PT4KHLK",
      incident_number: 1234,
      created_at: "2015-10-06T21:30:42Z",
      updated_at: "2015-10-06T21:40:23Z",
      status: "resolved",
      title: "The server is on fire.",
      pending_actions: [
        {
          type: "unacknowledge",
          at: "2015-11-10T01:02:52Z",
        },
        {
          type: "resolve",
          at: "2015-11-10T04:31:52Z",
        },
      ],
      incident_key: "baf7cf21b1da41b4b0221008339ff357",
      service: {
        id: "PIJ90N7",
        type: "service_reference",
        summary: "My Mail Service",
        self: "https://api.pagerduty.com/services/PIJ90N7",
        html_url: "https://subdomain.pagerduty.com/service-directory/PIJ90N7",
      },
      priority: {
        id: "P53ZZH5",
        type: "priority_reference",
        summary: "P2",
        self: "https://api.pagerduty.com/priorities/P53ZZH5",
      },
      assigned_via: "escalation_policy",
      assignments: [
        {
          at: "2015-11-10T00:31:52Z",
          assignee: {
            id: "PXPGF42",
            type: "user_reference",
            summary: "Earline Greenholt",
            self: "https://api.pagerduty.com/users/PXPGF42",
            html_url: "https://subdomain.pagerduty.com/users/PXPGF42",
          },
        },
      ],
      acknowledgements: [
        {
          at: "2015-11-10T00:32:52Z",
          acknowledger: {
            id: "PXPGF42",
            type: "user_reference",
            summary: "Earline Greenholt",
            self: "https://api.pagerduty.com/users/PXPGF42",
            html_url: "https://subdomain.pagerduty.com/users/PXPGF42",
          },
        },
      ],
      resolved_at: "2015-10-06T21:38:23Z",
      last_status_change_at: "2015-10-06T21:38:23Z",
      last_status_change_by: {
        id: "PXPGF42",
        type: "user_reference",
        summary: "Earline Greenholt",
        self: "https://api.pagerduty.com/users/PXPGF42",
        html_url: "https://subdomain.pagerduty.com/users/PXPGF42",
      },
      first_trigger_log_entry: {
        id: "Q02JTSNZWHSEKV",
        type: "trigger_log_entry_reference",
        summary: "Triggered through the API",
        self: "https://api.pagerduty.com/log_entries/Q02JTSNZWHSEKV?incident_id=PT4KHLK",
        html_url:
          "https://subdomain.pagerduty.com/incidents/PT4KHLK/log_entries/Q02JTSNZWHSEKV",
      },
      incident_type: {
        name: "major_incident",
      },
      escalation_policy: {
        id: "PT20YPA",
        type: "escalation_policy_reference",
        summary: "Another Escalation Policy",
        self: "https://api.pagerduty.com/escalation_policies/PT20YPA",
        html_url: "https://subdomain.pagerduty.com/escalation_policies/PT20YPA",
      },
      teams: [
        {
          id: "PQ9K7I8",
          type: "team_reference",
          summary: "Engineering",
          self: "https://api.pagerduty.com/teams/PQ9K7I8",
          html_url: "https://subdomain.pagerduty.com/teams/PQ9K7I8",
        },
      ],
      urgency: "high",
    },
  },
};

export const listIncidentsAlertsExamplePayload = {
  data: {
    alerts: [
      {
        id: "PT4KHLK",
        type: "alert",
        summary: "The server is on fire.",
        self: "https://api.pagerduty.com/incidents/PT4KHLK/alerts/PXPGF42",
        html_url: "https://subdomain.pagerduty.com/alerts/PXPGF42",
        created_at: "2015-10-06T21:30:42Z",
        status: "resolved",
        alert_key: "baf7cf21b1da41b4b0221008339ff357",
        service: {
          id: "PIJ90N7",
          type: "service_reference",
          summary: "My Mail Service",
          self: "https://api.pagerduty.com/services/PIJ90N7",
          html_url: "https://subdomain.pagerduty.com/service-directory/PIJ90N7",
        },
        body: {
          type: "alert_body",
          contexts: [
            {
              type: "link",
            },
          ],
          details: {
            customKey: "Server is on fire!",
            customKey2: "Other stuff!",
          },
        },
        incident: {
          id: "PT4KHLK",
          type: "incident_reference",
        },
        suppressed: false,
        severity: "critical",
        integration: {
          id: "PQ12345",
          type: "generic_email_inbound_integration_reference",
          summary: "Email Integration",
          self: "https://api.pagerduty.com/services/PIJ90N7/integrations/PQ12345",
          html_url:
            "https://subdomain.pagerduty.com/services/PIJ90N7/integrations/PQ12345",
        },
      },
    ],
    limit: 1,
    offset: 0,
    more: true,
  },
};

export const manageIncidentsExamplePayload = {
  data: {
    incidents: [
      {
        id: "PT4KHLK",
        type: "incident",
        summary: "[#1234] The server is on fire.",
        self: "https://api.pagerduty.com/incidents/PT4KHLK",
        html_url: "https://subdomain.pagerduty.com/incidents/PT4KHLK",
        incident_number: 1234,
        created_at: "2015-10-06T21:30:42Z",
        updated_at: "2015-10-06T21:40:23Z",
        status: "resolved",
        title: "The server is on fire.",
        alert_counts: {
          all: 2,
          triggered: 0,
          resolved: 2,
        },
        pending_actions: [
          {
            type: "unacknowledge",
            at: "2015-11-10T01:02:52Z",
          },
          {
            type: "resolve",
            at: "2015-11-10T04:31:52Z",
          },
        ],
        incident_key: "baf7cf21b1da41b4b0221008339ff357",
        service: {
          id: "PIJ90N7",
          type: "service_reference",
          summary: "My Mail Service",
          self: "https://api.pagerduty.com/services/PIJ90N7",
          html_url: "https://subdomain.pagerduty.com/service-directory/PIJ90N7",
        },
        assigned_via: "escalation_policy",
        assignments: [
          {
            at: "2015-11-10T00:31:52Z",
            assignee: {
              id: "PXPGF42",
              type: "user_reference",
              summary: "Earline Greenholt",
              self: "https://api.pagerduty.com/users/PXPGF42",
              html_url: "https://subdomain.pagerduty.com/users/PXPGF42",
            },
          },
        ],
        acknowledgements: [
          {
            at: "2015-11-10T00:32:52Z",
            acknowledger: {
              id: "PXPGF42",
              type: "user_reference",
              summary: "Earline Greenholt",
              self: "https://api.pagerduty.com/users/PXPGF42",
              html_url: "https://subdomain.pagerduty.com/users/PXPGF42",
            },
          },
        ],
        resolved_at: "2015-10-06T21:38:23Z",
        last_status_change_at: "2015-10-06T21:38:23Z",
        last_status_change_by: {
          id: "PXPGF42",
          type: "user_reference",
          summary: "Earline Greenholt",
          self: "https://api.pagerduty.com/users/PXPGF42",
          html_url: "https://subdomain.pagerduty.com/users/PXPGF42",
        },
        first_trigger_log_entry: {
          id: "Q02JTSNZWHSEKV",
          type: "trigger_log_entry_reference",
          summary: "Triggered through the API",
          self: "https://api.pagerduty.com/log_entries/Q02JTSNZWHSEKV?incident_id=PT4KHLK",
          html_url:
            "https://subdomain.pagerduty.com/incidents/PT4KHLK/log_entries/Q02JTSNZWHSEKV",
        },
        incident_type: {
          name: "major_incident",
        },
        escalation_policy: {
          id: "PT20YPA",
          type: "escalation_policy_reference",
          summary: "Another Escalation Policy",
          self: "https://api.pagerduty.com/escalation_policies/PT20YPA",
          html_url:
            "https://subdomain.pagerduty.com/escalation_policies/PT20YPA",
        },
        teams: [
          {
            id: "PQ9K7I8",
            type: "team_reference",
            summary: "Engineering",
            self: "https://api.pagerduty.com/teams/PQ9K7I8",
            html_url: "https://subdomain.pagerduty.com/teams/PQ9K7I8",
          },
        ],
        urgency: "high",
      },
    ],
  },
};

export const updateIncidentAlertsExamplePayload = {
  data: {
    alert: {
      type: "alert",
      status: "resolved",
      incident: {
        id: "PEYSGVF",
        type: "incident_reference",
      },
      body: {
        type: "alert_body",
        contexts: [
          {
            type: "link",
          },
        ],
        details: {
          customKey: "Server is on fire!",
          customKey2: "Other stuff!",
        },
      },
    },
  },
};

export const getIncidentAlertExamplePayload = {
  data: {
    alert: {
      id: "PT4KHLK",
      type: "alert",
      summary: "The server is on fire.",
      self: "https://api.pagerduty.com/incident/PT4KHLX/alerts/PT4KHLK",
      html_url: "https://subdomain.pagerduty.com/alerts/PT4KHLK",
      created_at: "2015-10-06T21:30:42Z",
      status: "resolved",
      alert_key: "baf7cf21b1da41b4b0221008339ff357",
      service: {
        id: "PIJ90N7",
        type: "service_reference",
        summary: "My Mail Service",
        self: "https://api.pagerduty.com/services/PIJ90N7",
        html_url: "https://subdomain.pagerduty.com/service-directory/PIJ90N7",
      },
      incident: {
        id: "PT4KHLX",
        type: "incident_reference",
        summary: "[#1234] The server is on fire.",
        self: "https://api.pagerduty.com/incidents/PT4KHLX",
        html_url: "https://subdomain.pagerduty.com/incidents/PT4KHLX",
      },
      suppressed: false,
      severity: "critical",
      integration: {
        id: "PQ12345",
        type: "generic_email_inbound_integration_reference",
        summary: "Email Integration",
        self: "https://api.pagerduty.com/services/PIJ90N7/integrations/PQ12345",
        html_url:
          "https://subdomain.pagerduty.com/services/PIJ90N7/integrations/PQ12345",
      },
    },
  },
};

export const manageIncidentAlertsExamplePayload = {
  data: {
    alerts: [
      {
        id: "PT4KHLK",
        type: "alert",
        summary: "The server is on fire.",
        self: "https://api.pagerduty.com/incidents/PT4KHLK/alerts/PXPGF42",
        html_url: "https://subdomain.pagerduty.com/alerts/PXPGF42",
        created_at: "2015-10-06T21:30:42Z",
        status: "resolved",
        alert_key: "baf7cf21b1da41b4b0221008339ff357",
        service: {
          id: "PIJ90N7",
          type: "service_reference",
          summary: "My Mail Service",
          self: "https://api.pagerduty.com/services/PIJ90N7",
          html_url: "https://subdomain.pagerduty.com/service-directory/PIJ90N7",
        },
        body: {
          type: "alert_body",
          contexts: [
            {
              type: "link",
            },
          ],
          details: {
            customKey: "Server is on fire!",
            customKey2: "Other stuff!",
          },
        },
        incident: {
          id: "PPVZH9X",
          type: "incident_reference",
        },
        suppressed: false,
        severity: "critical",
      },
    ],
    limit: 1,
    offset: 0,
    more: true,
  },
};

export const updateIncidentAlertExamplePayload = {
  data: {
    alert: {
      type: "alert",
      status: "resolved",
      incident: {
        id: "PEYSGVF",
        type: "incident_reference",
      },
      body: {
        type: "alert_body",
        contexts: [
          {
            type: "link",
          },
        ],
        details: {
          customKey: "Server is on fire!",
          customKey2: "Other stuff!",
        },
      },
    },
  },
};

export const listIncidentNotesExamplePayload = {
  data: {
    notes: [
      {
        id: "PWL7QXS",
        user: {
          id: "PXPGF42",
          type: "user_reference",
          summary: "Earline Greenholt",
          self: "https://api.pagerduty.com/users/PXPGF42",
          html_url: "https://subdomain.pagerduty.com/users/PXPGF42",
        },
        channel: {
          summary: "The PagerDuty website or APIs",
        },
        content: "Firefighters are on the scene.",
        created_at: "2013-03-06T15:28:51-05:00",
      },
      {
        id: "PCQC25",
        user: {
          id: "PXPGF42",
          type: "bot_user_reference",
          summary: "A Global Event Rule",
          self: "https://api.pagerduty.com/users/PXPGF42",
          html_url:
            "https://subdomain.pagerduty.com/event-rules/global/0e84de00-9511-4380-9f4f-a7b568bb49a0/rules/14e56445-ebab-4dd0-ba9d-fc28a41b7e7b",
        },
        channel: {
          id: "14e56445-ebab-4dd0-ba9d-fc28a41b7e7b",
          type: "event_rule_reference",
          summary: "A Global Event Rule",
          self: "https://api.pagerduty.com/rulesets/0e84de00-9511-4380-9f4f-a7b568bb49a0/rules/14e56445-ebab-4dd0-ba9d-fc28a41b7e7b",
          html_url:
            "https://subdomain.pagerduty.com/event-rules/global/0e84de00-9511-4380-9f4f-a7b568bb49a0/rules/14e56445-ebab-4dd0-ba9d-fc28a41b7e7b",
        },
        content: "Initial alert information indicates a 1-alarm fire",
        created_at: "2013-03-06T15:28:42-05:00",
      },
    ],
  },
};

export const createIncidentNoteExamplePayload = {
  data: {
    note: {
      id: "PWL7QXS",
      user: {
        id: "PXPGF42",
        type: "user_reference",
        summary: "Earline Greenholt",
        self: "https://api.pagerduty.com/users/PXPGF42",
        html_url: "https://subdomain.pagerduty.com/users/PXPGF42",
      },
      channel: {
        summary: "The PagerDuty website or APIs",
      },
      content: "Firefighters are on the scene.",
      created_at: "2013-03-06T15:28:51-05:00",
    },
  },
};

export const listWebhooksExamplePayload = {
  data: {
    webhook_subscriptions: [
      {
        delivery_method: {
          id: "PF9KMXH",
          secret: null,
          type: "http_delivery_method",
          url: "https://example.com/receive_a_pagerduty_webhook",
          custom_headers: [
            {
              name: "your-header-name",
              value: "-- redacted --",
            },
          ],
        },
        description: "Sends PagerDuty v3 webhook events somewhere interesting.",
        events: [
          "incident.acknowledged",
          "incident.annotated",
          "incident.delegated",
          "incident.escalated",
          "incident.priority_updated",
          "incident.reassigned",
          "incident.resolved",
          "incident.responder.added",
          "incident.responder.replied",
          "incident.triggered",
          "incident.unacknowledged",
        ],
        filter: {
          id: "P393ZNQ",
          type: "service_reference",
        },
        id: "PY1OL64",
        type: "webhook_subscription",
        active: true,
      },
    ],
    limit: 25,
    offset: 0,
    total: null,
    more: false,
  },
};

export const createWebhookExamplePayload = {
  data: {
    webhook_subscription: {
      delivery_method: {
        id: "PF9KMXH",
        secret: null,
        temporarily_disabled: false,
        type: "http_delivery_method",
        url: "https://example.com/receive_a_pagerduty_webhook",
        custom_headers: [
          {
            name: "your-header-name",
            value: "-- redacted --",
          },
        ],
      },
      description: "Sends PagerDuty v3 webhook events somewhere interesting.",
      events: [
        "incident.acknowledged",
        "incident.annotated",
        "incident.delegated",
        "incident.escalated",
        "incident.priority_updated",
        "incident.reassigned",
        "incident.reopened",
        "incident.resolved",
        "incident.responder.added",
        "incident.responder.replied",
        "incident.triggered",
        "incident.unacknowledged",
      ],
      filter: {
        id: "P393ZNQ",
        type: "service_reference",
      },
      id: "PY1OL64",
      type: "webhook_subscription",
      active: true,
    },
  },
};

export const getWebhookExamplePayload = {
  data: {
    webhook_subscription: {
      delivery_method: {
        id: "PF9KMXH",
        secret: null,
        temporarily_disabled: false,
        type: "http_delivery_method",
        url: "https://example.com/receive_a_pagerduty_webhook",
        custom_headers: [
          {
            name: "your-header-name",
            value: "-- redacted --",
          },
        ],
      },
      description: "Sends PagerDuty v3 webhook events somewhere interesting.",
      events: [
        "incident.acknowledged",
        "incident.annotated",
        "incident.delegated",
        "incident.escalated",
        "incident.priority_updated",
        "incident.reassigned",
        "incident.reopened",
        "incident.resolved",
        "incident.responder.added",
        "incident.responder.replied",
        "incident.triggered",
        "incident.unacknowledged",
      ],
      filter: {
        id: "P393ZNQ",
        type: "service_reference",
      },
      id: "PY1OL64",
      type: "webhook_subscription",
      active: true,
    },
  },
};

export const updateWebhookExamplePayload = {
  data: {
    webhook_subscription: {
      delivery_method: {
        id: "PF9KMXH",
        secret: null,
        temporarily_disabled: false,
        type: "http_delivery_method",
        url: "https://example.com/receive_a_pagerduty_webhook",
        custom_headers: [
          {
            name: "your-header-name",
            value: "-- redacted --",
          },
        ],
      },
      description: "Sends PagerDuty v3 webhook events somewhere interesting.",
      events: [
        "incident.acknowledged",
        "incident.annotated",
        "incident.delegated",
        "incident.escalated",
        "incident.priority_updated",
        "incident.reassigned",
        "incident.reopened",
        "incident.resolved",
        "incident.responder.added",
        "incident.responder.replied",
        "incident.triggered",
        "incident.unacknowledged",
      ],
      filter: {
        id: "P393ZNQ",
        type: "service_reference",
      },
      id: "PY1OL64",
      type: "webhook_subscription",
      active: true,
    },
  },
};

export const enableWebhookExamplePayload = {
  data: {
    webhook_subscription: {
      delivery_method: {
        id: "PF9KMXH",
        secret: null,
        temporarily_disabled: false,
        type: "http_delivery_method",
        url: "https://example.com/receive_a_pagerduty_webhook",
        custom_headers: [
          {
            name: "your-header-name",
            value: "-- redacted --",
          },
        ],
      },
      description: "Sends PagerDuty v3 webhook events somewhere interesting.",
      events: [
        "incident.acknowledged",
        "incident.annotated",
        "incident.delegated",
        "incident.escalated",
        "incident.priority_updated",
        "incident.reassigned",
        "incident.reopened",
        "incident.resolved",
        "incident.responder.added",
        "incident.responder.replied",
        "incident.triggered",
        "incident.unacknowledged",
      ],
      filter: {
        id: "P393ZNQ",
        type: "service_reference",
      },
      id: "PY1OL64",
      type: "webhook_subscription",
      active: true,
    },
  },
};

export const getChangeEventExamplePayload = {
  data: {
    change_event: {
      summary: "Build Success - Increase snapshot create timeout to 30 seconds",
      timestamp: "2020-07-17T08:42:58Z",
      type: "change_event",
      source: "acme-build-pipeline-tool-default-i-9999",
      integration: {
        id: "PEYSGVF",
        type: "inbound_integration_reference",
      },
      services: [
        {
          id: "PEYSGRV",
          type: "service_reference",
        },
      ],
      custom_details: {
        build_state: "passed",
        build_number: "2",
        run_time: "1236s",
      },
      links: [
        {
          href: "https://acme.pagerduty.dev/build/2",
          text: "View more details in Acme!",
        },
      ],
    },
  },
};













export const incidentsTriggerExamplePayload = {
  payload: {
    headers: {
      "Content-Type": "application/json",
      "X-PagerDuty-Signature":
        "v1=1d6207f8818f063890758a32d3833914754ba788cb2993b04ac8eb064fef0fcd",
    },
    queryParameters: {},
    rawBody: {
      data: "",
      contentType: "application/json",
    },
    body: {
      data: {
        event: {
          id: "5ac64822-4adc-4fda-ade0-410becf0de4f",
          event_type: "incident.triggered",
          resource_type: "incident",
          occurred_at: "2026-05-20T14:00:00.000Z",
          agent: {
            html_url: "https://subdomain.pagerduty.com/users/PXPGF42",
            id: "PXPGF42",
            self: "https://api.pagerduty.com/users/PXPGF42",
            summary: "Earline Greenholt",
            type: "user_reference",
          },
          client: {
            name: "PagerDuty",
          },
          data: {
            id: "PT4KHLK",
            type: "incident",
            self: "https://api.pagerduty.com/incidents/PT4KHLK",
            html_url: "https://subdomain.pagerduty.com/incidents/PT4KHLK",
            number: 1234,
            status: "triggered",
            incident_key: "baf7cf21b1da41b4b0221008339ff357",
            created_at: "2026-05-20T14:00:00.000Z",
            title: "The server is on fire.",
            service: {
              html_url:
                "https://subdomain.pagerduty.com/service-directory/PIJ90N7",
              id: "PIJ90N7",
              self: "https://api.pagerduty.com/services/PIJ90N7",
              summary: "My Mail Service",
              type: "service_reference",
            },
            assignees: [
              {
                html_url: "https://subdomain.pagerduty.com/users/PXPGF42",
                id: "PXPGF42",
                self: "https://api.pagerduty.com/users/PXPGF42",
                summary: "Earline Greenholt",
                type: "user_reference",
              },
            ],
            escalation_policy: {
              html_url:
                "https://subdomain.pagerduty.com/escalation_policies/PT20YPA",
              id: "PT20YPA",
              self: "https://api.pagerduty.com/escalation_policies/PT20YPA",
              summary: "Another Escalation Policy",
              type: "escalation_policy_reference",
            },
            teams: [
              {
                html_url: "https://subdomain.pagerduty.com/teams/PQ9K7I8",
                id: "PQ9K7I8",
                self: "https://api.pagerduty.com/teams/PQ9K7I8",
                summary: "Engineering",
                type: "team_reference",
              },
            ],
            priority: {
              html_url: "https://subdomain.pagerduty.com/priorities/P53ZZH5",
              id: "P53ZZH5",
              self: "https://api.pagerduty.com/priorities/P53ZZH5",
              summary: "P2",
              type: "priority_reference",
            },
            urgency: "high",
            conference_bridge: null,
            resolve_reason: null,
          },
        },
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      "Incident Webhook": "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      "Incident Webhook": ["example-api-key"],
    },
    invokeUrl: "https://hooks.example.com/trigger/EXAMPLE",
    executionId: "SW5zdGFuY2VFeGVjdXRpb246MTIzNDU=",
    customer: {
      id: "Q3VzdG9tZXI6MTIzNDU=",
      externalId: "example-customer-external-id",
      name: "Example Customer",
    },
    instance: {
      id: "SW5zdGFuY2U6MTIzNDU=",
      name: "Example Instance",
    },
    user: {
      id: "VXNlcjoxMjM0NQ==",
      externalId: "example-user-external-id",
      name: "Example User",
      email: "user@example.com",
    },
  } as unknown as TriggerPayload,
};









export const serviceTriggerExamplePayload = {
  payload: {
    headers: {
      "Content-Type": "application/json",
      "X-PagerDuty-Signature":
        "v1=2d6207f8818f063890758a32d3833914754ba788cb2993b04ac8eb064fef0fcd",
    },
    queryParameters: {},
    rawBody: {
      data: "",
      contentType: "application/json",
    },
    body: {
      data: {
        event: {
          id: "6bd64822-4adc-4fda-ade0-410becf0de4f",
          event_type: "service.created",
          resource_type: "service",
          occurred_at: "2026-05-20T14:00:00.000Z",
          agent: {
            html_url: "https://subdomain.pagerduty.com/users/PXPGF42",
            id: "PXPGF42",
            self: "https://api.pagerduty.com/users/PXPGF42",
            summary: "Earline Greenholt",
            type: "user_reference",
          },
          client: {
            name: "PagerDuty",
          },
          data: {
            id: "PIJ90N7",
            type: "service",
            self: "https://api.pagerduty.com/services/PIJ90N7",
            html_url:
              "https://subdomain.pagerduty.com/service-directory/PIJ90N7",
            name: "My Application Service",
            description: "Service supporting the application backend",
            auto_resolve_timeout: 14400,
            acknowledgement_timeout: 600,
            created_at: "2026-05-20T14:00:00.000Z",
            updated_at: "2026-05-20T14:00:00.000Z",
            status: "active",
            teams: [
              {
                html_url: "https://subdomain.pagerduty.com/teams/PQ9K7I8",
                id: "PQ9K7I8",
                self: "https://api.pagerduty.com/teams/PQ9K7I8",
                summary: "Engineering",
                type: "team_reference",
              },
            ],
            escalation_policy: {
              html_url:
                "https://subdomain.pagerduty.com/escalation_policies/PT20YPA",
              id: "PT20YPA",
              self: "https://api.pagerduty.com/escalation_policies/PT20YPA",
              summary: "Another Escalation Policy",
              type: "escalation_policy_reference",
            },
          },
        },
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      "Service Webhook": "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      "Service Webhook": ["example-api-key"],
    },
    invokeUrl: "https://hooks.example.com/trigger/EXAMPLE",
    executionId: "SW5zdGFuY2VFeGVjdXRpb246MTIzNDU=",
    customer: {
      id: "Q3VzdG9tZXI6MTIzNDU=",
      externalId: "example-customer-external-id",
      name: "Example Customer",
    },
    instance: {
      id: "SW5zdGFuY2U6MTIzNDU=",
      name: "Example Instance",
    },
    user: {
      id: "VXNlcjoxMjM0NQ==",
      externalId: "example-user-external-id",
      name: "Example User",
      email: "user@example.com",
    },
  } as unknown as TriggerPayload,
};








export const pollChangesTriggerExamplePayload = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: {
      data: "",
      contentType: "application/json",
    },
    body: {
      data: {
        created: [
          {
            id: "PT4KHLK",
            type: "incident",
            summary: "[#1234] The server is on fire.",
            self: "https://api.pagerduty.com/incidents/PT4KHLK",
            html_url: "https://subdomain.pagerduty.com/incidents/PT4KHLK",
            incident_number: 1234,
            title: "The server is on fire.",
            created_at: "2026-05-20T14:00:00.000Z",
            updated_at: "2026-05-20T14:00:00.000Z",
            status: "triggered",
            urgency: "high",
            incident_key: "baf7cf21b1da41b4b0221008339ff357",
            service: {
              id: "PIJ90N7",
              type: "service_reference",
              summary: "My Mail Service",
              self: "https://api.pagerduty.com/services/PIJ90N7",
              html_url:
                "https://subdomain.pagerduty.com/service-directory/PIJ90N7",
            },
            assignments: [
              {
                at: "2026-05-20T14:00:00.000Z",
                assignee: {
                  id: "PXPGF42",
                  type: "user_reference",
                  summary: "Earline Greenholt",
                  self: "https://api.pagerduty.com/users/PXPGF42",
                  html_url: "https://subdomain.pagerduty.com/users/PXPGF42",
                },
              },
            ],
            escalation_policy: {
              id: "PT20YPA",
              type: "escalation_policy_reference",
              summary: "Another Escalation Policy",
              self: "https://api.pagerduty.com/escalation_policies/PT20YPA",
              html_url:
                "https://subdomain.pagerduty.com/escalation_policies/PT20YPA",
            },
            teams: [
              {
                id: "PQ9K7I8",
                type: "team_reference",
                summary: "Engineering",
                self: "https://api.pagerduty.com/teams/PQ9K7I8",
                html_url: "https://subdomain.pagerduty.com/teams/PQ9K7I8",
              },
            ],
            priority: {
              id: "P53ZZH5",
              type: "priority_reference",
              summary: "P2",
              self: "https://api.pagerduty.com/priorities/P53ZZH5",
            },
          },
        ],
        updated: [],
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      "Polling Flow": "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      "Polling Flow": ["example-api-key"],
    },
    invokeUrl: "https://hooks.example.com/trigger/EXAMPLE",
    executionId: "SW5zdGFuY2VFeGVjdXRpb246MTIzNDU=",
    customer: {
      id: "Q3VzdG9tZXI6MTIzNDU=",
      externalId: "example-customer-external-id",
      name: "Example Customer",
    },
    instance: {
      id: "SW5zdGFuY2U6MTIzNDU=",
      name: "Example Instance",
    },
    user: {
      id: "VXNlcjoxMjM0NQ==",
      externalId: "example-user-external-id",
      name: "Example User",
      email: "user@example.com",
    },
  } as unknown as TriggerPayload,
  polledNoChanges: false,
};
