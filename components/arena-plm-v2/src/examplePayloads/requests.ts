import type {
  AttributeDefinitionFullRepResultRep,
  NumberSequencePrefixCompactResultRep,
  NumberSequenceResultRep,
  RequestEvaluatorGroupShortResultRep,
  UserCompactVo,
  UserCompactVoResultRep,
} from "../types";
const sampleUser: UserCompactVo = {
  guid: "9ZY87XW65VU43TS21RQ09PO8",
  fullName: "Jordan Rivera",
  email: "jordan.rivera@example.com",
};
const sampleSecondUser: UserCompactVo = {
  guid: "8XW76VU54TS32RQ10PO98NM7",
  fullName: "Priya Nadar",
  email: "priya.nadar@example.com",
};
const sampleRequestFull = {
  guid: "RQA123BCD456EFG789HIJ012",
  url: {
    api: "https://api.arenasolutions.com/v1/requests/RQA123BCD456EFG789HIJ012",
    app: "https://app.bom.com/requests/RQA123BCD456EFG789HIJ012",
  },
  number: "REQ-000318",
  title: "Investigate intermittent power-up failure",
  problem:
    "A subset of units fail to power up on first boot after final assembly.",
  requestedAction:
    "Evaluate the power sequencing circuit and propose a corrective change.",
  requestCode: "QA",
  lifecycleStatus: "SUBMITTED",
  lifecycleDateTime: "2026-05-12T14:20:00Z",
  category: {
    guid: "CAT111BBB222CCC333DDD444",
    name: "Quality Request",
    path: "Requests/Quality Request",
  },
  numberSequencePrefix: { value: "QA" },
  evaluatorGroup: {
    guid: "EVG555EEE666FFF777GGG888",
    name: "Quality Engineering",
  },
  creator: sampleUser,
  creatorParticipation: true,
  supplierVisibility: false,
  creationDateTime: "2026-05-12T13:05:00Z",
  additionalAttributes: [
    {
      guid: "ATT999HHH000III111JJJ222",
      name: "Severity",
      value: "High",
      apiName: "severity",
      fieldType: "FIXED_DROP_DOWN",
      multiSelect: false,
    },
  ],
};
const sampleRequestCompact = {
  guid: "RQA123BCD456EFG789HIJ012",
  number: "REQ-000318",
  title: "Investigate intermittent power-up failure",
  requestCode: "QA",
  lifecycleStatus: "SUBMITTED",
  category: { guid: "CAT111BBB222CCC333DDD444", name: "Quality Request" },
  creator: sampleUser,
  creationDateTime: "2026-05-12T13:05:00Z",
};
const sampleEvaluationIssue = {
  guid: "ISS222KKK333LLL444MMM555",
  issue: "Power sequencing capacitor value appears out of tolerance.",
  status: "OPEN",
  supplierVisibility: false,
  creator: sampleUser,
  creationDateTime: "2026-05-13T09:40:00Z",
};
const sampleIssueResponse = {
  guid: "RSP333NNN444OOO555PPP666",
  response: "Confirmed: measured 4.2uF against a 4.7uF nominal on three units.",
  creator: sampleSecondUser,
  creationDateTime: "2026-05-13T15:10:00Z",
};
const sampleRequestFile = {
  guid: "RFA444QQQ555RRR666SSS777",
  file: {
    guid: "FIL555TTT666UUU777VVV888",
    name: "power-up-failure-report.pdf",
    number: "FILE-001204",
    title: "Power-Up Failure Analysis",
    edition: "A",
    format: "PDF",
    mimeType: "application/pdf",
    size: 194512,
    creationDateTime: "2026-05-12T13:30:00Z",
  },
};
export const addEvaluationIssueResponseExamplePayload = {
  data: sampleIssueResponse,
};
export const addItemToRequestExamplePayload = {
  data: {
    guid: "RIT666WWW777XXX888YYY999",
    item: {
      guid: "ITM777ZZZ888AAA999BBB000",
      number: "PRT-002140",
      name: "Power Sequencing Board",
      revisionNumber: "A",
      revisionStatus: "WORKING",
      url: {
        api: "https://api.arenasolutions.com/v1/items/ITM777ZZZ888AAA999BBB000",
        app: "https://app.bom.com/items/ITM777ZZZ888AAA999BBB000",
      },
    },
    notes: "Suspected root-cause component for the power-up failure.",
  },
};
export const attachFileToRequestExamplePayload = { data: sampleRequestFile };
export const changeEvaluationIssueStatusExamplePayload = {
  data: {
    ...sampleEvaluationIssue,
    status: "CLOSED",
    response: "Resolved via corrective change ECO-000512.",
  },
};
export const changeRequestStatusExamplePayload = {
  data: {
    guid: "TRN888CCC999DDD000EEE111",
    request: { guid: "RQA123BCD456EFG789HIJ012" },
    fromStatus: "UNSUBMITTED",
    status: "SUBMITTED",
    comment: "Ready for quality evaluation.",
    creationDateTime: "2026-05-12T14:20:00Z",
  },
};
export const createRequestExamplePayload = { data: sampleRequestFull };
export const createRequestEvaluationIssueExamplePayload = {
  data: sampleEvaluationIssue,
};
export const createRequestMarkupFileExamplePayload = {
  data: {
    guid: "MRK999FFF000GGG111HHH222",
    file: {
      guid: "FIL000III111JJJ222KKK333",
      name: "board-markup.pdf",
      number: "FILE-001210",
      title: "Board Markup Rev A",
      edition: "A",
      format: "PDF",
      mimeType: "application/pdf",
    },
  },
};
export const deleteRequestExamplePayload = {
  data: { success: true, message: "Request deleted successfully" },
};
export const deleteRequestMarkupFileExamplePayload = {
  data: { success: true, message: "Markup file deleted successfully" },
};
export const listEvaluationIssueResponsesExamplePayload = {
  data: {
    results: [sampleIssueResponse],
    count: 1,
  },
};
export const getRequestByGuidExamplePayload = { data: sampleRequestFull };
export const listRequestAdministratorsExamplePayload: {
  data: UserCompactVoResultRep;
} = {
  data: {
    results: [sampleUser, sampleSecondUser],
    count: 2,
  },
};
export const listRequestChangesExamplePayload = {
  data: {
    results: [
      {
        guid: "CHG111LLL222MMM333NNN444",
        number: "ECO-000512",
        title: "Update capacitor tolerance on main board",
        lifecycleStatus: { type: "OPEN", name: "Open" },
        category: { guid: "CAT222OOO333PPP444QQQ555", name: "ECO" },
        creationDateTime: "2026-05-14T10:00:00Z",
      },
    ],
    count: 1,
  },
};
export const listRequestEvaluationIssuesExamplePayload = {
  data: {
    results: [sampleEvaluationIssue],
    count: 1,
  },
};
export const listRequestEvaluatorGroupsExamplePayload: {
  data: RequestEvaluatorGroupShortResultRep;
} = {
  data: {
    results: [
      {
        guid: "EVG555EEE666FFF777GGG888",
        name: "Quality Engineering",
        description: "Evaluators responsible for quality requests.",
      },
      {
        guid: "EVG666HHH777III888JJJ999",
        name: "Design Review Board",
        description: "Cross-functional design review evaluators.",
      },
    ],
    count: 2,
  },
};
export const listRequestFilesExamplePayload = {
  data: {
    results: [sampleRequestFile],
    count: 1,
  },
};
export const listRequestItemAttributesExamplePayload: {
  data: AttributeDefinitionFullRepResultRep;
} = {
  data: {
    results: [
      {
        guid: "ADF111RRR222SSS333TTT444",
        active: true,
        apiName: "severity",
        name: "Severity",
        fieldType: "FIXED_DROP_DOWN",
        creatable: true,
        custom: true,
        editable: true,
        required: false,
        description: "Relative severity of the request item.",
        possibleValues: ["Low", "Medium", "High"],
        multiSelect: false,
      },
    ],
    count: 1,
  },
};
export const listRequestItemsExamplePayload = {
  data: {
    results: [
      {
        guid: "RIT666WWW777XXX888YYY999",
        item: {
          guid: "ITM777ZZZ888AAA999BBB000",
          number: "PRT-002140",
          name: "Power Sequencing Board",
          revisionNumber: "A",
          revisionStatus: "WORKING",
          url: {
            api: "https://api.arenasolutions.com/v1/items/ITM777ZZZ888AAA999BBB000",
            app: "https://app.bom.com/items/ITM777ZZZ888AAA999BBB000",
          },
        },
        notes: "Suspected root-cause component for the power-up failure.",
      },
    ],
    count: 1,
  },
};
export const listRequestMarkupFilesExamplePayload = {
  data: {
    results: [
      {
        guid: "MRK999FFF000GGG111HHH222",
        file: {
          guid: "FIL000III111JJJ222KKK333",
          name: "board-markup.pdf",
          number: "FILE-001210",
          title: "Board Markup Rev A",
          edition: "A",
          format: "PDF",
          mimeType: "application/pdf",
        },
      },
    ],
    count: 1,
  },
};
export const listRequestNumberSequencePrefixesExamplePayload: {
  data: NumberSequencePrefixCompactResultRep;
} = {
  data: {
    results: [
      { guid: "PFX111UUU222VVV333WWW444", value: "QA" },
      { guid: "PFX222XXX333YYY444ZZZ555", value: "CAPA" },
    ],
    count: 2,
  },
};
export const listRequestNumberSequencesExamplePayload: {
  data: NumberSequenceResultRep;
} = {
  data: {
    results: [
      {
        guid: "SEQ111AAA222BBB333CCC444",
        name: "Quality Request Sequence",
        active: true,
        description: "Default number sequence for quality requests.",
        prefix: "QA",
        nextNumber: 319,
      },
    ],
    count: 1,
  },
};
export const listRequestQualityProcessesExamplePayload = {
  data: {
    results: [
      {
        guid: "QPR111DDD222EEE333FFF444",
        number: "CAPA-000087",
        title: "Corrective action for power-up failure",
        type: "CAPA",
        status: "OPEN",
        creationDateTime: "2026-05-15T08:00:00Z",
      },
    ],
    count: 1,
  },
};
export const listRequestsExamplePayload = {
  data: {
    results: [
      sampleRequestCompact,
      {
        guid: "RQB234CDE567FGH890IJK123",
        number: "REQ-000319",
        title: "Update label artwork for enclosure",
        requestCode: "ENG",
        lifecycleStatus: "UNSUBMITTED",
        category: {
          guid: "CAT333GGG444HHH555III666",
          name: "Engineering Request",
        },
        creator: sampleSecondUser,
        creationDateTime: "2026-05-16T11:30:00Z",
      },
    ],
    count: 2,
  },
};
export const listRequestStatusChangeAttributesExamplePayload: {
  data: AttributeDefinitionFullRepResultRep;
} = {
  data: {
    results: [
      {
        guid: "ADF222UUU333VVV444WWW555",
        active: true,
        apiName: "resolutionCode",
        name: "Resolution Code",
        fieldType: "FIXED_DROP_DOWN",
        creatable: false,
        custom: false,
        editable: true,
        required: true,
        description: "Code applied when transitioning a request to CLOSED.",
        possibleValues: ["Fixed", "Duplicate", "Not Reproducible"],
        multiSelect: false,
      },
    ],
    count: 1,
  },
};
export const removeFileFromRequestExamplePayload = {
  data: { success: true, message: "File removed from request successfully" },
};
export const updateRequestExamplePayload = {
  data: {
    ...sampleRequestFull,
    title: "Investigate intermittent power-up failure (scope expanded)",
    lifecycleDateTime: "2026-05-17T09:00:00Z",
  },
};
