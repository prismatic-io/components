export const selectDetectedAppExamplePayload = {
  result: [
    {
      label: "Google Chrome",
      key: "caf60db6-0db6-caf6-b60d-f6cab60df6ca",
    },
  ],
};

export const listDetectedAppsExamplePayload = {
  data: {
    value: [
      {
        "@odata.type": "#microsoft.graph.detectedApp",
        id: "caf60db6-0db6-caf6-b60d-f6cab60df6ca",
        displayName: "Google Chrome",
        version: "130.0.6723.117",
        sizeInByte: 10,
        deviceCount: 11,
        publisher: "Google LLC",
        platform: "windows",
      },
    ],
  },
};

export const getDetectedAppExamplePayload = {
  data: {
    "@odata.type": "#microsoft.graph.detectedApp",
    id: "caf60db6-0db6-caf6-b60d-f6cab60df6ca",
    displayName: "Google Chrome",
    version: "130.0.6723.117",
    sizeInByte: 10,
    deviceCount: 11,
    publisher: "Google LLC",
    platform: "windows",
  },
};
