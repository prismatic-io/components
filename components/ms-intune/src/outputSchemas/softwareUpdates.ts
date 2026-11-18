const softwareUpdateStatusSummaryProperties = {
  "@odata.context": { type: "string" },
  "@odata.type": { type: "string" },
  id: { type: "string" },
  displayName: { type: ["string", "null"] },
  compliantDeviceCount: { type: ["integer", "null"] },
  nonCompliantDeviceCount: { type: ["integer", "null"] },
  remediatedDeviceCount: { type: ["integer", "null"] },
  errorDeviceCount: { type: ["integer", "null"] },
  unknownDeviceCount: { type: ["integer", "null"] },
  conflictDeviceCount: { type: ["integer", "null"] },
  notApplicableDeviceCount: { type: ["integer", "null"] },
  compliantUserCount: { type: ["integer", "null"] },
  nonCompliantUserCount: { type: ["integer", "null"] },
  remediatedUserCount: { type: ["integer", "null"] },
  errorUserCount: { type: ["integer", "null"] },
  unknownUserCount: { type: ["integer", "null"] },
  conflictUserCount: { type: ["integer", "null"] },
  notApplicableUserCount: { type: ["integer", "null"] },
};

export const listSoftwareUpdateStatusSummaryOutputSchema = {
  type: "object" as const,
  properties: softwareUpdateStatusSummaryProperties,
  required: [],
};

export const updateSoftwareUpdateStatusSummaryOutputSchema = {
  type: "object" as const,
  properties: softwareUpdateStatusSummaryProperties,
  required: ["id"],
};
