export const sendChangeEventExample = JSON.stringify(
  {
    routing_key: "testRoutingKey",
    payload: {
      summary: "Build Success: Increase snapshot create timeout to 30 seconds",
      timestamp: "2015-07-17T08:42:58.315+0000",
      source: "prod-build-agent-i-0b148d1040d565540",
      custom_details: {
        build_state: "passed",
        build_number: "220",
        run_time: "1236s",
      },
    },
    links: [
      {
        href: "https://buildpipeline.com/pagerduty/deployment/builds/220",
        text: "View in Build Pipeline",
      },
    ],
    images: [
      {
        src: "https://chart.googleapis.com/chart?chs=600x400&chd=t:6,2,9,5,2,5,7,4,8,2,1&cht=lc&chds=a&chxt=y&chm=D,0033FF,0,0,5,1",
        href: "https://google.com",
        alt: "An example link with an image",
      },
    ],
  },
  null,
  2,
);

export const updateChangeEventExample = JSON.stringify(
  {
    change_event: {
      summary: "Build Success - Increase snapshot create timeout to 30 seconds",
      type: "change_event",
      custom_details: {
        build_state: "passed",
        build_number: "2",
        run_time: "1236s",
      },
    },
  },
  null,
  2,
);

export const sendEventExample = JSON.stringify(
  {
    payload: {
      summary: "DISK at 99% on machine prod-datapipe03.example.com",
      timestamp: "2015-07-17T08:42:58.315+0000",
      severity: "critical",
      source: "prod-datapipe03.example.com",
      component: "mysql",
      group: "prod-datapipe",
      class: "disk",
      custom_details: {
        "free space": "1%",
        "ping time": "1500ms",
        "load avg": 0.75,
      },
    },
    routing_key: "e93facc04764012d7bfb002500d5d1a6",
    dedup_key: "srv01/mysql",
    event_action: "trigger",
    client: "Sample Monitoring Service",
    client_url: "https://monitoring.service.com",
    links: [
      {
        href: "http://pagerduty.example.com",
        text: "An example link.",
      },
    ],
    images: [
      {
        src: "https://chart.googleapis.com/chart?chs=600x400&chd=t:6,2,9,5,2,5,7,4,8,2,1&cht=lc&chds=a&chxt=y&chm=D,0033FF,0,0,5,1",
        href: "https://google.com",
        alt: "An example link with an image",
      },
    ],
  },
  null,
  2,
);

export const createUserExample = JSON.stringify(
  {
    user: {
      type: "user",
      name: "Earline Greenholt",
      email: "125.greenholt.earline@graham.name",
      time_zone: "America/Lima",
      color: "green",
      role: "admin",
      job_title: "Director of Engineering",
      avatar_url:
        "https://secure.gravatar.com/avatar/1d1a39d4635208d5664082a6c654a73f.png?d=mm&r=PG",
      description: "I'm the boss",
      license: {
        id: "PTDVERC",
        type: "license_reference",
      },
    },
  },
  null,
  2,
);

export const updateUserExample = JSON.stringify(
  {
    user: {
      type: "user",
      name: "Earline Greenholt",
      email: "125.greenholt.earline@graham.name",
      time_zone: "America/Lima",
      color: "green",
      role: "admin",
      job_title: "Director of Engineering",
      avatar_url:
        "https://secure.gravatar.com/avatar/1d1a39d4635208d5664082a6c654a73f.png?d=mm&r=PG",
      description: "I'm the boss",
      license: {
        id: "PTDVERC",
        type: "license_reference",
      },
    },
  },
  null,
  2,
);

export const createIncidentExample = JSON.stringify({
  incident: {
    type: "incident",
    title: "The server is on fire.",
    service: {
      id: "PWIXJZS",
      type: "service_reference",
    },
    priority: {
      id: "P53ZZH5",
      type: "priority_reference",
    },
    urgency: "high",
    incident_key: "baf7cf21b1da41b4b0221008339ff357",
    body: {
      type: "incident_body",
      details:
        "A disk is getting full on this machine. You should investigate what is causing the disk to fill, and ensure that there is an automated process in place for ensuring data is rotated (eg. logs should have logrotate around them). If data is expected to stay on this disk forever, you should start planning to scale up to a larger disk.",
    },
    escalation_policy: {
      id: "PT20YPA",
      type: "escalation_policy_reference",
    },
  },
});

export const createServiceExample = JSON.stringify(
  {
    type: "service",
    name: "My Web App",
    description: "My cool web application that does things.",
    auto_resolve_timeout: 14400,
    acknowledgement_timeout: 600,
    status: "active",
    escalation_policy: {
      id: "PWIP6CQ",
      type: "escalation_policy_reference",
    },
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
    alert_creation: "create_alerts_and_incidents",
    alert_grouping_parameters: {
      type: "time",
      config: {
        timeout: 2,
      },
    },
    auto_pause_notifications_parameters: {
      enabled: true,
      timeout: 300,
    },
  },
  null,
  2,
);

export const updateServiceExample = JSON.stringify(
  {
    type: "service",
    name: "My Web App",
    description: "My cool web application that does things.",
    auto_resolve_timeout: 14400,
    acknowledgement_timeout: 600,
    status: "active",
    escalation_policy: {
      id: "PWIP6CQ",
      type: "escalation_policy_reference",
    },
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
    alert_creation: "create_alerts_and_incidents",
    alert_grouping_parameters: {
      type: "time",
      config: {
        timeout: 2,
      },
    },
    auto_pause_notifications_parameters: {
      enabled: true,
      timeout: 300,
    },
  },
  null,
  2,
);

export const createTemplateExample = JSON.stringify(
  {
    description: "Sample template description",
    templated_fields: {
      email_body: "<div> sample </div>",
      email_subject: "Sample email Subject",
      message: "Sample SMS message",
    },
    name: "Sample Template",
    template_type: "status_update",
  },
  null,
  2,
);

export const updateTemplateExample = JSON.stringify(
  {
    description: "Sample template description",
    templated_fields: {
      email_body: "<div> sample </div>",
      email_subject: "Sample email Subject",
      message: "Sample SMS message",
    },
    name: "Sample Template",
    template_type: "status_update",
  },
  null,
  2,
);

export const createWebhookExample = JSON.stringify(
  {
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
  null,
  2,
);

export const updateWebhookExample = JSON.stringify(
  {
    webhook_subscription: {
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
    },
  },
  null,
  2,
);

export const manageIncidentsExample = JSON.stringify(
  [
    {
      id: "PT4KHLK",
      type: "incident_reference",
      status: "acknowledged",
    },
    {
      id: "PQMF62U",
      type: "incident_reference",
      priority: {
        id: "P53ZZH5",
        type: "priority_reference",
      },
    },
    {
      id: "PPVZH9X",
      type: "incident_reference",
      status: "resolved",
    },
    {
      id: "P8JOGX7",
      type: "incident_reference",
      assignments: [
        {
          assignee: {
            id: "PXPGF42",
            type: "user_reference",
          },
        },
      ],
    },
    {
      id: "PYJ9K7I",
      type: "incident_reference",
      incident_type: {
        name: "major_incident",
      },
    },
  ],
  null,
  2,
);
