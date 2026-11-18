export const selectManagedAppExamplePayload = {
  result: [
    {
      label: "Microsoft 365 Apps for enterprise",
      key: "0177548a-548a-0177-8a54-77018a547701",
    },
  ],
};

export const listManagedAppsExamplePayload = {
  data: {
    value: [
      {
        "@odata.type": "#microsoft.graph.webApp",
        id: "4bdc5d30-5d30-4bdc-305d-dc4b305ddc4b",
        displayName: "Microsoft 365 Apps for enterprise",
        description: "Productivity apps for corporate users.",
        publisher: "Microsoft Corporation",
        largeIcon: {
          "@odata.type": "microsoft.graph.mimeContent",
          type: "image/png",
          value: "dmFsdWU=",
        },
        createdDateTime: "2017-01-01T00:02:43.5775965-08:00",
        lastModifiedDateTime: "2017-01-01T00:00:35.1329464-08:00",
        isFeatured: true,
        privacyInformationUrl:
          "https://www.microsoft.com/en-us/privacy/privacystatement",
        informationUrl:
          "https://www.microsoft.com/en-us/microsoft-365/enterprise",
        owner: "Contoso IT",
        developer: "Microsoft Corporation",
        notes: "Deployed to all corporate Windows devices.",
        publishingState: "processing",
        appUrl: "https://apps.microsoft.com/detail/9wzdncrd29v9",
        useManagedBrowser: true,
      },
    ],
  },
};

export const getManagedAppExamplePayload = {
  data: {
    "@odata.type": "#microsoft.graph.mobileApp",
    id: "0177548a-548a-0177-8a54-77018a547701",
    displayName: "Microsoft 365 Apps for enterprise",
    description: "Productivity apps for corporate users.",
    publisher: "Microsoft Corporation",
    largeIcon: {
      "@odata.type": "microsoft.graph.mimeContent",
      type: "image/png",
      value: "dmFsdWU=",
    },
    createdDateTime: "2017-01-01T00:02:43.5775965-08:00",
    lastModifiedDateTime: "2017-01-01T00:00:35.1329464-08:00",
    isFeatured: true,
    privacyInformationUrl:
      "https://www.microsoft.com/en-us/privacy/privacystatement",
    informationUrl: "https://www.microsoft.com/en-us/microsoft-365/enterprise",
    owner: "Contoso IT",
    developer: "Microsoft Corporation",
    notes: "Deployed to all corporate Windows devices.",
    publishingState: "processing",
  },
};

export const createManagedAppExamplePayload = {
  data: {
    "@odata.type": "#microsoft.graph.officeSuiteApp",
    id: "9b263b46-3b46-9b26-463b-269b463b269b",
    displayName: "Microsoft 365 Apps for enterprise",
    description: "Productivity apps for corporate users.",
    publisher: "Microsoft Corporation",
    largeIcon: {
      "@odata.type": "microsoft.graph.mimeContent",
      type: "image/png",
      value: "dmFsdWU=",
    },
    createdDateTime: "2017-01-01T00:02:43.5775965-08:00",
    lastModifiedDateTime: "2017-01-01T00:00:35.1329464-08:00",
    isFeatured: true,
    privacyInformationUrl:
      "https://www.microsoft.com/en-us/privacy/privacystatement",
    informationUrl: "https://www.microsoft.com/en-us/microsoft-365/enterprise",
    owner: "Contoso IT",
    developer: "Microsoft Corporation",
    notes: "Deployed to all corporate Windows devices.",
    uploadState: 11,
    publishingState: "processing",
    isAssigned: true,
    roleScopeTagIds: ["0"],
    dependentAppCount: 1,
    supersedingAppCount: 3,
    supersededAppCount: 2,
    autoAcceptEula: true,
    productIds: ["o365BusinessRetail"],
    excludedApps: {
      "@odata.type": "microsoft.graph.excludedApps",
      access: true,
      bing: true,
      excel: true,
      groove: true,
      infoPath: true,
      lync: true,
      oneDrive: true,
      oneNote: true,
      outlook: true,
      powerPoint: true,
      publisher: true,
      sharePointDesigner: true,
      teams: true,
      visio: true,
      word: true,
    },
    useSharedComputerActivation: true,
    updateChannel: "current",
    officeSuiteAppDefaultFileFormat: "officeOpenXMLFormat",
    officePlatformArchitecture: "x86",
    localesToInstall: ["en-us"],
    installProgressDisplayLevel: "full",
    shouldUninstallOlderVersionsOfOffice: true,
    targetVersion: "16.0.18129.20158",
    updateVersion: "2410",
    officeConfigurationXml: "b2ZmaWNlQ29uZmlndXJhdGlvblhtbA==",
  },
};

export const updateManagedAppExamplePayload = createManagedAppExamplePayload;

export const deleteManagedAppExamplePayload = {
  data: {
    success: true,
    id: "0177548a-548a-0177-8a54-77018a547701",
    message: "Managed app deleted successfully.",
  },
};
