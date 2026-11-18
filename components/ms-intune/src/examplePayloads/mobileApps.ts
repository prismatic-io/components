import { selectManagedAppExamplePayload } from "./managedApps";

export const selectMobileAppExamplePayload = selectManagedAppExamplePayload;

export const listMobileAppsExamplePayload = {
  data: {
    value: [
      {
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
        informationUrl:
          "https://www.microsoft.com/en-us/microsoft-365/enterprise",
        owner: "Contoso IT",
        developer: "Microsoft Corporation",
        notes: "Deployed to all corporate Windows devices.",
        publishingState: "processing",
      },
    ],
  },
};

export const getMobileAppExamplePayload = {
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

export const assignMobileAppExamplePayload = {
  data: "Action successfully completed.",
};
