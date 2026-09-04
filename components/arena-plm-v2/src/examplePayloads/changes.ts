import type {
  CategoryAttributeDefinitionResultRep,
  ChangCompactVoResultRep,
  ChangeFullVo,
  ChangeRoutingMiniResultRep,
  FileAssociationVo,
  FileAssociationVoResultRep,
  FileDetailVo,
  NumberSequencePrefixCompactResultRep,
  UserCompactVo,
  UserCompactVoResultRep,
} from "../types";
const sampleUser: UserCompactVo = {
  guid: "9ZY87XW65VU43TS21RQ09PO8",
  fullName: "Jordan Rivera",
  email: "jordan.rivera@example.com",
};
const _sampleCategoryCompact = {
  guid: "1AA22BB33CC44DD55EE66FF7",
  name: "ECO",
  path: "Changes/ECO",
};
const sampleFileDetail: FileDetailVo = {
  guid: "7GG88HH99II00JJ11KK22LL3",
  name: "assembly-drawing.pdf",
  number: "FILE-000842",
  title: "Assembly Drawing Rev B",
  description: "Updated assembly drawing reflecting the capacitor change.",
  edition: "B",
  format: "PDF",
  mimeType: "application/pdf",
  size: 284516,
  storageMethodName: "FILE",
  category: { guid: "0FF11GG22HH33II44JJ55KK6", name: "Drawings" },
  author: { fullName: "Jordan Rivera" },
  creationDateTime: "2026-03-10T09:15:00Z",
  lastModifiedDateTime: "2026-03-12T16:42:00Z",
  latest: true,
  private: false,
};
const sampleChangeFull: ChangeFullVo = {
  guid: "5AB12CD34EF56GH78IJ90KL1",
  url: {
    api: "https://api.arenasolutions.com/v1/changes/5AB12CD34EF56GH78IJ90KL1",
    app: "https://app.bom.com/changes/5AB12CD34EF56GH78IJ90KL1",
  },
  number: "ECO-000512",
  title: "Update capacitor tolerance on main board",
  description:
    "Change C14 tolerance from 10% to 5% to improve signal stability.",
  lifecycleStatus: { type: "OPEN" },
  lifecycleDateTime: "2026-03-14T11:05:00Z",
  category: {
    guid: "1AA22BB33CC44DD55EE66FF7",
    name: "ECO",
    path: "Changes/ECO",
  },
  creator: sampleUser,
  submitter: sampleUser,
  creationDateTime: "2026-03-14T10:00:00Z",
  effectivityType: "PERMANENT_ON_APPROVAL",
  implementationStatus: "NOT_STARTED",
  implementationStatusDateTime: "2026-03-14T10:00:00Z",
  deviated: false,
  routingAdmins: [sampleUser],
  routings: [
    { guid: "8LL99MM00NN11OO22PP33QQ4", name: "Standard ECO Routing" },
  ],
  additionalAttributes: [
    {
      guid: "3RR44SS55TT66UU77VV88WW9",
      name: "Priority",
      value: "High",
      apiName: "priority",
      fieldType: "FIXED_DROP_DOWN",
      multiSelect: false,
    },
  ],
};
const sampleChangeAffectedItem = {
  guid: "6YY77ZZ88AA99BB00CC11DD2",
  item: {
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
  newRevisionNumber: "B",
  newLifecyclePhase: { guid: "4SS55TT66UU77VV88WW99XX0", name: "Production" },
  materialEffectivityDateTime: "2026-04-01T00:00:00Z",
  retrainingRequired: false,
  filesView: { includedInThisChange: true, containsModifications: false },
  sourcingView: { includedInThisChange: false, containsModifications: false },
  specsView: { includedInThisChange: true, containsModifications: true },
  bomView: { includedInThisChange: true, containsModifications: true },
};
const sampleImplementationTask = {
  guid: "4SS55TT66UU77VV88WW99XX0",
  name: "Update manufacturing work instructions",
  status: "NOT_STARTED",
  dueDate: "2026-04-01",
  assignee: { user: sampleUser },
  creator: sampleUser,
  creationDateTime: "2026-03-14T10:30:00Z",
};
const sampleImplementationTaskNote = {
  guid: "1NT22OT33PT44QT55RT66ST7",
  note: "Work instructions updated and reviewed by manufacturing engineering.",
  label: "Engineering",
  private: false,
  creator: sampleUser,
  creationDateTime: "2026-03-15T08:20:00Z",
};
export const addItemToChangeExamplePayload = { data: sampleChangeAffectedItem };
export const createChangeExamplePayload: {
  data: ChangeFullVo;
} = {
  data: sampleChangeFull,
};
export const createChangeFileAssociationExamplePayload: {
  data: FileAssociationVo;
} = {
  data: {
    guid: "2FA33FA44FA55FA66FA77FA8",
    file: sampleFileDetail,
  },
};
export const createChangeImplementationFileExamplePayload = {
  data: {
    guid: "3IF44IF55IF66IF77IF88IF9",
    file: sampleFileDetail,
  },
};
export const createChangeImplementationTaskExamplePayload = {
  data: sampleImplementationTask,
};
export const createChangeImplementationTaskFileExamplePayload = {
  data: {
    guid: "5TF66TF77TF88TF99TF00TF1",
    file: sampleFileDetail,
  },
};
export const createChangeImplementationTaskNoteExamplePayload = {
  data: sampleImplementationTaskNote,
};
export const createChangeMarkupFileExamplePayload = {
  data: {
    guid: "7MF88MF99MF00MF11MF22MF3",
    file: sampleFileDetail,
  },
};
export const deleteChangeExamplePayload = {
  data: {
    success: true,
    changeGuid: "5AB12CD34EF56GH78IJ90KL1",
    message: "Change deleted successfully",
  },
};
export const deleteChangeFileAssociationExamplePayload = {
  data: {
    success: true,
    message: "Change file association deleted successfully",
    changeGuid: "5AB12CD34EF56GH78IJ90KL1",
    changeFileAssociationGuid: "2FA33FA44FA55FA66FA77FA8",
  },
};
export const deleteChangeItemAssociationExamplePayload = {
  data: {
    success: true,
    message: "Change item association deleted successfully",
  },
};
export const deleteChangeMarkupFileExamplePayload = {
  data: {
    success: true,
    message: "Markup file deleted successfully",
  },
};
export const listChangeAlertsExamplePayload = {
  data: {
    results: [
      {
        guid: "8AL99AL00AL11AL22AL33AL4",
        type: "APPROVAL_DEADLINE",
        severity: "WARNING",
        message: "Approval deadline is within 24 hours.",
        creationDateTime: "2026-03-16T12:00:00Z",
      },
    ],
    count: 1,
  },
};
export const getChangeByGuidExamplePayload: {
  data: ChangeFullVo;
} = {
  data: sampleChangeFull,
};
export const listChangeCategoryItemAttributesExamplePayload: {
  data: CategoryAttributeDefinitionResultRep;
} = {
  data: {
    results: [
      {
        guid: "9AT00AT11AT22AT33AT44AT5",
        active: true,
        apiName: "priority",
        name: "Priority",
        fieldType: "FIXED_DROP_DOWN",
        required: false,
        editable: true,
        custom: true,
        description: "Relative priority of the change.",
        possibleValues: ["Low", "Medium", "High"],
        multiSelect: false,
      },
    ],
    count: 1,
  },
};
export const listChangeCategoryRoutingsExamplePayload: {
  data: ChangeRoutingMiniResultRep;
} = {
  data: {
    results: [
      {
        guid: "8LL99MM00NN11OO22PP33QQ4",
        name: "Standard ECO Routing",
        description: "Default routing used for engineering change orders.",
      },
    ],
    count: 1,
  },
};
export const getChangeFileAssociationExamplePayload: {
  data: FileAssociationVo;
} = {
  data: {
    guid: "2FA33FA44FA55FA66FA77FA8",
    file: sampleFileDetail,
  },
};
export const listChangeFileAssociationsExamplePayload: {
  data: FileAssociationVoResultRep;
} = {
  data: {
    results: [
      {
        guid: "2FA33FA44FA55FA66FA77FA8",
        file: sampleFileDetail,
      },
    ],
    count: 1,
  },
};
export const listChangeFilesExamplePayload = {
  data: {
    results: [sampleFileDetail],
    count: 1,
  },
};
export const listChangeHistoryExamplePayload = {
  data: {
    results: [
      {
        guid: "1HS22HS33HS44HS55HS66HS7",
        action: "CREATED",
        user: "Jordan Rivera",
        dateTime: "2026-03-14T10:00:00Z",
      },
      {
        guid: "2HS33HS44HS55HS66HS77HS8",
        action: "STATUS_CHANGE",
        fromStatus: "OPEN",
        toStatus: "SUBMITTED_FOR_APPROVAL",
        user: "Jordan Rivera",
        dateTime: "2026-03-15T09:30:00Z",
      },
    ],
    count: 2,
  },
};
export const listChangeImplementationFilesExamplePayload = {
  data: {
    results: [
      {
        guid: "3IF44IF55IF66IF77IF88IF9",
        file: sampleFileDetail,
      },
    ],
    count: 1,
  },
};
export const getChangeImplementationTaskExamplePayload = {
  data: sampleImplementationTask,
};
export const listChangeImplementationTaskFilesExamplePayload = {
  data: {
    results: [
      {
        guid: "5TF66TF77TF88TF99TF00TF1",
        file: sampleFileDetail,
      },
    ],
    count: 1,
  },
};
export const listChangeImplementationTaskNotesExamplePayload = {
  data: {
    results: [sampleImplementationTaskNote],
    count: 1,
  },
};
export const listChangeImplementationTasksExamplePayload = {
  data: {
    results: [sampleImplementationTask],
    count: 1,
  },
};
export const getChangeItemAssociationExamplePayload = {
  data: sampleChangeAffectedItem,
};
export const listChangeItemsExamplePayload = {
  data: {
    results: [sampleChangeAffectedItem],
    count: 1,
  },
};
export const listChangeMarkupFilesExamplePayload = {
  data: {
    results: [
      {
        guid: "7MF88MF99MF00MF11MF22MF3",
        file: sampleFileDetail,
      },
    ],
    count: 1,
  },
};
export const listChangesExamplePayload: {
  data: ChangCompactVoResultRep;
} = {
  data: {
    results: [
      {
        guid: "5AB12CD34EF56GH78IJ90KL1",
        number: "ECO-000512",
        title: "Update capacitor tolerance on main board",
        category: { guid: "1AA22BB33CC44DD55EE66FF7", name: "ECO" },
        creationDateTime: "2026-03-14T10:00:00Z",
        creator: sampleUser,
        effectiveDateTime: "2026-04-01T00:00:00Z",
        implementationStatus: "NOT_STARTED",
        lifecycleStatus: { type: "OPEN", name: "Open" },
      },
      {
        guid: "6BC23DE45FG67HI89JK01LM2",
        number: "ECO-000513",
        title: "Revise enclosure gasket material",
        category: { guid: "1AA22BB33CC44DD55EE66FF7", name: "ECO" },
        creationDateTime: "2026-03-16T13:45:00Z",
        creator: sampleUser,
        implementationStatus: "IN_PROGRESS",
        lifecycleStatus: { type: "SUBMITTED_FOR_APPROVAL", name: "Submitted" },
      },
    ],
    count: 2,
  },
};
export const listChangesAdministratorsExamplePayload: {
  data: UserCompactVoResultRep;
} = {
  data: {
    results: [
      {
        guid: "9ZY87XW65VU43TS21RQ09PO8",
        fullName: "Jordan Rivera",
        email: "jordan.rivera@example.com",
      },
      {
        guid: "8XW76VU54TS32RQ10PO98NM7",
        fullName: "Priya Nadar",
        email: "priya.nadar@example.com",
      },
    ],
    count: 2,
  },
};
export const listNumberSequencePrefixesExamplePayload: {
  data: NumberSequencePrefixCompactResultRep;
} = {
  data: {
    results: [
      { guid: "3PX44PX55PX66PX77PX88PX9", value: "ECO" },
      { guid: "4PX55PX66PX77PX88PX99PX0", value: "MCO" },
    ],
    count: 2,
  },
};
export const updateChangeExamplePayload: {
  data: ChangeFullVo;
} = {
  data: {
    ...sampleChangeFull,
    title: "Update capacitor tolerance on main board (revised scope)",
    lifecycleDateTime: "2026-03-17T09:00:00Z",
  },
};
export const updateChangeImplementationTaskExamplePayload = {
  data: {
    ...sampleImplementationTask,
    status: "IN_PROGRESS",
  },
};
export const updateChangeImplementationTaskNoteExamplePayload = {
  data: {
    ...sampleImplementationTaskNote,
    note: "Work instructions updated; pending final QA sign-off.",
  },
};
export const updateChangeItemAssociationExamplePayload = {
  data: {
    ...sampleChangeAffectedItem,
    bomView: { includedInThisChange: true, containsModifications: true },
  },
};
