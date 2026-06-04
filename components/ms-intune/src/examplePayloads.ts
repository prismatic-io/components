export const selectManagedDeviceExamplePayload = [
  { label: "Device Name value", key: "705c034c-034c-705c-4c03-5c704c035c70" },
];

export const selectManagedAppExamplePayload = [
  { label: "Display Name value", key: "0177548a-548a-0177-8a54-77018a547701" },
];

export const selectMobileAppExamplePayload = selectManagedAppExamplePayload;

export const selectGroupExamplePayload = selectMobileAppExamplePayload;

export const selectMobileAppAssignmentExamplePayload = [
  { label: "required", key: "591620b7-20b7-5916-b720-1659b7201659" },
];

export const listManagedDevicesExamplePayload = {
  data: {
    value: [
      {
        "@odata.type": "#microsoft.graph.managedDevice",
        id: "705c034c-034c-705c-4c03-5c704c035c70",
        userId: "User Id value",
        deviceName: "Device Name value",
        managedDeviceOwnerType: "company",
        deviceActionResults: [
          {
            "@odata.type": "microsoft.graph.deviceActionResult",
            actionName: "Action Name value",
            actionState: "pending",
            startDateTime: "2016-12-31T23:58:46.7156189-08:00",
            lastUpdatedDateTime: "2017-01-01T00:00:56.8321556-08:00",
          },
        ],
        enrolledDateTime: "2016-12-31T23:59:43.797191-08:00",
        lastSyncDateTime: "2017-01-01T00:02:49.3205976-08:00",
        operatingSystem: "Operating System value",
        complianceState: "compliant",
        jailBroken: "Jail Broken value",
        managementAgent: "mdm",
        osVersion: "Os Version value",
        easActivated: true,
        easDeviceId: "Eas Device Id value",
        easActivationDateTime: "2016-12-31T23:59:43.4878784-08:00",
        azureADRegistered: true,
        deviceEnrollmentType: "userEnrollment",
        activationLockBypassCode: "Activation Lock Bypass Code value",
        emailAddress: "Email Address value",
        azureADDeviceId: "Azure ADDevice Id value",
        deviceRegistrationState: "registered",
        deviceCategoryDisplayName: "Device Category Display Name value",
        isSupervised: true,
        exchangeLastSuccessfulSyncDateTime: "2017-01-01T00:00:45.8803083-08:00",
        exchangeAccessState: "unknown",
        exchangeAccessStateReason: "unknown",
        remoteAssistanceSessionUrl:
          "https://example.com/remoteAssistanceSessionUrl/",
        remoteAssistanceSessionErrorDetails:
          "Remote Assistance Session Error Details value",
        isEncrypted: true,
        userPrincipalName: "User Principal Name value",
        model: "Model value",
        manufacturer: "Manufacturer value",
        imei: "Imei value",
        complianceGracePeriodExpirationDateTime:
          "2016-12-31T23:56:44.951111-08:00",
        serialNumber: "Serial Number value",
        phoneNumber: "Phone Number value",
        androidSecurityPatchLevel: "Android Security Patch Level value",
        userDisplayName: "User Display Name value",
        configurationManagerClientEnabledFeatures: {
          "@odata.type":
            "microsoft.graph.configurationManagerClientEnabledFeatures",
          inventory: true,
          modernApps: true,
          resourceAccess: true,
          deviceConfiguration: true,
          compliancePolicy: true,
          windowsUpdateForBusiness: true,
        },
        wiFiMacAddress: "Wi Fi Mac Address value",
        deviceHealthAttestationState: {
          "@odata.type": "microsoft.graph.deviceHealthAttestationState",
          lastUpdateDateTime: "Last Update Date Time value",
          contentNamespaceUrl: "https://example.com/contentNamespaceUrl/",
          deviceHealthAttestationStatus:
            "Device Health Attestation Status value",
          contentVersion: "Content Version value",
          issuedDateTime: "2016-12-31T23:58:22.1231038-08:00",
          attestationIdentityKey: "Attestation Identity Key value",
          resetCount: 10,
          restartCount: 12,
          dataExcutionPolicy: "Data Excution Policy value",
          bitLockerStatus: "Bit Locker Status value",
          bootManagerVersion: "Boot Manager Version value",
          codeIntegrityCheckVersion: "Code Integrity Check Version value",
          secureBoot: "Secure Boot value",
          bootDebugging: "Boot Debugging value",
          operatingSystemKernelDebugging:
            "Operating System Kernel Debugging value",
          codeIntegrity: "Code Integrity value",
          testSigning: "Test Signing value",
          safeMode: "Safe Mode value",
          windowsPE: "Windows PE value",
          earlyLaunchAntiMalwareDriverProtection:
            "Early Launch Anti Malware Driver Protection value",
          virtualSecureMode: "Virtual Secure Mode value",
          pcrHashAlgorithm: "Pcr Hash Algorithm value",
          bootAppSecurityVersion: "Boot App Security Version value",
          bootManagerSecurityVersion: "Boot Manager Security Version value",
          tpmVersion: "Tpm Version value",
          pcr0: "Pcr0 value",
          secureBootConfigurationPolicyFingerPrint:
            "Secure Boot Configuration Policy Finger Print value",
          codeIntegrityPolicy: "Code Integrity Policy value",
          bootRevisionListInfo: "Boot Revision List Info value",
          operatingSystemRevListInfo: "Operating System Rev List Info value",
          healthStatusMismatchInfo: "Health Status Mismatch Info value",
          healthAttestationSupportedStatus:
            "Health Attestation Supported Status value",
        },
        subscriberCarrier: "Subscriber Carrier value",
        meid: "Meid value",
        totalStorageSpaceInBytes: 8,
        freeStorageSpaceInBytes: 7,
        managedDeviceName: "Managed Device Name value",
        partnerReportedThreatState: "activated",
        requireUserEnrollmentApproval: true,
        managementCertificateExpirationDate:
          "2016-12-31T23:57:59.9789653-08:00",
        iccid: "Iccid value",
        udid: "Udid value",
        notes: "Notes value",
        ethernetMacAddress: "Ethernet Mac Address value",
        physicalMemoryInBytes: 5,
        enrollmentProfileName: "Enrollment Profile Name value",
      },
    ],
  },
};

export const getManagedDeviceExamplePayload = {
  data: {
    "@odata.type": "#microsoft.graph.managedDevice",
    id: "705c034c-034c-705c-4c03-5c704c035c70",
    userId: "User Id value",
    deviceName: "Device Name value",
    managedDeviceOwnerType: "company",
    deviceActionResults: [
      {
        "@odata.type": "microsoft.graph.deviceActionResult",
        actionName: "Action Name value",
        actionState: "pending",
        startDateTime: "2016-12-31T23:58:46.7156189-08:00",
        lastUpdatedDateTime: "2017-01-01T00:00:56.8321556-08:00",
      },
    ],
    enrolledDateTime: "2016-12-31T23:59:43.797191-08:00",
    lastSyncDateTime: "2017-01-01T00:02:49.3205976-08:00",
    operatingSystem: "Operating System value",
    complianceState: "compliant",
    jailBroken: "Jail Broken value",
    managementAgent: "mdm",
    osVersion: "Os Version value",
    easActivated: true,
    easDeviceId: "Eas Device Id value",
    easActivationDateTime: "2016-12-31T23:59:43.4878784-08:00",
    azureADRegistered: true,
    deviceEnrollmentType: "userEnrollment",
    activationLockBypassCode: "Activation Lock Bypass Code value",
    emailAddress: "Email Address value",
    azureADDeviceId: "Azure ADDevice Id value",
    deviceRegistrationState: "registered",
    deviceCategoryDisplayName: "Device Category Display Name value",
    isSupervised: true,
    exchangeLastSuccessfulSyncDateTime: "2017-01-01T00:00:45.8803083-08:00",
    exchangeAccessState: "unknown",
    exchangeAccessStateReason: "unknown",
    remoteAssistanceSessionUrl:
      "https://example.com/remoteAssistanceSessionUrl/",
    remoteAssistanceSessionErrorDetails:
      "Remote Assistance Session Error Details value",
    isEncrypted: true,
    userPrincipalName: "User Principal Name value",
    model: "Model value",
    manufacturer: "Manufacturer value",
    imei: "Imei value",
    complianceGracePeriodExpirationDateTime: "2016-12-31T23:56:44.951111-08:00",
    serialNumber: "Serial Number value",
    phoneNumber: "Phone Number value",
    androidSecurityPatchLevel: "Android Security Patch Level value",
    userDisplayName: "User Display Name value",
    configurationManagerClientEnabledFeatures: {
      "@odata.type":
        "microsoft.graph.configurationManagerClientEnabledFeatures",
      inventory: true,
      modernApps: true,
      resourceAccess: true,
      deviceConfiguration: true,
      compliancePolicy: true,
      windowsUpdateForBusiness: true,
    },
    wiFiMacAddress: "Wi Fi Mac Address value",
    deviceHealthAttestationState: {
      "@odata.type": "microsoft.graph.deviceHealthAttestationState",
      lastUpdateDateTime: "Last Update Date Time value",
      contentNamespaceUrl: "https://example.com/contentNamespaceUrl/",
      deviceHealthAttestationStatus: "Device Health Attestation Status value",
      contentVersion: "Content Version value",
      issuedDateTime: "2016-12-31T23:58:22.1231038-08:00",
      attestationIdentityKey: "Attestation Identity Key value",
      resetCount: 10,
      restartCount: 12,
      dataExcutionPolicy: "Data Excution Policy value",
      bitLockerStatus: "Bit Locker Status value",
      bootManagerVersion: "Boot Manager Version value",
      codeIntegrityCheckVersion: "Code Integrity Check Version value",
      secureBoot: "Secure Boot value",
      bootDebugging: "Boot Debugging value",
      operatingSystemKernelDebugging: "Operating System Kernel Debugging value",
      codeIntegrity: "Code Integrity value",
      testSigning: "Test Signing value",
      safeMode: "Safe Mode value",
      windowsPE: "Windows PE value",
      earlyLaunchAntiMalwareDriverProtection:
        "Early Launch Anti Malware Driver Protection value",
      virtualSecureMode: "Virtual Secure Mode value",
      pcrHashAlgorithm: "Pcr Hash Algorithm value",
      bootAppSecurityVersion: "Boot App Security Version value",
      bootManagerSecurityVersion: "Boot Manager Security Version value",
      tpmVersion: "Tpm Version value",
      pcr0: "Pcr0 value",
      secureBootConfigurationPolicyFingerPrint:
        "Secure Boot Configuration Policy Finger Print value",
      codeIntegrityPolicy: "Code Integrity Policy value",
      bootRevisionListInfo: "Boot Revision List Info value",
      operatingSystemRevListInfo: "Operating System Rev List Info value",
      healthStatusMismatchInfo: "Health Status Mismatch Info value",
      healthAttestationSupportedStatus:
        "Health Attestation Supported Status value",
    },
    subscriberCarrier: "Subscriber Carrier value",
    meid: "Meid value",
    totalStorageSpaceInBytes: 8,
    freeStorageSpaceInBytes: 7,
    managedDeviceName: "Managed Device Name value",
    partnerReportedThreatState: "activated",
    requireUserEnrollmentApproval: true,
    managementCertificateExpirationDate: "2016-12-31T23:57:59.9789653-08:00",
    iccid: "Iccid value",
    udid: "Udid value",
    notes: "Notes value",
    ethernetMacAddress: "Ethernet Mac Address value",
    physicalMemoryInBytes: 5,
    enrollmentProfileName: "Enrollment Profile Name value",
  },
};

export const createManagedDeviceExamplePayload = {
  data: {
    "@odata.type": "#microsoft.graph.managedDevice",
    id: "705c034c-034c-705c-4c03-5c704c035c70",
    userId: "User Id value",
    deviceName: "Device Name value",
    managedDeviceOwnerType: "company",
    deviceActionResults: [
      {
        "@odata.type": "microsoft.graph.deviceActionResult",
        actionName: "Action Name value",
        actionState: "pending",
        startDateTime: "2016-12-31T23:58:46.7156189-08:00",
        lastUpdatedDateTime: "2017-01-01T00:00:56.8321556-08:00",
      },
    ],
    enrolledDateTime: "2016-12-31T23:59:43.797191-08:00",
    lastSyncDateTime: "2017-01-01T00:02:49.3205976-08:00",
    operatingSystem: "Operating System value",
    complianceState: "compliant",
    jailBroken: "Jail Broken value",
    managementAgent: "mdm",
    osVersion: "Os Version value",
    easActivated: true,
    easDeviceId: "Eas Device Id value",
    easActivationDateTime: "2016-12-31T23:59:43.4878784-08:00",
    azureADRegistered: true,
    deviceEnrollmentType: "userEnrollment",
    activationLockBypassCode: "Activation Lock Bypass Code value",
    emailAddress: "Email Address value",
    azureADDeviceId: "Azure ADDevice Id value",
    deviceRegistrationState: "registered",
    deviceCategoryDisplayName: "Device Category Display Name value",
    isSupervised: true,
    exchangeLastSuccessfulSyncDateTime: "2017-01-01T00:00:45.8803083-08:00",
    exchangeAccessState: "unknown",
    exchangeAccessStateReason: "unknown",
    remoteAssistanceSessionUrl:
      "https://example.com/remoteAssistanceSessionUrl/",
    remoteAssistanceSessionErrorDetails:
      "Remote Assistance Session Error Details value",
    isEncrypted: true,
    userPrincipalName: "User Principal Name value",
    model: "Model value",
    manufacturer: "Manufacturer value",
    imei: "Imei value",
    complianceGracePeriodExpirationDateTime: "2016-12-31T23:56:44.951111-08:00",
    serialNumber: "Serial Number value",
    phoneNumber: "Phone Number value",
    androidSecurityPatchLevel: "Android Security Patch Level value",
    userDisplayName: "User Display Name value",
    configurationManagerClientEnabledFeatures: {
      "@odata.type":
        "microsoft.graph.configurationManagerClientEnabledFeatures",
      inventory: true,
      modernApps: true,
      resourceAccess: true,
      deviceConfiguration: true,
      compliancePolicy: true,
      windowsUpdateForBusiness: true,
    },
    wiFiMacAddress: "Wi Fi Mac Address value",
    deviceHealthAttestationState: {
      "@odata.type": "microsoft.graph.deviceHealthAttestationState",
      lastUpdateDateTime: "Last Update Date Time value",
      contentNamespaceUrl: "https://example.com/contentNamespaceUrl/",
      deviceHealthAttestationStatus: "Device Health Attestation Status value",
      contentVersion: "Content Version value",
      issuedDateTime: "2016-12-31T23:58:22.1231038-08:00",
      attestationIdentityKey: "Attestation Identity Key value",
      resetCount: 10,
      restartCount: 12,
      dataExcutionPolicy: "Data Excution Policy value",
      bitLockerStatus: "Bit Locker Status value",
      bootManagerVersion: "Boot Manager Version value",
      codeIntegrityCheckVersion: "Code Integrity Check Version value",
      secureBoot: "Secure Boot value",
      bootDebugging: "Boot Debugging value",
      operatingSystemKernelDebugging: "Operating System Kernel Debugging value",
      codeIntegrity: "Code Integrity value",
      testSigning: "Test Signing value",
      safeMode: "Safe Mode value",
      windowsPE: "Windows PE value",
      earlyLaunchAntiMalwareDriverProtection:
        "Early Launch Anti Malware Driver Protection value",
      virtualSecureMode: "Virtual Secure Mode value",
      pcrHashAlgorithm: "Pcr Hash Algorithm value",
      bootAppSecurityVersion: "Boot App Security Version value",
      bootManagerSecurityVersion: "Boot Manager Security Version value",
      tpmVersion: "Tpm Version value",
      pcr0: "Pcr0 value",
      secureBootConfigurationPolicyFingerPrint:
        "Secure Boot Configuration Policy Finger Print value",
      codeIntegrityPolicy: "Code Integrity Policy value",
      bootRevisionListInfo: "Boot Revision List Info value",
      operatingSystemRevListInfo: "Operating System Rev List Info value",
      healthStatusMismatchInfo: "Health Status Mismatch Info value",
      healthAttestationSupportedStatus:
        "Health Attestation Supported Status value",
    },
    subscriberCarrier: "Subscriber Carrier value",
    meid: "Meid value",
    totalStorageSpaceInBytes: 8,
    freeStorageSpaceInBytes: 7,
    managedDeviceName: "Managed Device Name value",
    partnerReportedThreatState: "activated",
    requireUserEnrollmentApproval: true,
    managementCertificateExpirationDate: "2016-12-31T23:57:59.9789653-08:00",
    iccid: "Iccid value",
    udid: "Udid value",
    notes: "Notes value",
    ethernetMacAddress: "Ethernet Mac Address value",
    physicalMemoryInBytes: 5,
    enrollmentProfileName: "Enrollment Profile Name value",
  },
};

export const listUsersExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users",
    value: [
      {
        businessPhones: [],
        displayName: "Conf Room Adams",
        givenName: null,
        jobTitle: null,
        mail: "Adams@contoso.com",
        mobilePhone: null,
        officeLocation: null,
        preferredLanguage: null,
        surname: null,
        userPrincipalName: "Adams@contoso.com",
        id: "6ea91a8d-e32e-41a1-b7bd-d2d185eed0e0",
      },
      {
        businessPhones: ["425-555-0100"],
        displayName: "MOD Administrator",
        givenName: "MOD",
        jobTitle: null,
        mail: null,
        mobilePhone: "425-555-0101",
        officeLocation: null,
        preferredLanguage: "en-US",
        surname: "Administrator",
        userPrincipalName: "admin@contoso.com",
        id: "4562bcc8-c436-4f95-b7c0-4f8ce89dca5e",
      },
    ],
  },
};

export const getUserExamplePayload = {
  data: {
    businessPhones: ["+1 425 555 0109"],
    displayName: "Adele Vance",
    givenName: "Adele",
    jobTitle: "Retail Manager",
    mail: "AdeleV@contoso.com",
    mobilePhone: "+1 425 555 0109",
    officeLocation: "18/2111",
    preferredLanguage: "en-US",
    surname: "Vance",
    userPrincipalName: "AdeleV@contoso.com",
    id: "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
  },
};

export const createUserExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#users/$entity",
    id: "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
    businessPhones: [],
    displayName: "Adele Vance",
    givenName: "Adele",
    jobTitle: "Product Marketing Manager",
    mail: "AdeleV@contoso.com",
    mobilePhone: "+1 425 555 0109",
    officeLocation: "18/2111",
    preferredLanguage: "en-US",
    surname: "Vance",
    userPrincipalName: "AdeleV@contoso.com",
  },
};

export const selectDetectedAppExamplePayload = [
  { label: "Display Name value", key: "caf60db6-0db6-caf6-b60d-f6cab60df6ca" },
];

export const listDetectedAppsExamplePayload = {
  data: {
    value: [
      {
        "@odata.type": "#microsoft.graph.detectedApp",
        id: "caf60db6-0db6-caf6-b60d-f6cab60df6ca",
        displayName: "Display Name value",
        version: "Version value",
        sizeInByte: 10,
        deviceCount: 11,
        publisher: "Publisher value",
        platform: "windows",
      },
    ],
  },
};

export const getDetectedAppExamplePayload = {
  data: {
    "@odata.type": "#microsoft.graph.detectedApp",
    id: "caf60db6-0db6-caf6-b60d-f6cab60df6ca",
    displayName: "Display Name value",
    version: "Version value",
    sizeInByte: 10,
    deviceCount: 11,
    publisher: "Publisher value",
    platform: "windows",
  },
};

export const createDetectedAppExamplePayload = {
  data: {
    "@odata.type": "#microsoft.graph.detectedApp",
    id: "caf60db6-0db6-caf6-b60d-f6cab60df6ca",
    displayName: "Display Name value",
    version: "Version value",
    sizeInByte: 10,
    deviceCount: 11,
    publisher: "Publisher value",
    platform: "windows",
  },
};

export const updateDetectedAppExamplePayload = createDetectedAppExamplePayload;

export const listManagedAppsExamplePayload = {
  data: {
    value: [
      {
        "@odata.type": "#microsoft.graph.webApp",
        id: "4bdc5d30-5d30-4bdc-305d-dc4b305ddc4b",
        displayName: "Display Name value",
        description: "Description value",
        publisher: "Publisher value",
        largeIcon: {
          "@odata.type": "microsoft.graph.mimeContent",
          type: "Type value",
          value: "dmFsdWU=",
        },
        createdDateTime: "2017-01-01T00:02:43.5775965-08:00",
        lastModifiedDateTime: "2017-01-01T00:00:35.1329464-08:00",
        isFeatured: true,
        privacyInformationUrl: "https://example.com/privacyInformationUrl/",
        informationUrl: "https://example.com/informationUrl/",
        owner: "Owner value",
        developer: "Developer value",
        notes: "Notes value",
        publishingState: "processing",
        appUrl: "https://example.com/appUrl/",
        useManagedBrowser: true,
      },
    ],
  },
};

export const getManagedAppExamplePayload = {
  data: {
    "@odata.type": "#microsoft.graph.mobileApp",
    id: "0177548a-548a-0177-8a54-77018a547701",
    displayName: "Display Name value",
    description: "Description value",
    publisher: "Publisher value",
    largeIcon: {
      "@odata.type": "microsoft.graph.mimeContent",
      type: "Type value",
      value: "dmFsdWU=",
    },
    createdDateTime: "2017-01-01T00:02:43.5775965-08:00",
    lastModifiedDateTime: "2017-01-01T00:00:35.1329464-08:00",
    isFeatured: true,
    privacyInformationUrl: "https://example.com/privacyInformationUrl/",
    informationUrl: "https://example.com/informationUrl/",
    owner: "Owner value",
    developer: "Developer value",
    notes: "Notes value",
    publishingState: "processing",
  },
};

export const createManagedAppExamplePayload = {
  data: {
    "@odata.type": "#microsoft.graph.officeSuiteApp",
    id: "9b263b46-3b46-9b26-463b-269b463b269b",
    displayName: "Display Name value",
    description: "Description value",
    publisher: "Publisher value",
    largeIcon: {
      "@odata.type": "microsoft.graph.mimeContent",
      type: "Type value",
      value: "dmFsdWU=",
    },
    createdDateTime: "2017-01-01T00:02:43.5775965-08:00",
    lastModifiedDateTime: "2017-01-01T00:00:35.1329464-08:00",
    isFeatured: true,
    privacyInformationUrl: "https://example.com/privacyInformationUrl/",
    informationUrl: "https://example.com/informationUrl/",
    owner: "Owner value",
    developer: "Developer value",
    notes: "Notes value",
    uploadState: 11,
    publishingState: "processing",
    isAssigned: true,
    roleScopeTagIds: ["Role Scope Tag Ids value"],
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
    localesToInstall: ["Locales To Install value"],
    installProgressDisplayLevel: "full",
    shouldUninstallOlderVersionsOfOffice: true,
    targetVersion: "Target Version value",
    updateVersion: "Update Version value",
    officeConfigurationXml: "b2ZmaWNlQ29uZmlndXJhdGlvblhtbA==",
  },
};

export const updateManagedAppExamplePayload = createManagedAppExamplePayload;

export const listDomainsExamplePayload = {
  data: {
    value: [
      {
        authenticationType: "authenticationType-value",
        availabilityStatus: "availabilityStatus-value",
        isAdminManaged: true,
        isDefault: true,
        isInitial: true,
        isRoot: true,
        id: "contoso.com",
        supportedServices: ["Email", "OfficeCommunicationsOnline"],
      },
    ],
  },
};

export const assignManagedAppToGroupExamplePayload = {
  data: {
    "@odata.type": "#microsoft.graph.mobileAppAssignment",
    id: "591620b7-20b7-5916-b720-1659b7201659",
    intent: "required",
    target: {
      "@odata.type": "#microsoft.graph.groupAssignmentTarget",
    },
    settings: null,
  },
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

export const listMobileAppsExamplePayload = {
  data: {
    value: [
      {
        "@odata.type": "#microsoft.graph.mobileApp",
        id: "0177548a-548a-0177-8a54-77018a547701",
        displayName: "Display Name value",
        description: "Description value",
        publisher: "Publisher value",
        largeIcon: {
          "@odata.type": "microsoft.graph.mimeContent",
          type: "Type value",
          value: "dmFsdWU=",
        },
        createdDateTime: "2017-01-01T00:02:43.5775965-08:00",
        lastModifiedDateTime: "2017-01-01T00:00:35.1329464-08:00",
        isFeatured: true,
        privacyInformationUrl: "https://example.com/privacyInformationUrl/",
        informationUrl: "https://example.com/informationUrl/",
        owner: "Owner value",
        developer: "Developer value",
        notes: "Notes value",
        publishingState: "processing",
      },
    ],
  },
};

export const getMobileAppExamplePayload = {
  data: {
    "@odata.type": "#microsoft.graph.mobileApp",
    id: "0177548a-548a-0177-8a54-77018a547701",
    displayName: "Display Name value",
    description: "Description value",
    publisher: "Publisher value",
    largeIcon: {
      "@odata.type": "microsoft.graph.mimeContent",
      type: "Type value",
      value: "dmFsdWU=",
    },
    createdDateTime: "2017-01-01T00:02:43.5775965-08:00",
    lastModifiedDateTime: "2017-01-01T00:00:35.1329464-08:00",
    isFeatured: true,
    privacyInformationUrl: "https://example.com/privacyInformationUrl/",
    informationUrl: "https://example.com/informationUrl/",
    owner: "Owner value",
    developer: "Developer value",
    notes: "Notes value",
    publishingState: "processing",
  },
};

export const listGroupsExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#groups",
    value: [
      {
        id: "45b7d2e7-b882-4a80-ba97-10b7a63b8fa4",
        deletedDateTime: null,
        classification: null,
        createdDateTime: "2018-12-22T02:21:05Z",
        description: "Self help community for golf",
        displayName: "Golf Assist",
        expirationDateTime: null,
        groupTypes: ["Unified"],
        isAssignableToRole: null,
        mail: "golfassist@contoso.com",
        mailEnabled: true,
        mailNickname: "golfassist",
        membershipRule: null,
        membershipRuleProcessingState: null,
        onPremisesLastSyncDateTime: null,
        onPremisesSecurityIdentifier: null,
        onPremisesSyncEnabled: null,
        preferredDataLocation: "CAN",
        preferredLanguage: null,
        proxyAddresses: [
          "smtp:golfassist@contoso.com",
          "SMTP:golfassist@contoso.com",
        ],
        renewedDateTime: "2018-12-22T02:21:05Z",
        resourceBehaviorOptions: [],
        resourceProvisioningOptions: [],
        securityEnabled: false,
        theme: null,
        visibility: "Public",
        onPremisesProvisioningErrors: [],
      },
      {
        id: "d7797254-3084-44d0-99c9-a3b5ab149538",
        deletedDateTime: null,
        classification: null,
        createdDateTime: "2018-11-19T20:29:40Z",
        description: "Talk about golf",
        displayName: "Golf Discussion",
        expirationDateTime: null,
        groupTypes: [],
        isAssignableToRole: null,
        mail: "golftalk@contoso.com",
        mailEnabled: true,
        mailNickname: "golftalk",
        membershipRule: null,
        membershipRuleProcessingState: null,
        onPremisesLastSyncDateTime: null,
        onPremisesSecurityIdentifier: null,
        onPremisesSyncEnabled: null,
        preferredDataLocation: "CAN",
        preferredLanguage: null,
        proxyAddresses: [
          "smtp:golftalk@contoso.com",
          "SMTP:golftalk@contoso.com",
        ],
        renewedDateTime: "2018-11-19T20:29:40Z",
        resourceBehaviorOptions: [],
        resourceProvisioningOptions: [],
        securityEnabled: false,
        serviceProvisioningErrors: [],
        theme: null,
        visibility: null,
        onPremisesProvisioningErrors: [],
      },
    ],
  },
};

export const getGroupExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#groups/$entity",
    id: "02bd9fd6-8f93-4758-87c3-1fb73740a315",
    deletedDateTime: null,
    classification: null,
    createdDateTime: "2017-07-31T18:56:16Z",
    description: "Welcome to the HR Taskforce team.",
    displayName: "HR Taskforce",
    expirationDateTime: null,
    groupTypes: ["Unified"],
    isAssignableToRole: null,
    mail: "HRTaskforce@contoso.com",
    mailEnabled: true,
    mailNickname: "HRTaskforce",
    membershipRule: null,
    membershipRuleProcessingState: null,
    onPremisesDomainName: null,
    onPremisesLastSyncDateTime: null,
    onPremisesNetBiosName: null,
    onPremisesSamAccountName: null,
    onPremisesSecurityIdentifier: null,
    onPremisesSyncEnabled: null,
    preferredDataLocation: null,
    preferredLanguage: null,
    proxyAddresses: [
      "SMTP:HRTaskforce@contoso.com",
      "SPO:SPO_896cf652-b200-4b74-8111-c013f64406cf@SPO_dcd219dd-bc68-4b9b-bf0b-4a33a796be35",
    ],
    renewedDateTime: "2020-01-24T19:01:14Z",
    resourceBehaviorOptions: [],
    resourceProvisioningOptions: ["Team"],
    securityEnabled: false,
    securityIdentifier: "S-1-12-1-45981654-1196986259-3072312199-363020343",
    serviceProvisioningErrors: [],
    theme: null,
    visibility: "Private",
    onPremisesProvisioningErrors: [],
  },
};

export const listSubscriptionsExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#subscriptions",
    value: [
      {
        id: "0fc0d6db-0073-42e5-a186-853da75fb308",
        resource: "Users",
        applicationId: "24d3b144-21ae-4080-943f-7067b395b913",
        changeType: "updated,deleted",
        clientState: null,
        notificationUrl:
          "https://webhookappexample.azurewebsites.net/api/notifications",
        lifecycleNotificationUrl:
          "https://webhook.azurewebsites.net/api/send/lifecycleNotifications",
        expirationDateTime: "2018-03-12T05:00:00Z",
        creatorId: "8ee44408-0679-472c-bc2a-692812af3437",
        latestSupportedTlsVersion: "v1_2",
        encryptionCertificate: "",
        encryptionCertificateId: "",
        includeResourceData: false,
        notificationContentType: "application/json",
      },
    ],
  },
};

export const getSubscriptionExamplePayload = {
  data: [
    {
      id: "7f105c7d-2dc5-4530-97cd-4e7ae6534c07",
      resource: "me/messages",
      applicationId: "string",
      changeType: "created,updated",
      clientState: "secretClientValue",
      notificationUrl:
        "https://webhook.azurewebsites.net/api/send/myNotifyClient",
      lifecycleNotificationUrl:
        "https://webhook.azurewebsites.net/api/send/lifecycleNotifications",
      expirationDateTime: "2016-11-20T18:23:45.9356913Z",
      creatorId: "string",
      latestSupportedTlsVersion: "v1_2",
      encryptionCertificate: "",
      encryptionCertificateId: "",
      includeResourceData: false,
      notificationContentType: "application/json",
    },
  ],
};

export const deletedSubscriptionsExamplePayload = {
  data: [
    "7f105c7d-2dc5-4530-97cd-4e7ae6534c07",
    "0fc0d6db-0073-42e5-a186-853da75fb308",
  ],
};

export const wipeDeviceExamplePayload = {
  data: {
    keepEnrollmentData: true,
    keepUserData: true,
    macOsUnlockCode: "Mac Os Unlock Code value",
    persistEsimDataPlan: true,
  },
};

export const getDeviceCompliancePolicyExamplePayload = {
  data: {
    "@odata.type": "#microsoft.graph.deviceCompliancePolicy",
    id: "4214b716-b716-4214-16b7-144216b71442",
    createdDateTime: "2017-01-01T00:02:43.5775965-08:00",
    description: "Description value",
    lastModifiedDateTime: "2017-01-01T00:00:35.1329464-08:00",
    displayName: "Display Name value",
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
          collectionId: "Collection Id value",
        },
      },
    ],
  },
};

export const getDeviceConfigurationExamplePayload = {
  data: {
    "@odata.type": "#microsoft.graph.deviceConfiguration",
    id: "34977265-7265-3497-6572-973465729734",
    lastModifiedDateTime: "2017-01-01T00:00:35.1329464-08:00",
    createdDateTime: "2017-01-01T00:02:43.5775965-08:00",
    description: "Description value",
    displayName: "Display Name value",
    version: 7,
  },
};

export const listDeviceConfigurationsExamplePayload = {
  data: {
    value: [getDeviceConfigurationExamplePayload.data],
  },
};

export const listDirectoryAuditExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#auditlogs/directoryaudits",
    value: [
      {
        id: "id",
        category: "UserManagement",
        correlationId: "da159bfb-54fa-4092-8a38-6e1fa7870e30",
        result: "success",
        resultReason: "Successfully added member to group",
        activityDisplayName: "Add member to group",
        activityDateTime: "2018-01-09T21:20:02.7215374Z",
        loggedByService: "Core Directory",
        initiatedBy: {
          user: {
            id: "728309ae-1a37-4937-9afe-e35d964db09b",
            displayName: "Audry Oliver",
            userPrincipalName: "bob@wingtiptoysonline.com",
            ipAddress: "127.0.0.1",
          },
          app: null,
        },
        targetResources: [
          {
            id: "ef7e527d-6c92-4234-8c6d-cf6fdfb57f95",
            displayName: "Example.com",
            Type: "Group",
            modifiedProperties: [
              {
                displayName: "Action Client Name",
                oldValue: null,
                newValue: "DirectorySync",
              },
            ],
            groupType: "unifiedGroups",
          },
          {
            id: "1f0e98f5-3161-4c6b-9b50-d488572f2bb7",
            displayName: null,
            Type: "User",
            modifiedProperties: [],
            userPrincipalName: "bob@contoso.com",
          },
        ],
        additionalDetails: [
          {
            key: "Additional Detail Name",
            value: "Additional Detail Value",
          },
        ],
      },
    ],
  },
};

export const getDirectoryAuditExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#auditlogs/directoryaudits",
    value: [
      {
        id: "id",
        category: "UserManagement",
        correlationId: "da159bfb-54fa-4092-8a38-6e1fa7870e30",
        result: "success",
        resultReason: "Successfully added member to group",
        activityDisplayName: "Add member to group",
        activityDateTime: "2018-01-09T21:20:02.7215374Z",
        loggedByService: "Core Directory",
        initiatedBy: {
          user: {
            id: "728309ae-1a37-4937-9afe-e35d964db09b",
            displayName: "Audry Oliver",
            userPrincipalName: "bob@wingtiptoysonline.com",
            ipAddress: "127.0.0.1",
          },
          app: null,
        },
        targetResource: [
          {
            id: "ef7e527d-6c92-4234-8c6d-cf6fdfb57f95",
            displayName: "Example.com",
            Type: "Group",
            modifiedProperties: [
              {
                displayName: "Action Client Name",
                oldValue: null,
                newValue: "DirectorySync",
              },
            ],
            groupType: "unifiedGroups",
          },
          {
            id: "1f0e98f5-3161-4c6b-9b50-d488572f2bb7",
            displayName: null,
            Type: "User",
            modifiedProperties: [],
            userPrincipalName: "example@contoso.com",
          },
        ],
        additionalDetails: [
          {
            key: "Additional Detail Name",
            value: "Additional Detail Value",
          },
        ],
      },
    ],
  },
};

export const getDeviceCompliancePolicySettingStateSummaryExamplePayload = {
  data: {
    "@odata.type": "#microsoft.graph.deviceCompliancePolicySettingStateSummary",
    id: "7474d6d5-d6d5-7474-d5d6-7474d5d67474",
    setting: "Setting value",
    settingName: "Setting Name value",
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

export const updateSoftwareUpdateStatusSummaryExamplePayload = {
  data: {
    "@odata.type": "#microsoft.graph.softwareUpdateStatusSummary",
    id: "4f71421f-421f-4f71-1f42-714f1f42714f",
    displayName: "Display Name value",
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

export const getSoftwareUpdateStatusSummaryExamplePayload = {
  data: updateDetectedAppExamplePayload,
};

export const reprocessLicenseAssignmentExamplePayload = {
  data: {
    accountEnabled: true,
    assignedLicenses: [
      {
        disabledPlans: ["11b0131d-43c8-4bbb-b2c8-e80f9a50834a"],
        skuId: "skuId-value",
      },
    ],
    assignedPlans: [
      {
        assignedDateTime: "2016-10-19T10:37:00Z",
        capabilityStatus: "capabilityStatus-value",
        service: "service-value",
        servicePlanId: "bea13e0c-3828-4daa-a392-28af7ff61a0f",
      },
    ],
    businessPhones: ["businessPhones-value"],
    city: "city-value",
    companyName: "companyName-value",
  },
};

export const listMembersExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#directoryObjects",
    value: [
      {
        id: "11111111-2222-3333-4444-555555555555",
        mail: "user1@contoso.com",
      },
    ],
  },
};
