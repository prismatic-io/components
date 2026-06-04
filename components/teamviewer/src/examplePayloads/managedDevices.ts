



export const listManagedDevicesExamplePayload = {
  data: {
    currentPaginationToken: "string",
    nextPaginationToken: "string",
    resources: [
      {
        id: "00000000-0000-0000-0000-000000000000",
        teamviewerId: 0,
        name: "string",
        isOnline: true,
        last_seen: "2024-12-04T21:42:48.222Z",
      },
    ],
  },
};

export const listCompanyManagedDevicesExamplePayload = {
  data: {
    currentPaginationToken: "string",
    nextPaginationToken: "string",
    resources: [
      {
        id: "00000000-0000-0000-0000-000000000000",
        teamviewerId: 0,
        name: "string",
        isOnline: true,
        last_seen: "2024-12-04T22:46:21.547Z",
      },
    ],
  },
};

export const getManagedDeviceExamplePayload = {
  data: {
    teamviewerPolicyId: "00000000-0000-0000-0000-000000000000",
    teamViewerVersion: "string",
    deviceDescription: "string",
    id: "00000000-0000-0000-0000-000000000000",
    teamviewerId: 0,
    name: "string",
    isOnline: true,
    last_seen: "2024-12-04T22:46:21.549Z",
  },
};
