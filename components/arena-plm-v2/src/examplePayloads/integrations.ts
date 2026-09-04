const sampleUser = {
  guid: "9ZY87XW65VU43TS21RQ09PO8",
  fullName: "Jordan Rivera",
  email: "jordan.rivera@example.com",
};
const sampleIntegration = {
  guid: "1BE22GR33AT44IO55NS66ID7",
  name: "ERP Sync — Manufacturing",
  enabled: true,
  status: "ACTIVE",
  type: "OUTBOUND",
  transferType: "SFTP",
  creationDateTime: "2026-01-12T08:30:00Z",
  lastModifiedDateTime: "2026-03-04T14:10:00Z",
  creator: sampleUser,
  modifyUser: sampleUser,
};
const sampleEvent = {
  guid: "2EV33NT44EV55NT66EV77NT8",
  eventType: "CHANGE_EFFECTIVE",
  status: "COMPLETED",
  creationDateTime: "2026-03-14T11:05:00Z",
  reconciled: false,
  change: {
    guid: "5AB12CD34EF56GH78IJ90KL1",
    number: "ECO-000512",
    title: "Update capacitor tolerance on main board",
  },
};
const sampleEventItem = {
  guid: "3IT44EM55IT66EM77IT88EM9",
  reconciled: false,
  reconciledDateTime: null,
  effectiveItemRevision: {
    guid: "4RV55IS66RV77IS88RV99IS0",
    number: "PRT-001045",
    name: "Main Controller Board",
    revisionNumber: "B",
    lifecyclePhase: {
      guid: "7LP88HS99LP00HS11LP22HS3",
      name: "Effective",
      stage: "EFFECTIVE",
      id: 4,
      plmEntityType: "LIFECYCLE_PHASE",
    },
    url: {
      api: "https://api.arenasolutions.com/v1/items/4RV55IS66RV77IS88RV99IS0",
      app: "https://app.bom.com/items/4RV55IS66RV77IS88RV99IS0",
    },
  },
};
const sampleOutboundEventIntegration = {
  guid: "7OB88EV99OB00EV11OB22EV3",
  name: "Webhook Bridge — Downstream Systems",
  enabled: true,
  status: "ACTIVE",
  creationDateTime: "2026-02-02T09:00:00Z",
  lastModifiedDateTime: "2026-03-18T17:22:00Z",
  creator: sampleUser,
  modifyUser: sampleUser,
};
const sampleOutboundEvent = {
  guid: "8OE99VN00OE11VN22OE33VN4",
  eventType: "ITEM_REVISION_EFFECTIVE",
  status: "COMPLETED",
  resourcesReconciled: false,
  creationDateTime: "2026-03-20T10:15:00Z",
};
const sampleOutboundEventResource = {
  guid: "5RS66RC77RS88RC99RS00RC1",
  reconciled: false,
  reconciledDatetime: null,
  reconciledUser: null,
  item: {
    guid: "4RV55IS66RV77IS88RV99IS0",
    number: "PRT-001045",
    name: "Main Controller Board",
    revisionNumber: "B",
  },
  preEvents: [],
  postEvents: [],
};
const sampleOutboundEventTrigger = {
  guid: "6TR77IG88TR99IG00TR11IG2",
  name: "Item Revision Effective",
  description: "Fires when an item revision becomes effective.",
  resource: "ITEM",
  action: "REVISION_EFFECTIVE",
  enabled: true,
};
export const getEventExamplePayload = { data: sampleEvent };
export const listEventAssociationsExamplePayload = {
  data: {
    results: [
      sampleEvent,
      {
        guid: "9EV00NT11EV22NT33EV44NT5",
        eventType: "CHANGE_EFFECTIVE",
        status: "COMPLETED",
        creationDateTime: "2026-03-16T13:45:00Z",
        reconciled: true,
        change: {
          guid: "6BC23DE45FG67HI89JK01LM2",
          number: "ECO-000513",
          title: "Revise enclosure gasket material",
        },
      },
    ],
    count: 2,
  },
};
export const getEventItemExamplePayload = { data: sampleEventItem };
export const listEventItemGuidsExamplePayload = {
  data: {
    results: ["4RV55IS66RV77IS88RV99IS0", "5SW66JT77SW88JT99SW00JT1"],
    count: 2,
  },
};
export const listEventItemsExamplePayload = {
  data: {
    results: [
      sampleEventItem,
      {
        guid: "6IT77EM88IT99EM00IT11EM2",
        reconciled: true,
        reconciledDateTime: "2026-03-15T09:30:00Z",
        effectiveItemRevision: {
          guid: "5SW66JT77SW88JT99SW00JT1",
          number: "PRT-001046",
          name: "Power Supply Module",
          revisionNumber: "C",
          lifecyclePhase: {
            guid: "7LP88HS99LP00HS11LP22HS3",
            name: "Effective",
            stage: "EFFECTIVE",
            id: 4,
            plmEntityType: "LIFECYCLE_PHASE",
          },
          url: {
            api: "https://api.arenasolutions.com/v1/items/5SW66JT77SW88JT99SW00JT1",
            app: "https://app.bom.com/items/5SW66JT77SW88JT99SW00JT1",
          },
        },
      },
    ],
    count: 2,
  },
};
export const getIntegrationExamplePayload = {
  data: {
    guid: sampleIntegration.guid,
    name: sampleIntegration.name,
    enabled: sampleIntegration.enabled,
    status: sampleIntegration.status,
    type: sampleIntegration.type,
    transferType: sampleIntegration.transferType,
    creator: sampleIntegration.creator,
    creationDateTime: sampleIntegration.creationDateTime,
    modifyUser: sampleIntegration.modifyUser,
    modifyDateTime: sampleIntegration.lastModifiedDateTime,
  },
};
export const listIntegrationAdministratorsExamplePayload = {
  data: {
    results: [
      sampleUser,
      {
        guid: "8XW76VU54TS32RQ10PO98NM7",
        fullName: "Priya Nadar",
        email: "priya.nadar@example.com",
      },
    ],
    count: 2,
  },
};
export const listIntegrationFiltersExamplePayload = {
  data: {
    lifecyclePhases: [
      {
        guid: "3FL44TR55FL66TR77FL88TR9",
        name: "Effective",
        shortName: "EFF",
        stage: "EFFECTIVE",
        type: "ITEM",
        displayOrder: 3,
        active: true,
        used: true,
      },
      {
        guid: "4FL55TR66FL77TR88FL99TR0",
        name: "Obsolete",
        shortName: "OBS",
        stage: "OBSOLETE",
        type: "ITEM",
        displayOrder: 5,
        active: true,
        used: false,
      },
    ],
    categories: [
      {
        guid: "5CT66GY77CT88GY99CT00GY1",
        name: "Electrical",
        path: "Components/Electrical",
      },
      {
        guid: "6CT77GY88CT99GY00CT11GY2",
        name: "Mechanical",
        path: "Components/Mechanical",
      },
    ],
  },
};
export const listIntegrationsExamplePayload = {
  data: {
    results: [
      sampleIntegration,
      {
        guid: "2CF33HS44BU55JP66OT77JE8",
        name: "PLM Backup Export",
        enabled: false,
        status: "DISABLED",
        type: "OUTBOUND",
        transferType: "HTTPS",
        creationDateTime: "2026-01-20T11:00:00Z",
        lastModifiedDateTime: "2026-02-28T16:05:00Z",
        creator: sampleUser,
        modifyUser: sampleUser,
      },
    ],
    count: 2,
  },
};
export const listOutboundEventIntegrationAdministratorsExamplePayload = {
  data: {
    results: [
      sampleUser,
      {
        guid: "8XW76VU54TS32RQ10PO98NM7",
        fullName: "Priya Nadar",
        email: "priya.nadar@example.com",
      },
    ],
    count: 2,
  },
};
export const listOutboundEventIntegrationEventsExamplePayload = {
  data: {
    results: [
      sampleOutboundEvent,
      {
        guid: "9OE00VN11OE22VN33OE44VN5",
        eventType: "CHANGE_EFFECTIVE",
        status: "COMPLETED",
        resourcesReconciled: true,
        creationDateTime: "2026-03-21T08:40:00Z",
      },
    ],
    count: 2,
  },
};
export const listOutboundEventIntegrationsExamplePayload = {
  data: {
    results: [
      sampleOutboundEventIntegration,
      {
        guid: "1WB22RG33WB44RG55WB66RG7",
        name: "Slack Notifier — Approvals",
        enabled: true,
        status: "ACTIVE",
        creationDateTime: "2026-02-10T10:30:00Z",
        lastModifiedDateTime: "2026-03-05T12:15:00Z",
        creator: sampleUser,
        modifyUser: sampleUser,
      },
    ],
    count: 2,
  },
};
export const listOutboundEventIntegrationTriggersExamplePayload = {
  data: {
    results: [
      sampleOutboundEventTrigger,
      {
        guid: "7TR88IG99TR00IG11TR22IG3",
        name: "Change Effective",
        description:
          "Fires when a change reaches the effective lifecycle status.",
        resource: "CHANGE",
        action: "STATUS_EFFECTIVE",
        enabled: true,
      },
    ],
    count: 2,
  },
};
export const listOutboundEventResourcesExamplePayload = {
  data: {
    results: [
      sampleOutboundEventResource,
      {
        guid: "6RS77RC88RS99RC00RS11RC2",
        reconciled: true,
        reconciledDatetime: "2026-03-21T09:05:00Z",
        reconciledUser: sampleUser,
        item: {
          guid: "5SW66JT77SW88JT99SW00JT1",
          number: "PRT-001046",
          name: "Power Supply Module",
          revisionNumber: "C",
        },
        preEvents: [],
        postEvents: [],
      },
    ],
    count: 2,
  },
};
export const updateEventItemReconciledExamplePayload = {
  data: {
    ...sampleEventItem,
    reconciled: true,
    reconciledDateTime: "2026-03-22T10:00:00Z",
  },
};
export const updateOutboundEventReconciliationExamplePayload = {
  data: {
    ...sampleOutboundEvent,
    resourcesReconciled: true,
  },
};
export const updateOutboundEventResourceReconciliationExamplePayload = {
  data: {
    ...sampleOutboundEventResource,
    reconciled: true,
    reconciledDatetime: "2026-03-22T10:05:00Z",
    reconciledUser: sampleUser,
  },
};
