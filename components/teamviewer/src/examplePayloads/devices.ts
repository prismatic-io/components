



export const createDeviceExamplePayload = {
  data: {
    remotecontrol_id: "string",
    device_id: "string",
    userid: "string",
    alias: "string",
    groupid: "string",
    description: "string",
    online_state: 0,
    policy_id: "string",
    assigned_to: true,
    supported_features: "string",
    last_seen: "2024-12-03T20:50:49.084Z",
    teamviewer_id: 0,
  },
};

export const listDevicesExamplePayload = {
  data: {
    devices: [createDeviceExamplePayload.data],
  },
};

export const getDeviceExamplePayload = listDevicesExamplePayload;
