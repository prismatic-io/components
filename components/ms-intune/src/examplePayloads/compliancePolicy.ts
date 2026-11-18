export const getDeviceCompliancePolicyExamplePayload = {
  data: {
    "@odata.type": "#microsoft.graph.deviceCompliancePolicy",
    id: "4214b716-b716-4214-16b7-144216b71442",
    createdDateTime: "2017-01-01T00:02:43.5775965-08:00",
    description: "Baseline settings for corporate Windows devices.",
    lastModifiedDateTime: "2017-01-01T00:00:35.1329464-08:00",
    displayName: "Windows 11 Compliance Policy",
    version: 7,
  },
};

export const listDeviceCompliancePoliciesExamplePayload = {
  data: {
    value: [getDeviceCompliancePolicyExamplePayload.data],
  },
};

export const assignDeviceCompliancePolicyExamplePayload = {
  data: {
    value: [
      {
        "@odata.type": "#microsoft.graph.deviceCompliancePolicyAssignment",
        id: "92dc3fef-3fef-92dc-ef3f-dc92ef3fdc92",
        target: {
          "@odata.type":
            "microsoft.graph.configurationManagerCollectionAssignmentTarget",
          collectionId: "SMS00001",
        },
      },
    ],
  },
};

export const getDeviceCompliancePolicySettingStateSummaryExamplePayload = {
  data: {
    "@odata.type": "#microsoft.graph.deviceCompliancePolicySettingStateSummary",
    id: "7474d6d5-d6d5-7474-d5d6-7474d5d67474",
    setting: "deviceCompliancePolicy.passwordRequired",
    settingName: "Require a password to unlock mobile devices",
    platformType: "iOS",
    unknownDeviceCount: 2,
    notApplicableDeviceCount: 8,
    compliantDeviceCount: 4,
    remediatedDeviceCount: 5,
    nonCompliantDeviceCount: 7,
    errorDeviceCount: 0,
    conflictDeviceCount: 3,
  },
};

export const listDeviceCompliancePolicySettingStateSummariesExamplePayload = {
  data: {
    value: [getDeviceCompliancePolicySettingStateSummaryExamplePayload.data],
  },
};

export const selectDeviceCompliancePolicyExamplePayload = {
  result: [
    {
      label: "Windows 11 Compliance Policy",
      key: "4214b716-b716-4214-16b7-144216b71442",
    },
  ],
};

export const selectDeviceCompliancePolicySettingStateSummaryExamplePayload = {
  result: [
    {
      label: "Require a password to unlock mobile devices",
      key: "7474d6d5-d6d5-7474-d5d6-7474d5d67474",
    },
  ],
};
