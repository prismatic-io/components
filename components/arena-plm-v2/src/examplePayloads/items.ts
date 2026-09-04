import type {
  FileDetailVo,
  ItemFileVo,
  ItemFileVoResultRep,
  ItemFullVo,
  ItemFullVoResultRep,
  ItemLifecycleChangeResponseVo,
  NumberFormatCompactResultRep,
  NumberFormatFullVo,
} from "../types";
const sampleItemUser = {
  guid: "9ZY87XW65VU43TS21RQ09PO8",
  fullName: "Jordan Rivera",
  email: "jordan.rivera@example.com",
};
const sampleItemFull: ItemFullVo = {
  guid: "IT111ABC222DEF333GHI4445",
  url: {
    api: "https://api.arenasolutions.com/v1/items/IT111ABC222DEF333GHI4445",
    app: "https://app.bom.com/items/IT111ABC222DEF333GHI4445",
  },
  number: "PRT-001045",
  name: "Main Controller Board",
  description: "Primary controller PCB for the enclosure assembly.",
  revisionNumber: "B",
  lifecyclePhase: {
    guid: "LP100AAA200BBB300CCC4001",
    name: "Production",
    stage: "PRODUCTION",
  },
  category: {
    guid: "CAT10AAA20BBB30CCC40DDE1",
    name: "PCB Assembly",
    path: "Items/Electrical/PCB Assembly",
  },
  owner: sampleItemUser,
  creator: sampleItemUser,
  creationDateTime: "2026-03-14T10:00:00Z",
  modifiedDateTime: "2026-03-18T14:32:00Z",
  shared: false,
  offTheShelf: false,
  productionCost: 42.5,
  prototypeCost: 78.25,
  targetPrice: 120,
  targetCost: 60,
  standardCost: 55.75,
  uom: "EA",
  additionalAttributes: [
    {
      guid: "AT100AAA200BBB300CCC4001",
      name: "RoHS Compliant",
      value: "Yes",
      type: "BOOLEAN",
    },
  ],
};
const sampleFileDetail: FileDetailVo = {
  guid: "7GG88HH99II00JJ11KK22LL3",
  name: "controller-board-spec.pdf",
  number: "FILE-000842",
  title: "Controller Board Specification Rev B",
  description: "Electrical specification for the main controller board.",
  edition: "B",
  format: "PDF",
  mimeType: "application/pdf",
  size: 284516,
  storageMethodName: "FILE",
  category: { guid: "0FF11GG22HH33II44JJ55KK6", name: "Specifications" },
  author: { fullName: "Jordan Rivera" },
  creationDateTime: "2026-03-10T09:15:00Z",
  lastModifiedDateTime: "2026-03-12T16:42:00Z",
  latest: true,
  private: false,
};
const sampleItemFile: ItemFileVo = {
  guid: "IF100AAA200BBB300CCC4001",
  file: sampleFileDetail,
  latestEditionAssociation: true,
  primary: true,
};
export const changeItemLifecyclePhaseExamplePayload: {
  data: ItemLifecycleChangeResponseVo;
} = {
  data: {
    effectiveRevItem: {
      guid: "IT111ABC222DEF333GHI4445",
      url: {
        api: "https://api.arenasolutions.com/v1/items/IT111ABC222DEF333GHI4445",
        app: "https://app.bom.com/items/IT111ABC222DEF333GHI4445",
      },
    },
    supersededRevItem: {
      guid: "IT000ZYX999WVU888TSR7776",
      url: {
        api: "https://api.arenasolutions.com/v1/items/IT000ZYX999WVU888TSR7776",
        app: "https://app.bom.com/items/IT000ZYX999WVU888TSR7776",
      },
    },
    workingRevItem: {
      guid: "IT222DEF333GHI444JKL5556",
      url: {
        api: "https://api.arenasolutions.com/v1/items/IT222DEF333GHI444JKL5556",
        app: "https://app.bom.com/items/IT222DEF333GHI444JKL5556",
      },
    },
  },
};
export const createItemExamplePayload: {
  data: ItemFullVo;
} = {
  data: sampleItemFull,
};
export const createItemFileAssociationExamplePayload: {
  data: ItemFileVo;
} = {
  data: sampleItemFile,
};
export const createItemFromJsonExamplePayload: {
  data: ItemFullVo;
} = {
  data: sampleItemFull,
};
export const createItemImageExamplePayload = {
  data: {
    guid: "IM100AAA200BBB300CCC4001",
    name: "controller-board-thumbnail.jpg",
    mimeType: "image/jpeg",
    size: 48210,
    creationDateTime: "2026-03-18T14:35:00Z",
  },
};
export const createItemNumberFormatFieldExamplePayload = {
  data: {
    guid: "NF100AAA200BBB300CCC4001",
    apiName: "sequence",
    name: "Sequence",
    order: 3,
    type: "AUTO_SEQUENCE",
    maxSeqLength: 5,
    zeroPadding: true,
  },
};
export const createItemNumberReservationExamplePayload = {
  data: {
    guid: "NR100AAA200BBB300CCC4001",
    name: "Q2 Prototype Run",
    category: { guid: "CAT10AAA20BBB30CCC40DDE1", name: "PCB Assembly" },
    itemNumbers: ["PRT-001046", "PRT-001047", "PRT-001048"],
    creationDateTime: "2026-03-18T09:00:00Z",
    creator: sampleItemUser,
  },
};
export const deleteItemImageExamplePayload = {
  data: {
    success: true,
    message: "Image deleted successfully",
  },
};
export const deleteItemExamplePayload = {
  data: {
    success: true,
    itemGuid: "IT111ABC222DEF333GHI4445",
    message: "Item deleted successfully",
    statusCode: 204,
  },
};
export const deleteItemFileAssociationExamplePayload = {
  data: {
    success: true,
    message: "Item file association deleted successfully",
    itemGuid: "IT111ABC222DEF333GHI4445",
    itemFileAssociationGuid: "IF100AAA200BBB300CCC4001",
  },
};
export const getItemByGuidExamplePayload: {
  data: ItemFullVo;
} = {
  data: sampleItemFull,
};
export const getItemFileAssociationExamplePayload: {
  data: ItemFileVo;
} = {
  data: sampleItemFile,
};
export const listItemFileAssociationsExamplePayload: {
  data: ItemFileVoResultRep;
} = {
  data: {
    results: [sampleItemFile],
    count: 1,
  },
};
export const listItemFutureChangesExamplePayload = {
  data: {
    results: [
      {
        guid: "5AB12CD34EF56GH78IJ90KL1",
        number: "ECO-000512",
        title: "Update capacitor tolerance on main board",
        lifecycleStatus: { type: "APPROVED", name: "Approved" },
        effectiveDateTime: "2026-04-01T00:00:00Z",
        newRevisionNumber: "C",
      },
    ],
    count: 1,
  },
};
export const listItemHistoryExamplePayload = {
  data: {
    results: [
      {
        guid: "HS100AAA200BBB300CCC4001",
        action: "CREATED",
        user: "Jordan Rivera",
        dateTime: "2026-03-14T10:00:00Z",
      },
      {
        guid: "HS200AAA300BBB400CCC5002",
        action: "LIFECYCLE_CHANGE",
        fromPhase: "Design",
        toPhase: "Production",
        user: "Jordan Rivera",
        dateTime: "2026-03-18T14:32:00Z",
      },
    ],
    count: 2,
  },
};
export const getItemImageContentExamplePayload = {
  data: {
    content: "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAA==",
    contentType: "image/jpeg",
    size: 48210,
  },
};
export const listItemLifecyclePhasesExamplePayload = {
  data: [
    { guid: "LP100AAA200BBB300CCC4001", name: "Design", stage: "DESIGN" },
    {
      guid: "LP200AAA300BBB400CCC5002",
      name: "Production",
      stage: "PRODUCTION",
    },
  ],
};
export const getItemNumberFormatByGuidExamplePayload: {
  data: NumberFormatFullVo;
} = {
  data: {
    active: true,
    creationDateTime: "2026-01-05T08:00:00Z",
    exampleNumber: "PRT-00001",
    guid: "FM100AAA200BBB300CCC4001",
    name: "Standard Part Number",
    fields: [
      {
        apiName: "prefix",
        guid: "NF010AAA020BBB030CCC0401",
        name: "Prefix",
        order: 1,
        type: "FREE_TEXT",
        value: "PRT",
      },
      {
        apiName: "sequence",
        guid: "NF020AAA030BBB040CCC0502",
        name: "Sequence",
        order: 2,
        type: "AUTO_SEQUENCE",
        maxSeqLength: 5,
        zeroPadding: true,
      },
    ],
  },
};
export const getItemNumberFormatFieldExamplePayload = {
  data: {
    apiName: "sequence",
    guid: "NF020AAA030BBB040CCC0502",
    name: "Sequence",
    order: 2,
    type: "AUTO_SEQUENCE",
    maxSeqLength: 5,
    zeroPadding: true,
  },
};
export const listItemNumberFormatFieldsExamplePayload = {
  data: {
    results: [
      {
        apiName: "prefix",
        guid: "NF010AAA020BBB030CCC0401",
        name: "Prefix",
        order: 1,
        type: "FREE_TEXT",
        value: "PRT",
      },
      {
        apiName: "sequence",
        guid: "NF020AAA030BBB040CCC0502",
        name: "Sequence",
        order: 2,
        type: "AUTO_SEQUENCE",
        maxSeqLength: 5,
        zeroPadding: true,
      },
    ],
    count: 2,
  },
};
export const listItemNumberFormatsExamplePayload: {
  data: NumberFormatCompactResultRep;
} = {
  data: {
    results: [
      {
        active: true,
        creationDateTime: "2026-01-05T08:00:00Z",
        exampleNumber: "PRT-00001",
        guid: "FM100AAA200BBB300CCC4001",
        name: "Standard Part Number",
      },
      {
        active: true,
        creationDateTime: "2026-01-06T08:00:00Z",
        exampleNumber: "ASM-00001",
        guid: "FM200AAA300BBB400CCC5002",
        name: "Assembly Number",
      },
    ],
    count: 2,
  },
};
export const listItemNumberReservationsExamplePayload = {
  data: {
    results: [
      {
        guid: "NR100AAA200BBB300CCC4001",
        name: "Q2 Prototype Run",
        category: { guid: "CAT10AAA20BBB30CCC40DDE1", name: "PCB Assembly" },
        itemNumbers: ["PRT-001046", "PRT-001047"],
        creationDateTime: "2026-03-18T09:00:00Z",
        creator: sampleItemUser,
      },
    ],
    count: 1,
  },
};
export const listItemRequirementsExamplePayload = {
  data: {
    results: [
      {
        guid: "RQ100AAA200BBB300CCC4001",
        name: "RoHS",
        description: "Restriction of Hazardous Substances compliance.",
        active: true,
      },
      {
        guid: "RQ200AAA300BBB400CCC5002",
        name: "REACH",
        description: "Registration, Evaluation, Authorisation of Chemicals.",
        active: true,
      },
    ],
    count: 2,
  },
};
export const getItemRevisionsExamplePayload = {
  data: {
    workingRev: {
      guid: "IT222DEF333GHI444JKL5556",
      revisionNumber: "C",
      revisionStatus: "WORKING",
    },
    effectiveRev: {
      guid: "IT111ABC222DEF333GHI4445",
      revisionNumber: "B",
      revisionStatus: "EFFECTIVE",
    },
    revisions: [
      {
        guid: "IT111ABC222DEF333GHI4445",
        revisionNumber: "B",
        revisionStatus: "EFFECTIVE",
        effectiveDateTime: "2026-03-18T14:32:00Z",
      },
      {
        guid: "IT000ZYX999WVU888TSR7776",
        revisionNumber: "A",
        revisionStatus: "SUPERSEDED",
        effectiveDateTime: "2026-02-01T10:00:00Z",
      },
    ],
  },
};
export const listItemTrainingPlansExamplePayload = {
  data: {
    results: [
      {
        guid: "TP100AAA200BBB300CCC4001",
        number: "TRN-000123",
        name: "Controller Board Assembly Training",
        description:
          "Training on the assembly process for the controller board.",
        daysToComplete: 14,
        creationDateTime: "2026-03-01T08:00:00Z",
        creator: sampleItemUser,
        manager: sampleItemUser,
        status: "EFFECTIVE",
        statusName: "Effective",
      },
    ],
    count: 1,
  },
};
export const listItemTrainingRecordsExamplePayload = {
  data: {
    results: [
      {
        guid: "TR100AAA200BBB300CCC4001",
        user: sampleItemUser,
        completionDateTime: "2026-03-20T15:00:00Z",
        status: "COMPLETED",
        statusName: "Completed",
        notes: "Completed with passing score.",
      },
    ],
    count: 1,
  },
};
export const listItemWhereUsedExamplePayload = {
  data: {
    results: [
      {
        guid: "IT333GHI444JKL555MNO6667",
        number: "ASM-000210",
        name: "Enclosure Assembly",
        revisionNumber: "A",
        revisionStatus: "EFFECTIVE",
        quantity: 1,
        url: {
          api: "https://api.arenasolutions.com/v1/items/IT333GHI444JKL555MNO6667",
          app: "https://app.bom.com/items/IT333GHI444JKL555MNO6667",
        },
      },
    ],
    count: 1,
  },
};
export const listItemsExamplePayload: {
  data: ItemFullVoResultRep;
} = {
  data: {
    results: [
      sampleItemFull,
      {
        guid: "IT333GHI444JKL555MNO6667",
        url: {
          api: "https://api.arenasolutions.com/v1/items/IT333GHI444JKL555MNO6667",
          app: "https://app.bom.com/items/IT333GHI444JKL555MNO6667",
        },
        number: "ASM-000210",
        name: "Enclosure Assembly",
        description: "Top-level enclosure assembly.",
        revisionNumber: "A",
        lifecyclePhase: {
          guid: "LP200AAA300BBB400CCC5002",
          name: "Design",
          stage: "DESIGN",
        },
        category: {
          guid: "CAT20AAA30BBB40CCC50DDE2",
          name: "Assemblies",
          path: "Items/Mechanical/Assemblies",
        },
        owner: sampleItemUser,
        creator: sampleItemUser,
        creationDateTime: "2026-03-16T13:45:00Z",
        modifiedDateTime: "2026-03-16T13:45:00Z",
        shared: false,
        offTheShelf: false,
        uom: "EA",
      },
    ],
    count: 2,
  },
};
export const updateItemExamplePayload: {
  data: ItemFullVo;
} = {
  data: {
    ...sampleItemFull,
    name: "Main Controller Board (Rev C)",
    revisionNumber: "C",
    modifiedDateTime: "2026-03-20T11:15:00Z",
  },
};
export const updateItemFileAssociationExamplePayload: {
  data: ItemFileVo;
} = {
  data: {
    ...sampleItemFile,
    primary: false,
    latestEditionAssociation: false,
  },
};
