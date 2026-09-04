const sampleUser = {
  guid: "9ZY87XW65VU43TS21RQ09PO8",
  fullName: "Jordan Rivera",
  email: "jordan.rivera@example.com",
};
const sampleTicketFull = {
  guid: "7TK12ET34IK56OK78UK90AK1",
  url: {
    api: "https://api.arenasolutions.com/v1/tickets/7TK12ET34IK56OK78UK90AK1",
    app: "https://app.bom.com/tickets/7TK12ET34IK56OK78UK90AK1",
  },
  number: "QC-000318",
  title: "Solder joint failure on power connector",
  description:
    "Intermittent open circuit observed at J3 during thermal cycling. Root cause under investigation.",
  template: { guid: "1TT22TT33TT44TT55TT66TT7", name: "Quality Ticket" },
  category: {
    guid: "2CT33CT44CT55CT66CT77CT8",
    name: "Quality",
    path: "Tickets/Quality",
  },
  creator: sampleUser,
  assignee: sampleUser,
  status: { guid: "TS1OP2EN3ST4AT5US6GU7ID8", value: "Open" },
  priority: "High",
  fixVersion: "Rev C",
  foundOn: "2026-03-18",
  creationDateTime: "2026-03-18T08:45:00Z",
  lastModifiedDateTime: "2026-03-19T14:20:00Z",
  additionalAttributes: [
    {
      guid: "3AT44AT55AT66AT77AT88AT9",
      name: "Severity",
      value: "Major",
      apiName: "severity",
      fieldType: "FIXED_DROP_DOWN",
      multiSelect: false,
    },
  ],
};
const sampleItemCompact = {
  guid: "2MM33NN44OO55PP66QQ77RR8",
  number: "PRT-001045",
  name: "Main Controller Board",
  revisionNumber: "B",
  revisionStatus: "WORKING",
  url: {
    api: "https://api.arenasolutions.com/v1/items/2MM33NN44OO55PP66QQ77RR8",
    app: "https://app.bom.com/items/2MM33NN44OO55PP66QQ77RR8",
  },
};
const sampleFileDetail = {
  guid: "7GG88HH99II00JJ11KK22LL3",
  name: "failure-analysis.pdf",
  number: "FILE-000913",
  title: "Failure Analysis Report",
  description: "FA report documenting the solder joint failure investigation.",
  edition: "A",
  format: "PDF",
  mimeType: "application/pdf",
  size: 194328,
  storageMethodName: "FILE",
  category: { guid: "0FF11GG22HH33II44JJ55KK6", name: "Reports" },
  author: { fullName: "Jordan Rivera" },
  creationDateTime: "2026-03-18T10:15:00Z",
  lastModifiedDateTime: "2026-03-18T10:15:00Z",
  latest: true,
  private: false,
};
const sampleChangeCompact = {
  guid: "5AB12CD34EF56GH78IJ90KL1",
  number: "ECO-000512",
  title: "Update capacitor tolerance on main board",
  url: {
    api: "https://api.arenasolutions.com/v1/changes/5AB12CD34EF56GH78IJ90KL1",
    app: "https://app.bom.com/changes/5AB12CD34EF56GH78IJ90KL1",
  },
};
const sampleTicketChangeAssoc = {
  guid: "4CA55CA66CA77CA88CA99CA0",
  change: sampleChangeCompact,
};
const sampleTicketFileAssoc = {
  guid: "5FA66FA77FA88FA99FA00FA1",
  file: sampleFileDetail,
};
const sampleTicketItemAssoc = {
  guid: "6IA77IA88IA99IA00IA11IA2",
  item: sampleItemCompact,
  latestRevisionAssociation: true,
};
const sampleTicketQualityAssoc = {
  guid: "7QA88QA99QA00QA11QA22QA3",
  qualityProcess: {
    guid: "8QP99QP00QP11QP22QP33QP4",
    number: "CAPA-000047",
    name: "Corrective Action for J3 solder failure",
  },
  step: {
    guid: "9QS00QS11QS22QS33QS44QS5",
    name: "Root Cause Analysis",
  },
};
const sampleTicketReference = {
  guid: "0TR11TR22TR33TR44TR55TR6",
  ticket: {
    guid: "1RT22RT33RT44RT55RT66RT7",
    number: "QC-000290",
    title: "Related field return for the same connector lot",
  },
};
const sampleTicketTemplate = {
  guid: "1TT22TT33TT44TT55TT66TT7",
  name: "Quality Ticket",
  description: "Template used for quality incidents and CAPA tracking.",
  active: true,
  category: { guid: "2CT33CT44CT55CT66CT77CT8", name: "Quality" },
};
export const addTicketChangeExamplePayload = { data: sampleTicketChangeAssoc };
export const addTicketFileExamplePayload = { data: sampleTicketFileAssoc };
export const addTicketItemExamplePayload = { data: sampleTicketItemAssoc };
export const addTicketQualityProcessExamplePayload = {
  data: sampleTicketQualityAssoc,
};
export const addTicketReferenceExamplePayload = { data: sampleTicketReference };
export const changeTicketStatusExamplePayload = {
  data: {
    guid: "2SC33SC44SC55SC66SC77SC8",
    ticket: { guid: "7TK12ET34IK56OK78UK90AK1", number: "QC-000318" },
    status: { guid: "TS2IN3PR4OG5RE6SS7GU8ID9", value: "In Progress" },
    previousStatus: "OPEN",
    changedBy: sampleUser,
    creationDateTime: "2026-03-19T14:20:00Z",
  },
};
export const createTicketExamplePayload = { data: sampleTicketFull };
export const deleteTicketExamplePayload = {
  data: {
    success: true,
    message: "Ticket deleted successfully",
  },
};
export const getTicketByGuidExamplePayload = { data: sampleTicketFull };
export const listTicketChangesExamplePayload = {
  data: {
    results: [sampleTicketChangeAssoc],
    count: 1,
  },
};
export const listTicketFilesExamplePayload = {
  data: {
    results: [sampleTicketFileAssoc],
    count: 1,
  },
};
export const listTicketItemsExamplePayload = {
  data: {
    results: [sampleTicketItemAssoc],
    count: 1,
  },
};
export const listTicketQualityProcessesExamplePayload = {
  data: {
    results: [sampleTicketQualityAssoc],
    count: 1,
  },
};
export const listTicketReferencesExamplePayload = {
  data: {
    results: [sampleTicketReference],
    count: 1,
  },
};
export const listTicketsExamplePayload = {
  data: {
    results: [
      {
        guid: "7TK12ET34IK56OK78UK90AK1",
        number: "QC-000318",
        title: "Solder joint failure on power connector",
        template: { guid: "1TT22TT33TT44TT55TT66TT7", name: "Quality Ticket" },
        category: { guid: "2CT33CT44CT55CT66CT77CT8", name: "Quality" },
        status: { guid: "TS1OP2EN3ST4AT5US6GU7ID8", value: "Open" },
        priority: "High",
        creator: sampleUser,
        assignee: sampleUser,
        creationDateTime: "2026-03-18T08:45:00Z",
      },
      {
        guid: "8UK23FU45JU67PU89VU01BU2",
        number: "QC-000319",
        title: "Label misprint on outer packaging",
        template: { guid: "1TT22TT33TT44TT55TT66TT7", name: "Quality Ticket" },
        category: { guid: "2CT33CT44CT55CT66CT77CT8", name: "Quality" },
        status: { guid: "TS2IN3PR4OG5RE6SS7GU8ID9", value: "In Progress" },
        priority: "Medium",
        creator: sampleUser,
        assignee: sampleUser,
        creationDateTime: "2026-03-20T09:10:00Z",
      },
    ],
    count: 2,
  },
};
export const listTicketTemplateAttributesExamplePayload = {
  data: {
    results: [
      {
        guid: "3AT44AT55AT66AT77AT88AT9",
        active: true,
        apiName: "severity",
        name: "Severity",
        fieldType: "FIXED_DROP_DOWN",
        required: true,
        editable: true,
        custom: true,
        description: "Severity classification of the ticket.",
        possibleValues: ["Minor", "Major", "Critical"],
        multiSelect: false,
      },
    ],
    count: 1,
  },
};
export const listTicketTemplatesExamplePayload = {
  data: {
    results: [sampleTicketTemplate],
    count: 1,
  },
};
export const removeTicketChangeExamplePayload = {
  data: {
    success: true,
    message: "Ticket change removed successfully",
  },
};
export const removeTicketFileExamplePayload = {
  data: {
    success: true,
    message: "Ticket file removed successfully",
  },
};
export const removeTicketItemExamplePayload = {
  data: {
    success: true,
    message: "Ticket item removed successfully",
  },
};
export const removeTicketQualityProcessExamplePayload = {
  data: {
    success: true,
    message: "Ticket quality process removed successfully",
  },
};
export const removeTicketReferenceExamplePayload = {
  data: {
    success: true,
    message: "Ticket reference removed successfully",
  },
};
export const updateTicketExamplePayload = {
  data: {
    ...sampleTicketFull,
    title: "Solder joint failure on power connector (containment applied)",
    priority: "Critical",
    lastModifiedDateTime: "2026-03-21T11:30:00Z",
  },
};
