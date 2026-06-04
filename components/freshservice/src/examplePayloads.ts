










import { SUCCESS_RESPONSE } from "./constants";




export const createTicketExamplePayload = {
  data: {
    ticket: {
      cc_emails: ["ram@freshservice.com", "diana@freshservice.com"],
      fwd_emails: [],
      reply_cc_emails: ["ram@freshservice.com", "diana@freshservice.com"],
      fr_escalated: false,
      spam: false,
      email_config_id: null,
      group_id: null,
      priority: 1,
      requester_id: 1000000675,
      requested_for_id: 1000000670,
      responder_id: null,
      source: 2,
      status: 2,
      subject: "Support Needed...",
      to_emails: null,
      department_id: null,
      id: 264,
      type: "Incident",
      due_by: "2017-09-11T10:26:17Z",
      fr_due_by: "2017-09-09T10:26:17Z",
      is_escalated: false,
      description: "<div>Details about the issue...</div>",
      description_text: "Details about the issue...",
      category: null,
      sub_category: null,
      item_category: null,
      custom_fields: {
        auto_checkbox: null,
      },
      created_at: "2017-09-08T10:26:17Z",
      updated_at: "2017-09-08T10:26:17Z",
      tags: [],
      attachments: [],
      workspace_id: 3,
      resolution_notes: "Resolution note for the ticket...",
      resolution_notes_html: "<div>Resolution note for the ticket...</div>",
    },
  },
};

export const listTicketsExamplePayload = {
  data: {
    tickets: [createTicketExamplePayload.data.ticket],
  },
};

export const getTicketExamplePayload = createTicketExamplePayload;

export const updateTicketExamplePayload = createTicketExamplePayload;

export const moveTicketExamplePayload = createTicketExamplePayload;

export const deleteTicketExamplePayload = SUCCESS_RESPONSE;




export const createProblemExamplePayload = {
  data: {
    problem: {
      id: 1,
      agent_id: null,
      requester_id: 1,
      description:
        "<div>Hi guys, <br/><br/>We have been facing issues when we try to reach Email Server 3. Looks like there is something wrong here.<br/><br/>Regards<br/> Rachel<br/> </div> ",
      description_text:
        "Hi guys, We have been facing issues when we try to reach Email Server 3. Looks like there is something wrong here. Regards Rachel",
      due_by: "2020-07-20T16:18:46Z",
      subject: "Unable to reach email server",
      group_id: null,
      priority: 2,
      impact: 1,
      status: 2,
      known_error: false,
      department_id: null,
      category: "Hardware",
      sub_category: "Peripherals",
      item_category: "Router",
      created_at: "2020-02-04T05:50:57Z",
      updated_at: "2020-02-04T05:50:57Z",
      workspace_id: 3,
      associated_change: 1,
      assets: [],
      custom_fields: {
        sample_text_field: "Sample Text",
      },
      analysis_fields: {
        problem_cause: {
          description: "<div> Problem cause description </div>",
          description_text: "Problem cause description",
        },
        problem_symptom: {
          description: "<div> Problem symptom description </div>",
          description_text: "Problem symptom description",
        },
        problem_impact: {
          description: "<div> Problem impact description </div>",
          description_text: "Problem impact description",
        },
      },
    },
  },
};

export const getProblemExamplePayload = createProblemExamplePayload;

export const listProblemsExamplePayload = {
  data: { problems: [createProblemExamplePayload.data.problem] },
};

export const updateProblemExamplePayload = createProblemExamplePayload;

export const moveProblemExamplePayload = createProblemExamplePayload;

export const deleteProblemExamplePayload = SUCCESS_RESPONSE;




export const createRequesterExamplePayload = {
  data: {
    requester: {
      id: 888,
      is_agent: false,
      first_name: "Ron",
      last_name: "Weasley",
      job_title: "Student",
      primary_email: "ronald.weasley@hogwarts.edu",
      secondary_emails: [
        "ronald.weasley@freshservice.com",
        "ronald.weasley@freshworks.com",
      ],
      work_phone_number: "62443",
      mobile_phone_number: "77762443",
      department_ids: [554],
      can_see_all_tickets_from_associated_departments: false,
      reporting_manager_id: 656,
      address: "Gryffindor Tower",
      time_zone: "Edinburgh",
      time_format: "12h",
      language: "en",
      location_id: 23,
      background_information: "",
      custom_fields: {
        quidditch_role: null,
        hogsmeade_permission: true,
      },
      active: true,
      has_logged_in: false,
    },
  },
};

export const getRequesterExamplePayload = createRequesterExamplePayload;

export const listRequestersExamplePayload = {
  data: { requesters: [createRequesterExamplePayload.data.requester] },
};

export const updateRequesterExamplePayload = createRequesterExamplePayload;

export const deactivateRequesterExamplePayload = SUCCESS_RESPONSE;




export const createAgentExamplePayload = {
  data: {
    agent: {
      id: 4453,
      first_name: "Rolanda",
      last_name: "Hooch",
      occasional: false,
      active: true,
      job_title: "Flying Instructor",
      email: "rolanda.hooch@hogwarts.edu",
      work_phone_number: "443532",
      mobile_phone_number: "553632",
      department_ids: [554],
      can_see_all_tickets_from_associated_departments: false,
      reporting_manager_id: 2,
      address: "Gryffindor Tower",
      time_zone: "Edinburgh",
      time_format: "12h",
      language: "en",
      location_id: 34,
      background_information: "",
      scoreboard_level_id: 2,
      member_of: [4, 5],
      observer_of: [7],
      member_of_pending_approval: [],
      observer_of_pending_approval: [],
      roles: [
        { role_id: 7, assignment_scope: "specified_groups", groups: [4, 5] },
        { role_id: 9, assignment_scope: "assigned_items", groups: [] },
        { role_id: 10, assignment_scope: "specified_groups", groups: [7] },
      ],
      last_login_at: "2020-03-30T07:46:41Z",
      last_active_at: "null",
      custom_fields: {
        house: null,
      },
      has_logged_in: false,
    },
  },
};

export const getAgentExamplePayload = createAgentExamplePayload;

export const listAgentsExamplePayload = {
  data: { agents: [createAgentExamplePayload.data.agent] },
};

export const updateAgentExamplePayload = createAgentExamplePayload;

export const deactivateAgentExamplePayload = createAgentExamplePayload;

export const forgetAgentExamplePayload = SUCCESS_RESPONSE;




export const createAssetExamplePayload = {
  data: {
    asset: {
      id: 10,
      display_id: 11,
      name: "Macbook Pro",
      description:
        "13.3-inch (diagonal) LED-backlit glossy widescreen display,1440-by-900 resolution",
      asset_type_id: 25,
      impact: "low",
      author_type: "User",
      usage_type: "permanent",
      asset_tag: "ASSET-9",
      user_id: null,
      department_id: null,
      location_id: null,
      agent_id: null,
      group_id: 9,
      assigned_on: "2014-07-26T06:55:04Z",
      created_at: "2019-03-07T09:27:09Z",
      updated_at: "2019-03-07T09:27:09Z",
      type_fields: {
        product_25: 10,
        vendor_25: 14,
        cost_25: 5000,
        salvage: 100,
        depreciation_id: 30,
        warranty_25: 20,
        acquisition_date_25: "2018-07-26T12:25:04+05:30",
        warranty_expiry_date_25: "2018-07-26T12:25:04+05:30",
        domain_25: 1,
        asset_state_25: "In Use",
        serial_number_25: "SW12131133",
        last_audit_date_25: "2014-07-26T12:25:04+05:30",
      },
      workspace_id: 3,
    },
  },
};

export const getAssetExamplePayload = createAssetExamplePayload;

export const listAssetsExamplePayload = {
  data: { assets: [createAssetExamplePayload.data.asset] },
};

export const searchAssetExamplePayload = listAssetsExamplePayload;

export const updateAssetExamplePayload = createAssetExamplePayload;

export const deleteAssetExamplePayload = SUCCESS_RESPONSE;

export const moveAssetExamplePayload = createAssetExamplePayload;




export const createSoftwareExamplePayload = {
  data: {
    application: {
      user_count: 0,
      installation_count: 0,
      id: 31027,
      created_at: "2020-02-06T08:28:29Z",
      updated_at: "2020-02-06T08:28:29Z",
      name: "Freshservice",
      publisher_id: null,
      description: "Cloud based ITSM software for service desk",
      notes: "monthly renewal",
      application_type: "saas",
      status: "managed",
      managed_by_id: 79560,
      category: "service desk application",
      source: "API",
      workspace_id: 2,
    },
  },
};

export const updateSoftwareExamplePayload = createSoftwareExamplePayload;

export const getSoftwareExamplePayload = createSoftwareExamplePayload;

export const listSoftwareExamplePayload = {
  data: { applications: [createSoftwareExamplePayload.data.application] },
};

export const deleteSoftwareExamplePayload = SUCCESS_RESPONSE;

export const moveSoftwareExamplePayload = createSoftwareExamplePayload;




export const createServiceRequestExamplePayload = {
  data: {
    service_request: {
      cc_emails: ["sample@freshservice.com"],
      fwd_emails: [],
      reply_cc_emails: [],
      fr_escalated: false,
      spam: false,
      email_config_id: null,
      group_id: null,
      priority: 2,
      requester_id: 14000044687,
      responder_id: null,
      source: 2,
      status: 2,
      subject: "Request for  : xx xx",
      to_emails: null,
      sla_policy_id: 14000001854,
      department_id: 14000015070,
      id: 49,
      type: "Service Request",
      due_by: "2020-03-23T21:00:00Z",
      fr_due_by: "2020-03-23T20:00:00Z",
      is_escalated: false,
      description: "",
      description_text: "",
      custom_fields: {
        reach: null,
      },
      created_at: "2020-03-22T15:31:39Z",
      updated_at: "2020-03-22T15:31:39Z",
      urgency: 1,
      impact: 1,
      category: null,
      sub_category: null,
      item_category: null,
      deleted: false,
      attachments: [],
      approval_status: null,
      approval_status_name: "Not Requested",
      workspace_id: 2,
      resolution_notes: null,
      resolution_notes_html: null,
    },
  },
};




export const createOnboardingRequestExamplePayload = {
  data: {
    initiator_id: 1,
    fields: {
      cf_employee_name: "Andrea",
      cf_job_title: "HR",
      cf_date_of_joining: "2020-08-20",
      cf_all_users: "andrea@freshservice.com",
      cf_department: "HR",
      cf_assets: 1,
      cf_location: 5,
      cf_hierarchy: "L3",
      cf_verified: true,
      msf_area_of_expertise: ["Ruby", "Java"],
      msf_preferred_locations: [53, 57],
    },
  },
};

export const viewOnboardingRequestExamplePayload = {
  data: {
    fields: [
      {
        placeholder: "Enter employee name",
        label: "Employee Name",
        name: "cf_employee_name",
        position: 1,
        required: false,
        default: false,
        field_type: "custom_text",
      },
    ],
  },
};




export const listWorkspacesExamplePayload = {
  data: {
    workspaces: [
      {
        created_at: "2023-09-21T13:48:19Z",
        description: null,
        id: 2,
        name: "IT",
        primary: true,
        restricted: false,
        state: "active",
        template_name: "it",
        updated_at: "2023-09-21T13:48:19Z",
      },
    ],
  },
};

export const getWorkspaceExamplePayload = {
  data: {
    workspace: listWorkspacesExamplePayload.data.workspaces[0],
  },
};
