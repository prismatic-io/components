import type { TriggerPayload } from "@prismatic-io/spectral";
import { Messages } from "./constants";
import type { ExamplePayload } from "./types";
export const listAssetsExamplePayload: ExamplePayload = {
  data: {
    responseMessage: "Valid API Access",
    responseCode: Messages.SUCCESS,
    count: 2,
    hasMore: 0,
    lastSeenAssetId: 10002,
    assetListData: {
      asset: [
        {
          assetId: 10001,
          assetUUID: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          hostId: 676140001,
          assetName: "web-server-01.example.com",
          address: "10.0.1.100",
          dnsName: "web-server-01.example.com",
          fqdn: "web-server-01.example.com",
          assetType: "HOST",
          operatingSystem: {
            osName: "Ubuntu 22.04 LTS",
            fullName: "Ubuntu 22.04.4 LTS (Jammy Jellyfish) 64-Bit",
            category: "Linux / Server",
          },
          lastModifiedDate: "2024-06-15T10:30:00.000Z",
          createdDate: "2024-01-10T08:00:00.000Z",
        },
        {
          assetId: 10002,
          assetUUID: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
          hostId: 676140002,
          assetName: "db-server-01.example.com",
          address: "10.0.1.101",
          dnsName: "db-server-01.example.com",
          fqdn: "db-server-01.example.com",
          assetType: "HOST",
          operatingSystem: {
            osName: "Red Hat Enterprise Linux 9",
            fullName: "Red Hat Enterprise Linux 9.3 64-Bit",
            category: "Linux / Server",
          },
          lastModifiedDate: "2024-06-14T14:20:00.000Z",
          createdDate: "2024-02-05T12:00:00.000Z",
        },
      ],
    },
  },
};
export const getAssetExamplePayload: ExamplePayload = {
  data: {
    responseMessage: "Valid API Access",
    responseCode: Messages.SUCCESS,
    count: 1,
    hasMore: 0,
    lastSeenAssetId: null,
    assetListData: {
      asset: [
        {
          assetId: 10001,
          assetUUID: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          hostId: 676140001,
          assetName: "web-server-01.example.com",
          address: "10.0.1.100",
          dnsName: "web-server-01.example.com",
          fqdn: "web-server-01.example.com",
          assetType: "HOST",
          operatingSystem: {
            osName: "Ubuntu 22.04 LTS",
            fullName: "Ubuntu 22.04.4 LTS (Jammy Jellyfish) 64-Bit",
            category: "Linux / Server",
          },
          lastModifiedDate: "2024-06-15T10:30:00.000Z",
          createdDate: "2024-01-10T08:00:00.000Z",
        },
      ],
    },
  },
};
export const syncAssetExamplePayload: ExamplePayload = {
  data: {
    message:
      "All assets are submitted for processing. They are displayed in the inventory after processing is completed successfully.",
    responseCode: "SUCCESSFULLY_PUBLISHED",
    assetsError: {},
  },
};
export const listAssetRiskDataExamplePayload: ExamplePayload = {
  data: [
    {
      id: "10001",
      ip: "192.168.1.100",
      dns: "web-server-01.example.com",
      os: "Ubuntu 22.04 LTS",
      truRiskScore: 750,
      vulnCounts: {
        severity1: 0,
        severity2: 3,
        severity3: 5,
        severity4: 2,
        severity5: 0,
      },
      lastScanDate: "2024-06-15T10:30:00Z",
      derived: {
        truRiskBand: "High",
        totalVulnerabilityCount: 10,
        daysSinceLastScan: 1,
      },
    },
  ],
};
export const listTagsExamplePayload: ExamplePayload = {
  data: {
    ServiceResponse: {
      responseCode: Messages.SUCCESS,
      count: 2,
      data: [
        {
          Tag: {
            id: 100,
            name: "LS:Environment=Production",
            color: "#FF5733",
            criticalityScore: 4,
          },
        },
        {
          Tag: {
            id: 101,
            name: "LS:DomainRole=Member Workstation",
            color: "#33FF57",
          },
        },
      ],
    },
  },
};
export const createTagExamplePayload: ExamplePayload = {
  data: {
    ServiceResponse: {
      responseCode: Messages.SUCCESS,
      count: "1",
      data: {
        Tag: {
          id: "107845310",
          name: "Some Tag",
          tagUuid: "229c0e4f-76df-4979-b478-906fb8d6cf13",
          parentTagUuid: "ab4af299-a3bc-4577-9b22-153a65c61221",
          parentTagId: "104106461",
          created: "2026-08-18T01:56:06Z",
          modified: "2026-08-18T01:56:06Z",
          color: "#FF5733",
          ruleText: "Windows.*Server",
          criticalityScore: "2",
          isSubUserScopedTag: "false",
        },
      },
    },
  },
};
export const updateTagExamplePayload: ExamplePayload = {
  data: {
    ServiceResponse: {
      responseCode: Messages.SUCCESS,
      count: "1",
      data: {
        Tag: {
          id: "107581560",
        },
      },
    },
  },
};
export const updateAssetTagsExamplePayload: ExamplePayload = {
  data: {
    ServiceResponse: {
      responseCode: Messages.SUCCESS,
      count: "1",
      data: {
        Asset: {
          id: "1214231850",
        },
      },
    },
  },
};
export const launchScanExamplePayload: ExamplePayload = {
  data: {
    scanRef: "scan/1718450400.12345",
    status: Messages.SCAN_SUBMITTED,
    message: Messages.SCAN_LAUNCHED,
  },
};
export const listScansExamplePayload: ExamplePayload = {
  data: [
    {
      ref: "scan/1786977069.45950",
      title: "New Scan",
      type: "On-Demand",
      state: "Error",
      launchDatetime: "2026-08-17T14:31:09Z",
      duration: "N/A",
      target: "192.168.178.67",
      processed: "1",
      optionProfile: null,
    },
    {
      ref: "scan/1786405417.62144",
      title: "debug 3",
      type: "On-Demand",
      state: "Finished",
      launchDatetime: "2026-08-10T23:43:37Z",
      duration: "00:18:23",
      target: "192.168.178.67",
      processed: "1",
      optionProfile: null,
    },
  ],
};
export const listRemediationTicketsExamplePayload: ExamplePayload = {
  data: {
    tickets: [
      {
        number: "1",
        creationDatetime: "2005-06-28T13:32:02Z",
        dueDatetime: "2005-08-24T08:55:53Z",
        state: "OPEN",
        status: "REOPENED",
        invalid: "0",
        assignee: "admin@example.com",
        qid: "38173",
        severity: "4",
        type: "Vulnerability",
        title: "SSL Certificate Expired",
        category: "General remote services",
        hosts: [{ IP: "192.168.1.100" }],
      },
    ],
    truncated: false,
  },
};
export const getRemediationTicketInfoExamplePayload: ExamplePayload = {
  data: {
    REMEDIATION_TICKETS: {
      TICKET_LIST: {
        TICKET: {
          NUMBER: "1",
          CREATION_DATETIME: "2005-06-28T13:32:02Z",
          DUE_DATETIME: "2005-08-24T08:55:53Z",
          CURRENT_STATE: "OPEN",
          CURRENT_STATUS: "REOPENED",
          INVALID: "0",
          ASSIGNEE: "admin@example.com",
          DETECTION: { QID: "38173", SEVERITY: "4", TYPE: "Vulnerability" },
          VULNINFO: {
            TITLE: "SSL Certificate Expired",
            CATEGORY: "General remote services",
          },
        },
      },
    },
  },
};
export const editRemediationTicketsExamplePayload: ExamplePayload = {
  data: {
    message: Messages.TICKETS_UPDATED,
    ticketsAffected: 1,
    response: {
      BATCH_RETURN: {
        RESPONSE: {
          BATCH_LIST: {
            BATCH: { TEXT: "Ticket number 1 was updated." },
          },
        },
      },
    },
  },
};
export const deleteRemediationTicketsExamplePayload: ExamplePayload = {
  data: {
    message: Messages.TICKETS_DRY_RUN,
    dryRun: true,
    ticketsAffected: Messages.DETERMINED_BY_FILTERS,
    preview: {
      REMEDIATION_TICKETS: {
        TICKET_LIST: {
          TICKET: {
            NUMBER: "1",
            CURRENT_STATE: "OPEN",
            ASSIGNEE: "admin@example.com",
          },
        },
      },
    },
  },
};
export const rawRequestExamplePayload: ExamplePayload = {
  data: {
    statusCode: 200,
    contentType: "application/json",
    headers: {},
    body: {},
  },
};
export const selectTagExamplePayload = {
  result: [
    { key: "12345", label: "LS:Environment=Production" },
    { key: "67890", label: "Cloud Agent" },
  ],
};
export const selectAssetGroupExamplePayload = {
  result: [
    { key: "100", label: "All Assets" },
    { key: "200", label: "Web Servers" },
  ],
};
export const selectScannerApplianceExamplePayload = {
  result: [
    { key: "5001", label: "Scanner-01 (Online)" },
    { key: "5002", label: "Scanner-02 (Offline)" },
  ],
};
const changedAssetsVerifiedAsset = {
  assetId: 1225180001,
  assetUUID: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  hostId: 681730001,
  lastModifiedDate: "2026-08-18T02:42:33.000Z",
  agentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  networkUuid: "6b48277c-0742-61c1-82bb-000000000000",
  createdDate: "2026-08-11T07:28:23.000Z",
  sensorLastUpdatedDate: "2026-08-15T05:49:17.000Z",
  assetType: "HOST",
  address: "10.0.1.60",
  dnsName: "server01.example.com",
  fqdn: "server01.example.com",
  qwebHostId: 681730001,
  assetName: "Server01.example.com",
  netbiosName: "SERVER01",
  timeZone: "+00:00",
  biosDescription: "Phoenix Technologies LTD 6.00",
  lastBoot: "2026-08-15T02:11:39.000Z",
  totalMemory: 6143,
  cpuCount: 4,
  lastLoggedOnUser: "admin",
  domainRole: "Member Server",
  hwUUID: "57880742-8F27-6CBA-326E-000000000000",
  biosSerialNumber: "VMware-00-00-00-00-00-00-00-00",
  biosAssetTag: "NoAssetTag",
  isContainerHost: false,
  operatingSystem: {
    osName:
      "Microsoft Windows Server 2016 Standard 10.0.14393 64-bit N/A Build 14393",
    fullName:
      "Microsoft Windows Server 2016 Standard (1607 Build 14393) 64-Bit",
    category: "Windows / Server",
    category1: "Windows",
    category2: "Server",
    productName: "Windows Server 2016",
    publisher: "Microsoft",
    edition: "Standard",
    marketVersion: "2016",
    version: "1607",
    update: "1607 Build 14393",
    architecture: "64-Bit",
    lifecycle: {
      gaDate: "2016-10-15T00:00:00.000Z",
      eolDate: "2022-01-11T00:00:00.000Z",
      eosDate: "2027-01-12T00:00:00.000Z",
      stage: "EOL",
      lifeCycleConfidence: "Exact",
    },
  },
  hardware: {
    fullName: "VMware VMware Virtual Platform VMware Virtual Platform",
    category: "Virtualized / Virtual Machine",
    category1: "Virtualized",
    category2: "Virtual Machine",
    manufacturer: "VMware",
    productName: "VMware Virtual Platform",
    model: "VMware Virtual Platform",
  },
  openPortListData: {
    openPort: [
      {
        port: 80,
        description: "World Wide Web Hypertext Transfer Protocol (HTTP)",
        protocol: "TCP",
        detectedService: "HTTP",
        firstFound: "2026-08-11T07:30:40.000Z",
        lastUpdated: "2026-08-15T01:36:01.000Z",
        discoverySources: "Cloud Agent",
      },
    ],
  },
  networkInterfaceListData: {
    networkInterface: [
      {
        hostname: "SERVER01",
        addressIpV4: "10.0.1.60",
        addressIpV6: "fe80:0:0:0:c9d0:a57b:23cb:a7ca",
        macAddress: "00:50:56:87:00:00",
        interfaceName: "Intel(R) 82574L Gigabit Network Connection",
        dnsAddress: "10.0.0.4, 10.0.0.2",
        gatewayAddress: "10.0.0.1",
        manufacturer: "VMware",
      },
    ],
  },
  softwareListData: {
    software: [
      {
        id: 3839011665983679,
        fullName: "Microsoft Edge 151.0.4129.86",
        softwareType: "Application",
        category: "Network Application / Internet Browser",
        productName: "Edge",
        publisher: "Microsoft",
        version: "151.0.4129.86",
        installDate: "2023-03-26T00:00:00.000Z",
      },
    ],
  },
  agent: {
    agentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    version: "6.4.1.22",
    configurationProfile: "Initial Profile",
    connectedFrom: "203.0.113.1",
    platform: "Windows",
  },
  sensor: {
    activatedForModules: ["SCA", "VM", "PM"],
    pendingActivationForModules: [],
    lastVMScan: 1786772955000,
    lastFullScan: 1786772955000,
  },
  inventory: {
    source: "QAGENT",
    created: 1786433303000,
    lastUpdated: 1786772957000,
  },
  tagList: {
    tag: [
      {
        tagId: 102599950,
        tagName: "Cloud Agent",
        foregroundColor: 0,
        backgroundColor: 0,
      },
    ],
  },
  lastLocation: {
    city: "Example City",
    state: "Example State",
    country: "Example Country",
    name: "Example City, Example State - Example Country",
    continent: "Europe",
  },
  criticality: {
    default: true,
    score: 2,
    isDefault: true,
  },
  riskScore: 342,
  processor: {
    description: "Intel(R) Xeon(R) Gold 6336Y CPU @ 2.40GHz",
    speed: 2400,
    numCPUs: 4,
    noOfSocket: 2,
    threadsPerCore: 1,
    coresPerSocket: 2,
  },
};
export const changedAssetsExamplePayload: {
  payload: TriggerPayload;
} = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: {} },
    body: {
      data: {
        createdRecords: [
          {
            ...changedAssetsVerifiedAsset,
            assetId: 1225180002,
            assetUUID: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
            hostId: 681730002,
            qwebHostId: 681730002,
            assetName: "Server02.example.com",
            dnsName: "server02.example.com",
            fqdn: "server02.example.com",
            netbiosName: "SERVER02",
            createdDate: "2026-08-18T02:41:05.000Z",
            lastModifiedDate: "2026-08-18T02:41:05.000Z",
          },
        ],
        updatedRecords: [changedAssetsVerifiedAsset],
      },
    },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId: "",
    customer: {
      id: "testCustomerId",
      name: "Test Customer",
      externalId: "testExternalId",
    },
    instance: { id: "testInstanceId", name: "Test Instance" },
    user: {
      id: "testUserId",
      email: "user@example.com",
      name: "Test User",
      externalId: "testUserExternalId",
    },
    integration: {
      id: "testIntegrationId",
      name: "Test Integration",
      versionSequenceId: "1",
      externalVersion: "",
    },
    flow: {
      id: "testFlowId",
      name: "Test Flow",
      stableId: "",
    },
    startedAt: "2024-01-15T00:00:00.000Z",
    globalDebug: false,
  },
};
