export const findFileForSharedLinkExamplePayload = {
  data: {
    type: "file",
    id: "53286756412",
    etag: "1",
    sequence_id: "3",
    name: "Contract_2024.pdf",
    sha1: "85136c79cbf9fe36bb9d05d0639c70c265c18d37",
    description: "Contract for Q1 renewal",
    size: 629644,
    created_at: "2012-12-12T10:53:43-08:00",
    modified_at: "2012-12-12T10:53:43-08:00",
    created_by: {
      id: "11446498",
      type: "user",
      name: "Aaron Levie",
      login: "ceo@example.com",
    },
    owned_by: {
      id: "11446498",
      type: "user",
      name: "Aaron Levie",
      login: "ceo@example.com",
    },
    item_status: "active",
    shared_link: {
      url: "https://app.box.com/s/abbvr71aw8a4gb7u2541hlv45l806u5h",
      download_url:
        "https://app.box.com/shared/static/abbvr71aw8a4gb7u2541hlv45l806u5h.pdf",
      access: "open",
      effective_access: "company",
      effective_permission: "can_download",
      is_password_enabled: true,
      permissions: { can_download: true, can_preview: true, can_edit: false },
      download_count: 3,
      preview_count: 3,
    },
  },
};
export const getSharedLinkForFileExamplePayload = {
  data: {
    sharedLink: "https://app.box.com/s/abbvr71aw8a4gb7u2541hlv45l806u5h",
  },
};
export const findFolderForSharedLinkExamplePayload = {
  data: {
    type: "folder",
    id: "84759261038",
    name: "Shared Documents",
  },
};
export const getSharedLinkForFolderExamplePayload = {
  data: {
    sharedLink: "https://app.box.com/s/abbvr71aw8a4gb7u2541hlv45l806u5h",
  },
};
export const addSharedLinkToFileExamplePayload = {
  data: {
    type: "file",
    id: "53286756412",
    etag: "1",
    sequence_id: "3",
    name: "Contract_2024.pdf",
    sha1: "85136c79cbf9fe36bb9d05d0639c70c265c18d37",
    file_version: {
      id: "12345",
      type: "file_version",
      sha1: "134b65991ed521fcfe4724b7d814ab8ded5185dc",
    },
    shared_link: {
      url: "https://app.box.com/s/abbvr71aw8a4gb7u2541hlv45l806u5h",
      download_url:
        "https://app.box.com/shared/static/abbvr71aw8a4gb7u2541hlv45l806u5h.pdf",
      vanity_url: null,
      effective_access: "open",
      effective_permission: "can_download",
      is_password_enabled: false,
      access: "open",
      permissions: { can_download: true, can_preview: true, can_edit: false },
      download_count: 0,
      preview_count: 0,
    },
  },
};
export const updateSharedLinkToFileExamplePayload = {
  data: {
    type: "file",
    id: "53286756412",
    etag: "1",
    sequence_id: "3",
    name: "Contract_2024.pdf",
    sha1: "85136c79cbf9fe36bb9d05d0639c70c265c18d37",
    file_version: {
      id: "12345",
      type: "file_version",
      sha1: "134b65991ed521fcfe4724b7d814ab8ded5185dc",
    },
    shared_link: {
      url: "https://app.box.com/s/abbvr71aw8a4gb7u2541hlv45l806u5h",
      download_url:
        "https://app.box.com/shared/static/abbvr71aw8a4gb7u2541hlv45l806u5h.pdf",
      vanity_url: null,
      effective_access: "company",
      effective_permission: "can_download",
      is_password_enabled: true,
      access: "company",
      permissions: { can_download: true, can_preview: true, can_edit: false },
      download_count: 3,
      preview_count: 12,
    },
  },
};
export const removeSharedLinkFromFileExamplePayload = {
  data: {
    type: "file",
    id: "53286756412",
    etag: "1",
    sequence_id: "3",
    name: "Contract_2024.pdf",
    sha1: "85136c79cbf9fe36bb9d05d0639c70c265c18d37",
    file_version: {
      id: "12345",
      type: "file_version",
      sha1: "134b65991ed521fcfe4724b7d814ab8ded5185dc",
    },
    shared_link: null,
  },
};
export const addSharedLinkToFolderExamplePayload = {
  data: {
    type: "folder",
    id: "84759261038",
    etag: "1",
    sequence_id: "3",
    name: "Shared Documents",
    shared_link: {
      url: "https://app.box.com/s/9f2a1c7be4d84e0fa1b2c3d4e5f60718",
      download_url: null,
      vanity_url: null,
      effective_access: "open",
      effective_permission: "can_download",
      is_password_enabled: false,
      access: "open",
      permissions: { can_download: true, can_preview: true, can_edit: false },
      download_count: 0,
      preview_count: 0,
    },
  },
};
export const updateSharedLinkOnFolderExamplePayload = {
  data: {
    type: "folder",
    id: "84759261038",
    etag: "1",
    sequence_id: "3",
    name: "Shared Documents",
    shared_link: {
      url: "https://app.box.com/s/9f2a1c7be4d84e0fa1b2c3d4e5f60718",
      download_url: null,
      vanity_url: null,
      effective_access: "company",
      effective_permission: "can_preview",
      is_password_enabled: true,
      access: "company",
      permissions: { can_download: false, can_preview: true, can_edit: false },
      download_count: 5,
      preview_count: 42,
    },
  },
};
export const removeSharedLinkFromFolderExamplePayload = {
  data: {
    type: "folder",
    id: "84759261038",
    etag: "1",
    sequence_id: "3",
    name: "Shared Documents",
    shared_link: null,
  },
};
