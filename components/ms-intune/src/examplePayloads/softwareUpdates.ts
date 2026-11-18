export const updateSoftwareUpdateStatusSummaryExamplePayload = {
  data: {
    "@odata.type": "#microsoft.graph.softwareUpdateStatusSummary",
    id: "4f71421f-421f-4f71-1f42-714f1f42714f",
    displayName: "Windows Update Status",
    compliantDeviceCount: 4,
    nonCompliantDeviceCount: 7,
    remediatedDeviceCount: 5,
    errorDeviceCount: 0,
    unknownDeviceCount: 2,
    conflictDeviceCount: 3,
    notApplicableDeviceCount: 8,
    compliantUserCount: 2,
    nonCompliantUserCount: 5,
    remediatedUserCount: 3,
    errorUserCount: 14,
    unknownUserCount: 0,
    conflictUserCount: 1,
    notApplicableUserCount: 6,
  },
};

export const listSoftwareUpdateStatusSummaryExamplePayload = {
  data: updateSoftwareUpdateStatusSummaryExamplePayload.data,
};
