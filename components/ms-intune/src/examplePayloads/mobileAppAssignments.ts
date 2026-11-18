export const selectMobileAppAssignmentExamplePayload = {
  result: [{ label: "required", key: "591620b7-20b7-5916-b720-1659b7201659" }],
};

export const listMobileAppAssignmentsExamplePayload = {
  data: {
    value: [
      {
        "@odata.type": "#microsoft.graph.mobileAppAssignment",
        id: "591620b7-20b7-5916-b720-1659b7201659",
        intent: "required",
        target: {
          "@odata.type": "microsoft.graph.allLicensedUsersAssignmentTarget",
        },
        settings: {
          "@odata.type":
            "microsoft.graph.windowsUniversalAppXAppAssignmentSettings",
          useDeviceContext: true,
        },
      },
    ],
  },
};

export const getMobileAppAssignmentExamplePayload = {
  data: {
    "@odata.type": "#microsoft.graph.mobileAppAssignment",
    id: "591620b7-20b7-5916-b720-1659b7201659",
    intent: "required",
    target: {
      "@odata.type": "microsoft.graph.allLicensedUsersAssignmentTarget",
    },
    settings: {
      "@odata.type":
        "microsoft.graph.windowsUniversalAppXAppAssignmentSettings",
      useDeviceContext: true,
    },
  },
};

export const deleteMobileAppAssignmentExamplePayload = {
  data: {
    success: true,
    id: "591620b7-20b7-5916-b720-1659b7201660",
    message: "Mobile app assignment deleted successfully.",
  },
};

export const createMobileAppAssignmentExamplePayload =
  getMobileAppAssignmentExamplePayload;

export const updateMobileAppAssignmentExamplePayload =
  getMobileAppAssignmentExamplePayload;
