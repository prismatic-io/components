import type { TriggerPayload } from "@prismatic-io/spectral";
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
export const deactivateAgentExamplePayload = {
  data: {
    agent: { ...createAgentExamplePayload.data.agent, active: false },
  },
};
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
    onboarding_request: {
      id: 4,
      created_at: "2026-09-09T14:21:08Z",
      updated_at: "2026-09-09T14:21:08Z",
      status: 1,
      subject: "Onboarding request for Andrea",
      ticket_id: null,
      actors: {
        reporting_manager: {
          email: "sam.reyes@freshservice.com",
          name: "Sam Reyes",
        },
      },
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
      lookup_values: {},
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
export const pollNewAndUpdatedTicketsTriggerExamplePayload: {
  payload: TriggerPayload;
} = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        created: [createTicketExamplePayload.data.ticket],
        updated: [
          {
            ...createTicketExamplePayload.data.ticket,
            id: 265,
            status: 3,
            updated_at: "2017-09-09T14:12:43Z",
          },
        ],
      },
    },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId: "RXhhbXBsZUV4ZWN1dGlvblJlc3VsdElk",
    customer: {
      id: "testCustomerId",
      name: "Test Customer",
      externalId: "testExternalId",
    },
    instance: { id: "testInstanceId", name: "Test Instance" },
    user: {
      id: "testUserId",
      email: "user@example.com",
      name: "Test User",
      externalId: "testUserExternalId",
    },
    integration: {
      id: "testIntegrationId",
      name: "Test Integration",
      versionSequenceId: "1",
      externalVersion: "",
    },
    flow: {
      id: "testFlowId",
      name: "Test Flow",
      stableId: "testFlowStableId",
    },
    startedAt: "2024-01-15T00:00:00.000Z",
    globalDebug: false,
  },
};
const itamDevice = {
  device_id: 46,
  name: "db-080-westport",
  type_id: 2,
  type: "physical",
  serial_no: "SN-4451-XR",
  asset_no: "ASSET-9",
  uuid: "4c4c4544-0051-3010-8043-b6c04f325632",
  notes: "Primary database node.",
  device_url: "https://example.freshservice.com/itam/devices/46",
  tags: ["production", "database"],
  aliases: [],
  custom_fields: {},
  first_added: "2026-04-02T10:26:17Z",
  last_updated: "2026-09-01T08:14:03Z",
  physicalsubtype_id: 2,
  physicalsubtype: "Rackable",
  total_cpus: 2,
  core_per_cpu: 8,
  ram: 64,
  hard_disk_count: 4,
  hard_disk_size: 960,
  os_name: "Ubuntu",
  os_version: "24.04",
  data_center: "Westport DC1",
  building_id: 3,
  rack_id: 17,
  objectcategory: "Servers",
  service_level: "Gold",
  customer: "Finance",
  customers: ["Finance", "Operations"],
  in_service: "yes",
};
export const createOrUpdateItamDeviceExamplePayload = {
  data: {
    action: "device added or updated",
    id: 46,
    name: "db-080-westport",
    didSomethingChange: true,
    isNew: true,
    code: 0,
    raw: ["device added or updated", 46, "db-080-westport", true, true],
  },
};
export const updateItamDeviceExamplePayload = {
  data: {
    action: "device added or updated",
    id: 46,
    name: "db-080-westport",
    didSomethingChange: true,
    isNew: false,
    code: 0,
    raw: ["device added or updated", 46, "db-080-westport", true, false],
  },
};
export const getItamDeviceExamplePayload = {
  data: itamDevice,
};
export const listItamDevicesExamplePayload = {
  data: {
    meta: { page: 1, per_page: 100, total_count: 2 },
    devices: [
      itamDevice,
      {
        device_id: 47,
        name: "s3-bucket-archive",
        type_id: 3,
        type: "virtual",
        serial_no: null,
        asset_no: null,
        uuid: null,
        virtualsubtype_id: 2,
        virtualsubtype: "Amazon EC2 Instance",
        in_service: "yes",
        custom_fields: {},
        tags: [],
        aliases: [],
      },
    ],
  },
};
export const deleteItamDeviceExamplePayload = SUCCESS_RESPONSE;
const itamAsset = {
  id: 54,
  device_id: 46,
  name: "main modem",
  serial_no: "SN-2281-KD",
  asset_no: "ASSET-54",
  uuid: null,
  notes: "Spare unit held in the Westport store room.",
  tags: ["spare", "networking"],
  aliases: [],
  preferred_alias: null,
  custom_fields: {},
  device_external_links: [],
  in_service: "yes",
  service_level: "In Service",
  type: "Cable Modem",
  device_sub_type: null,
  last_updated: "2026-09-01T08:14:03Z",
  hw_model: "DPC3941T",
  hw_size: 1,
  hw_depth: "half",
  manufacturer: "Cisco",
  building: "Westport",
  room: "Server Room A",
  row: "3",
  location: "Westport / Server Room A",
  rack: "Rack 12",
  rack_id: 17,
  start_at: 12,
  orientation: null,
  reversed: "no",
  slot_number: null,
  xpos: 1260,
  ip_addresses: [],
  mac_addresses: [],
  modules: [],
  vms: [],
  devices: [],
  device_purchase_line_items: [],
  customer_id: 4,
  customer: "Finance",
};
export const createOrUpdateItamAssetExamplePayload = {
  data: {
    action: "asset added/edited.",
    id: 54,
    name: "main modem",
    didSomethingChange: true,
    isNew: true,
    code: 0,
    raw: ["asset added/edited.", 54, "main modem", true, true],
  },
};
export const updateItamAssetExamplePayload = {
  data: {
    action: "asset added/edited.",
    id: 54,
    name: "main modem",
    didSomethingChange: true,
    isNew: false,
    code: 0,
    raw: ["asset added/edited.", 54, "main modem", true, false],
  },
};
export const getItamAssetExamplePayload = {
  data: itamAsset,
};
export const listItamAssetsExamplePayload = {
  data: {
    meta: { page: 1, per_page: 100, total_count: 2 },
    assets: [
      itamAsset,
      {
        id: 55,
        device_id: null,
        name: "front-door-sensor",
        serial_no: null,
        asset_no: null,
        type: "Sensor",
        in_service: "yes",
        service_level: "Spare",
        tags: [],
        aliases: [],
        custom_fields: {},
      },
    ],
  },
};
export const deleteItamAssetExamplePayload = SUCCESS_RESPONSE;
