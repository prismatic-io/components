






export const getJobResponse = {
  job_stages: [
    {
      position: 1,
      status: "Approved",
      id: "A1B2C3D4-E5F6-7890-A1B2-C3D4E5F67890",
    },
    {
      position: 2,
      status: "Active",
      id: "B2C3D4E5-F6A7-8901-B2C3-D4E5F6A78901",
    },
    {
      position: 3,
      status: "Idle",
      id: "C3D4E5F6-A7B8-9012-C3D4-E5F6A7B89012",
    },
  ],
  dateModified: "2017-03-30T11:43:19+00:00",
  presetID: null,
  createdByID: "D4E5F6A7-B8C9-0123-D4E5-F6A7B8C90123",
  job_next_stage: {
    position: 3,
    status: "Idle",
    id: "C3D4E5F6-A7B8-9012-C3D4-E5F6A7B89012",
  },
  id: "E5F6A7B8-C9D0-1234-E5F6-A7B8C9D01234",
  description: "",
  accountableID: "D4E5F6A7-B8C9-0123-D4E5-F6A7B8C90123",
  basedOnPreset: false,
  dateCreated: "2017-03-30T11:42:30+00:00",
  job_active_stage: {
    position: 2,
    status: "Active",
    id: "B2C3D4E5-F6A7-8901-B2C3-D4E5F6A78901",
  },
  deadline: null,
  name: "Test API",
  campaignID: "F6A7B8C9-D0E1-2345-F6A7-B8C9D0E12345",
  job_previous_stage: {
    position: 1,
    status: "Approved",
    id: "A1B2C3D4-E5F6-7890-A1B2-C3D4E5F67890",
  },
};

export const listJobsResponse = [
  {
    job_stages: [
      {
        position: 1,
        status: "Approved",
        id: "A1B2C3D4-E5F6-7890-A1B2-C3D4E5F67890",
      },
      {
        position: 2,
        status: "Active",
        id: "B2C3D4E5-F6A7-8901-B2C3-D4E5F6A78901",
      },
      {
        position: 3,
        status: "Idle",
        id: "C3D4E5F6-A7B8-9012-C3D4-E5F6A7B89012",
      },
    ],
    dateModified: "2017-03-30T11:43:19+00:00",
    presetID: null,
    jobMetaproperties: {
      "A1B2C3D4-E5F6-7890-A1B2-C3D4E5F67890": "City",
    },
    createdByID: "D4E5F6A7-B8C9-0123-D4E5-F6A7B8C90123",
    job_next_stage: {
      position: 3,
      status: "Idle",
      id: "C3D4E5F6-A7B8-9012-C3D4-E5F6A7B89012",
    },
    id: "A7B8C9D0-E1F2-3456-A7B8-C9D0E1F23456",
    description: "",
    accountableID: "D4E5F6A7-B8C9-0123-D4E5-F6A7B8C90123",
    basedOnPreset: false,
    dateCreated: "2017-03-30T11:42:30+00:00",
    job_active_stage: {
      position: 2,
      status: "Active",
      id: "B2C3D4E5-F6A7-8901-B2C3-D4E5F6A78901",
    },
    deadline: null,
    name: "Test API",
    campaignID: "F6A7B8C9-D0E1-2345-F6A7-B8C9D0E12345",
    job_previous_stage: {
      position: 1,
      status: "Approved",
      id: "A1B2C3D4-E5F6-7890-A1B2-C3D4E5F67890",
    },
  },
  getJobResponse,
];

export const getMediaOfJobResponse = [
  {
    original_url: "https://example.bynder.com/media/original/brand-logo.png",
    filename: "brand-logo.png",
    orientation: "square",
    status: "AwaitingApproval",
    dateCreated: "2021-05-12T08:48:01+00:00",
    dateModified: "2021-05-12T08:51:22+00:00",
    responsible_name: "Jane Smith",
    version: 1,
    uploader_name: "Jane Smith",
    versionParentID: null,
    id: "B8C9D0E1-F2A3-4567-B8C9-D0E1F2A34567",
    previews: [
      {
        type: "thumbnail",
        url: "https://example.bynder.com/media/preview/brand-logo-thumb.png",
      },
      {
        type: "preview",
        url: "https://example.bynder.com/media/preview/brand-logo-preview.png",
      },
      {
        type: "activity",
        url: "https://example.bynder.com/media/preview/brand-logo-activity.png",
      },
    ],
    sub_versions: [
      {
        original_url:
          "https://example.bynder.com/media/original/brand-logo-v2.png",
        filename: "brand-logo.png",
        orientation: "square",
        status: "AwaitingApproval",
        dateCreated: "2021-05-13T08:48:01+00:00",
        dateModified: "2021-05-13T08:51:22+00:00",
        responsible_name: "Jane Smith",
        version: 2,
        uploader_name: "Jane Smith",
        versionParentID: "B8C9D0E1-F2A3-4567-B8C9-D0E1F2A34567",
        id: "C9D0E1F2-A3B4-5678-C9D0-E1F2A3B45678",
        previews: [
          {
            type: "thumbnail",
            url: "https://example.bynder.com/media/preview/brand-logo-v2-thumb.png",
          },
          {
            type: "preview",
            url: "https://example.bynder.com/media/preview/brand-logo-v2-preview.png",
          },
          {
            type: "activity",
            url: "https://example.bynder.com/media/preview/brand-logo-v2-activity.png",
          },
        ],
        sub_versions: [],
      },
    ],
  },
];

export const updateJobResponse = {
  status: "Created",
  job_id: "E5F6A7B8-C9D0-1234-E5F6-A7B8C9D01234",
};

export const createJobResponse = {
  name: "Job Example",
  description: "Job Description",
  deadline: "2018-09-29",
  campaignID: "F6A7B8C9-D0E1-2345-F6A7-B8C9D0E12345",
  accountableID: "D4E5F6A7-B8C9-0123-D4E5-F6A7B8C90123",
  presetID: "C3D4E5F6-A7B8-9012-C3D4-E5F6A7B89012",
  jobMetaproperties: {
    "A1B2C3D4-E5F6-7890-A1B2-C3D4E5F67890":
      "B2C3D4E5-F6A7-8901-B2C3-D4E5F6A78901",
  },
  stages: [
    {
      description: "Awesome description",
      preset_stage_id: "C3D4E5F6-A7B8-9012-C3D4-E5F6A7B89012",
      name: "Review",
      responsibleID: "D4E5F6A7-B8C9-0123-D4E5-F6A7B8C90123",
      deadline: "2018-09-29",
    },
    {
      description: "Stage description",
      preset_stage_id: "E5F6A7B8-C9D0-1234-E5F6-A7B8C9D01234",
      name: "Approval",
      responsibleGroupID: "F6A7B8C9-D0E1-2345-F6A7-B8C9D0E12345",
      deadline: "2018-09-29",
    },
  ],
};

export const getJobPresetResponse = {
  preset: {
    ID: "C3D4E5F6-A7B8-9012-C3D4-E5F6A7B89012",
    name: "API name",
    wf_uuid: "A7B8C9D0-E1F2-3456-A7B8-C9D0E1F23456",
    ftp_settings: {},
    presetstages: [
      {
        description: "",
        ID: "B8C9D0E1-F2A3-4567-B8C9-D0E1F2A34567",
        name: "Revision Stage",
        position: 1,
        editableBy: "all",
        restrictToGroupID: null,
        type: "download",
        responsibleID: null,
        responsibleGroupID: null,
      },
    ],
  },
};

export const selectJobResponse = [
  {
    key: "E5F6A7B8-C9D0-1234-E5F6-A7B8C9D01234",
    label: "Test API (ID: E5F6A7B8-C9D0-1234-E5F6-A7B8C9D01234)",
  },
];
