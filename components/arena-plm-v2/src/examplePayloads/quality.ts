const sampleUser = {
  guid: "9ZY87XW65VU43TS21RQ09PO8",
  fullName: "Jordan Rivera",
  email: "jordan.rivera@example.com",
};
const sampleSecondUser = {
  guid: "8XW76VU54TS32RQ10PO98NM7",
  fullName: "Priya Nadar",
  email: "priya.nadar@example.com",
};
const sampleNumberFormat = {
  guid: "2NF33NF44NF55NF66NF77NF8",
  prefix: { guid: "3PX44PX55PX66PX77PX88PX9", value: "QMS" },
  active: true,
  format: "QMS-######",
};
const sampleTemplate = {
  guid: "4TP55TP66TP77TP88TP99TP0",
  name: "CAPA Investigation",
  description: "Corrective and Preventive Action investigation workflow.",
  type: "CAPA",
  active: true,
  numberFormat: sampleNumberFormat,
};
const sampleAttribute = {
  guid: "5AT66AT77AT88AT99AT00AT1",
  apiName: "rootCause",
  name: "Root Cause",
  fieldType: "MULTI_LINE_TEXT",
  required: false,
  editable: true,
  searchable: true,
  custom: true,
  active: true,
  description: "Documented root cause identified during investigation.",
};
const sampleAttributeGroup = {
  guid: "6AG77AG88AG99AG00AG11AG2",
  name: "Investigation Details",
  description: "Attributes captured during the investigation step.",
  attributes: [sampleAttribute],
};
const sampleStep = {
  guid: "7ST88ST99ST00ST11ST22ST3",
  number: 1,
  name: "Investigation",
  description: "Investigate the reported nonconformance.",
  type: "STANDARD",
  status: "IN_PROCESS",
  owner: sampleUser,
  dueDateTime: "2026-04-10T17:00:00Z",
  completedDateTime: null,
  additionalAttributes: [
    {
      guid: "5AT66AT77AT88AT99AT00AT1",
      name: "Root Cause",
      apiName: "rootCause",
      value: "Supplier delivered material outside the approved tolerance band.",
      fieldType: "MULTI_LINE_TEXT",
      multiSelect: false,
    },
  ],
};
const sampleQualityProcess = {
  guid: "1QP22QP33QP44QP55QP66QP7",
  url: {
    api: "https://api.arenasolutions.com/v1/qualityprocesses/1QP22QP33QP44QP55QP66QP7",
    app: "https://app.bom.com/qualityprocesses/1QP22QP33QP44QP55QP66QP7",
  },
  number: "QMS-000174",
  name: "Nonconforming material investigation",
  description:
    "Investigate nonconforming capacitors received from supplier lot 4471.",
  type: "CAPA",
  status: "IN_PROCESS",
  owner: sampleUser,
  creator: sampleUser,
  creationDateTime: "2026-03-20T09:00:00Z",
  targetCompletionDateTime: "2026-04-20T17:00:00Z",
  template: sampleTemplate,
  steps: [sampleStep],
};
const sampleAffectedItem = {
  guid: "8AF99AF00AF11AF22AF33AF4",
  type: "ITEM",
  affected: {
    guid: "2MM33NN44OO55PP66QQ77RR8",
    number: "PRT-001045",
    name: "Main Controller Board",
    revisionNumber: "B",
    revisionStatus: "WORKING",
    url: {
      api: "https://api.arenasolutions.com/v1/items/2MM33NN44OO55PP66QQ77RR8",
      app: "https://app.bom.com/items/2MM33NN44OO55PP66QQ77RR8",
    },
  },
  notes: "Item held pending disposition of the affected lot.",
  creator: sampleUser,
  creationDateTime: "2026-03-21T10:15:00Z",
};
const sampleAffectedQuality = {
  guid: "9AQ00AQ11AQ22AQ33AQ44AQ5",
  type: "QUALITY",
  affected: {
    guid: "1QP22QP33QP44QP55QP66QP7",
    number: "QMS-000173",
    name: "Related supplier corrective action",
    step: { guid: "7ST88ST99ST00ST11ST22ST3", name: "Investigation" },
    url: {
      api: "https://api.arenasolutions.com/v1/qualityprocesses/1QP22QP33QP44QP55QP66QP7",
      app: "https://app.bom.com/qualityprocesses/1QP22QP33QP44QP55QP66QP7",
    },
  },
  creator: sampleUser,
  creationDateTime: "2026-03-21T10:20:00Z",
};
const sampleAffectedUrl = {
  guid: "0AU11AU22AU33AU44AU55AU6",
  type: "URL",
  affected: {
    link: "https://example.com/supplier-report/lot-4471",
    display: "Supplier Lot 4471 Report",
    description: "External supplier quality report for the affected lot.",
  },
  creator: sampleUser,
  creationDateTime: "2026-03-21T10:25:00Z",
};
const sampleDecision = {
  guid: "1DC22DC33DC44DC55DC66DC7",
  decisionType: "ALL_REQUIRED",
  decision: "APPROVED",
  status: "COMPLETE",
  comments: "Investigation findings reviewed and approved.",
  user: sampleUser,
  decisionDateTime: "2026-03-25T14:30:00Z",
};
export const addQualityStepApproverExamplePayload = {
  data: {
    guid: "2AP33AP44AP55AP66AP77AP8",
    decisionType: "ALL_REQUIRED",
    status: "PENDING",
    user: sampleSecondUser,
    creationDateTime: "2026-03-22T11:00:00Z",
  },
};
export const changeQualityProcessStatusExamplePayload = {
  data: {
    ...sampleQualityProcess,
    status: "COMPLETE",
    lifecycleDateTime: "2026-04-18T16:00:00Z",
  },
};
export const createQualityProcessExamplePayload = {
  data: sampleQualityProcess,
};
export const createQualityProcessStepAffectedExamplePayload = {
  data: sampleAffectedItem,
};
export const createQualityProcessStepAffectedQualityExamplePayload = {
  data: sampleAffectedQuality,
};
export const createQualityProcessStepAffectedUrlExamplePayload = {
  data: sampleAffectedUrl,
};
export const deleteQualityProcessExamplePayload = {
  data: {
    success: true,
    message: "Quality process deleted successfully",
  },
};
export const deleteQualityProcessStepAffectedExamplePayload = {
  data: {
    success: true,
    message: "Quality process step affected object deleted successfully",
  },
};
export const getQualityProcessByGuidExamplePayload = {
  data: sampleQualityProcess,
};
export const listQualityProcessesExamplePayload = {
  data: {
    results: [
      {
        guid: "1QP22QP33QP44QP55QP66QP7",
        number: "QMS-000174",
        name: "Nonconforming material investigation",
        type: "CAPA",
        status: "IN_PROCESS",
        owner: sampleUser,
        creator: sampleUser,
        creationDateTime: "2026-03-20T09:00:00Z",
      },
      {
        guid: "2QP33QP44QP55QP66QP77QP8",
        number: "QMS-000175",
        name: "Supplier audit follow-up",
        type: "AUDIT",
        status: "COMPLETE",
        owner: sampleSecondUser,
        creator: sampleUser,
        creationDateTime: "2026-03-18T13:45:00Z",
      },
    ],
    count: 2,
  },
};
export const getQualityProcessNumberFormatByGuidExamplePayload = {
  data: sampleNumberFormat,
};
export const listQualityProcessNumberFormatsExamplePayload = {
  data: {
    results: [
      sampleNumberFormat,
      {
        guid: "3NF44NF55NF66NF77NF88NF9",
        prefix: { guid: "4PX55PX66PX77PX88PX99PX0", value: "CAPA" },
        active: true,
        format: "CAPA-######",
      },
    ],
    count: 2,
  },
};
export const listQualityProcessOwnersExamplePayload = {
  data: {
    results: [sampleUser, sampleSecondUser],
    count: 2,
  },
};
export const listQualityProcessStepAffectedExamplePayload = {
  data: {
    results: [sampleAffectedItem, sampleAffectedUrl],
    count: 2,
  },
};
export const getQualityProcessStepAffectedByGuidExamplePayload = {
  data: sampleAffectedItem,
};
export const getQualityProcessStepAttributeGroupByGuidExamplePayload = {
  data: sampleAttributeGroup,
};
export const listQualityProcessStepAttributeGroupsExamplePayload = {
  data: {
    results: [sampleAttributeGroup],
    count: 1,
  },
};
export const listQualityProcessStepAttributesExamplePayload = {
  data: {
    results: [
      sampleAttribute,
      {
        guid: "6AT77AT88AT99AT00AT11AT2",
        apiName: "correctiveAction",
        name: "Corrective Action",
        fieldType: "SINGLE_LINE_TEXT",
        required: false,
        editable: true,
        searchable: true,
        custom: true,
        active: true,
        description: "Corrective action taken to resolve the issue.",
      },
    ],
    count: 2,
  },
};
export const getQualityProcessStepByGuidExamplePayload = {
  data: sampleStep,
};
export const listQualityProcessStepsExamplePayload = {
  data: {
    results: [
      sampleStep,
      {
        guid: "8ST99ST00ST11ST22ST33ST4",
        number: 2,
        name: "Sign-off",
        description: "Review and approve investigation findings.",
        type: "SIGNOFF",
        status: "NOT_STARTED",
        owner: sampleSecondUser,
        dueDateTime: "2026-04-15T17:00:00Z",
        completedDateTime: null,
        additionalAttributes: [],
      },
    ],
    count: 2,
  },
};
export const listQualityProcessTemplateAttributeGroupsExamplePayload = {
  data: {
    results: [sampleAttributeGroup],
    count: 1,
  },
};
export const listQualityProcessTemplateAttributesExamplePayload = {
  data: {
    results: [sampleAttribute],
    count: 1,
  },
};
export const getQualityProcessTemplateByGuidExamplePayload = {
  data: sampleTemplate,
};
export const listQualityProcessTemplatesExamplePayload = {
  data: {
    results: [
      sampleTemplate,
      {
        guid: "5TP66TP77TP88TP99TP00TP1",
        name: "Supplier Audit",
        description: "Supplier quality audit workflow.",
        type: "AUDIT",
        active: true,
        numberFormat: {
          guid: "3NF44NF55NF66NF77NF88NF9",
          prefix: { guid: "4PX55PX66PX77PX88PX99PX0", value: "CAPA" },
          active: true,
          format: "CAPA-######",
        },
      },
    ],
    count: 2,
  },
};
export const listQualityStepDecisionsExamplePayload = {
  data: {
    results: [
      sampleDecision,
      {
        guid: "2DC33DC44DC55DC66DC77DC8",
        decisionType: "ALL_REQUIRED",
        decision: "NA",
        status: "PENDING",
        user: sampleSecondUser,
      },
    ],
    count: 2,
  },
};
export const submitQualityStepDecisionExamplePayload = {
  data: {
    ...sampleDecision,
    decision: "APPROVED",
    comments: "Reviewed and approved after final QA sign-off.",
    decisionDateTime: "2026-03-26T09:10:00Z",
  },
};
export const updateQualityProcessExamplePayload = {
  data: {
    ...sampleQualityProcess,
    name: "Nonconforming material investigation (revised scope)",
    targetCompletionDateTime: "2026-04-30T17:00:00Z",
  },
};
export const updateQualityProcessStepExamplePayload = {
  data: {
    ...sampleStep,
    status: "COMPLETE",
    completedDateTime: "2026-04-08T15:20:00Z",
  },
};
export const updateQualityProcessStepAffectedExamplePayload = {
  data: {
    ...sampleAffectedItem,
    notes: "Disposition complete; item released back to production.",
  },
};
