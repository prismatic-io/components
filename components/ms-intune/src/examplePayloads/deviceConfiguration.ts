export const getDeviceConfigurationsExamplePayload = {
  data: {
    "@odata.type": "#microsoft.graph.deviceConfiguration",
    id: "34977265-7265-3497-6572-973465729734",
    lastModifiedDateTime: "2017-01-01T00:00:35.1329464-08:00",
    createdDateTime: "2017-01-01T00:02:43.5775965-08:00",
    description: "Baseline settings for corporate Windows devices.",
    displayName: "Windows 11 Device Restrictions",
    version: 7,
  },
};

export const listDeviceConfigurationsExamplePayload = {
  data: {
    value: [getDeviceConfigurationsExamplePayload.data],
  },
};

export const selectDeviceConfigurationExamplePayload = {
  result: [
    {
      label: "Windows 11 Device Restrictions",
      key: "34977265-7265-3497-6572-973465729734",
    },
  ],
};
