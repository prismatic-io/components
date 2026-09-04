import type {
  TrainingRecordVoResultRep,
  TrainingShortVo,
  TrainingShortVoResultRep,
  TrainingUserVo,
  TrainingUserVoResultRep,
  UserCompactVo,
  UserCompactVoResultRep,
} from "../types";
const sampleManager: UserCompactVo = {
  guid: "MGR123ABC456DEF789GHI012",
  fullName: "Dana Whitfield",
  email: "dana.whitfield@example.com",
};
const sampleUser: UserCompactVo = {
  guid: "USR456DEF789GHI012JKL345",
  fullName: "Marco Alvarez",
  email: "marco.alvarez@example.com",
};
const sampleTrainingPlan: TrainingShortVo = {
  guid: "TRN123ABC456DEF789GHI012",
  number: "TRN-000042",
  name: "Assembly Line Safety Training",
  description: "Mandatory safety training for assembly line operators.",
  daysToComplete: 30,
  creationDateTime: "2026-05-10T09:00:00Z",
  creator: sampleManager,
  manager: sampleManager,
  status: "OPEN",
  statusName: "Open",
};
const sampleTrainingRef = {
  guid: "TRN123ABC456DEF789GHI012",
  number: "TRN-000042",
  name: "Assembly Line Safety Training",
};
export const addFileToTrainingPlanExamplePayload = {
  data: {
    guid: "TFA789GHI012JKL345MNO678",
    training: sampleTrainingRef,
    file: {
      guid: "FIL012JKL345MNO678PQR901",
      number: "FILE-000842",
      name: "safety-procedures.pdf",
      title: "Assembly Line Safety Procedures Rev C",
    },
    latestEditionAssociation: true,
  },
};
export const addItemToTrainingPlanExamplePayload = {
  data: {
    guid: "TIA345MNO678PQR901STU234",
    training: sampleTrainingRef,
    item: {
      guid: "ITM678PQR901STU234VWX567",
      number: "PRT-001045",
      name: "Main Controller Board",
    },
  },
};
export const addQualityToTrainingPlanExamplePayload = {
  data: {
    guid: "TQA901STU234VWX567YZA890",
    training: sampleTrainingRef,
    qualityProcess: {
      guid: "QLT234VWX567YZA890BCD123",
      number: "CAPA-000317",
      name: "Corrective Action Process",
    },
  },
};
export const addUserToTrainingPlanExamplePayload: {
  data: TrainingUserVo;
} = {
  data: {
    guid: "USR456DEF789GHI012JKL345",
    fullName: "Marco Alvarez",
    email: "marco.alvarez@example.com",
    status: "ASSIGNED",
    statusName: "Assigned",
    assignmentDateTime: "2026-05-12T14:30:00Z",
    dueDateTime: "2026-06-11T14:30:00Z",
  },
};
export const changeTrainingPlanStatusExamplePayload: {
  data: TrainingShortVo;
} = {
  data: {
    ...sampleTrainingPlan,
    status: "CLOSED",
    statusName: "Closed",
  },
};
export const listTrainingManagersExamplePayload: {
  data: UserCompactVoResultRep;
} = {
  data: {
    results: [
      {
        guid: "MGR123ABC456DEF789GHI012",
        fullName: "Dana Whitfield",
        email: "dana.whitfield@example.com",
      },
      {
        guid: "MGR567JKL890MNO123PQR456",
        fullName: "Priya Nadar",
        email: "priya.nadar@example.com",
      },
    ],
    count: 2,
  },
};
export const listTrainingPlanFilesExamplePayload = {
  data: {
    results: [
      {
        guid: "TFA789GHI012JKL345MNO678",
        training: sampleTrainingRef,
        file: {
          guid: "FIL012JKL345MNO678PQR901",
          number: "FILE-000842",
          name: "safety-procedures.pdf",
          title: "Assembly Line Safety Procedures Rev C",
        },
      },
    ],
    count: 1,
  },
};
export const listTrainingPlanItemsExamplePayload = {
  data: {
    results: [
      {
        guid: "TIA345MNO678PQR901STU234",
        training: sampleTrainingRef,
        item: {
          guid: "ITM678PQR901STU234VWX567",
          number: "PRT-001045",
          name: "Main Controller Board",
        },
      },
    ],
    count: 1,
  },
};
export const listTrainingPlanQualityExamplePayload = {
  data: {
    results: [
      {
        guid: "TQA901STU234VWX567YZA890",
        training: sampleTrainingRef,
        qualityProcess: {
          guid: "QLT234VWX567YZA890BCD123",
          number: "CAPA-000317",
          name: "Corrective Action Process",
        },
      },
    ],
    count: 1,
  },
};
export const listTrainingPlanRecordsExamplePayload: {
  data: TrainingRecordVoResultRep;
} = {
  data: {
    results: [
      {
        guid: "TRC567YZA890BCD123EFG456",
        user: sampleUser,
        completionDateTime: "2026-05-28T16:45:00Z",
        status: "COMPLETED",
        statusName: "Completed",
        notes: "Completed all required modules and passed the assessment.",
      },
      {
        guid: "TRC890BCD123EFG456HIJ789",
        user: sampleManager,
        status: "IN_PROGRESS",
        statusName: "In Progress",
      },
    ],
    count: 2,
  },
};
export const listTrainingPlansExamplePayload: {
  data: TrainingShortVoResultRep;
} = {
  data: {
    results: [
      sampleTrainingPlan,
      {
        guid: "TRN456DEF789GHI012JKL345",
        number: "TRN-000043",
        name: "ESD Handling Certification",
        description: "Electrostatic discharge handling procedures.",
        daysToComplete: 14,
        creationDateTime: "2026-05-15T11:20:00Z",
        creator: sampleManager,
        manager: sampleManager,
        status: "CLOSED",
        statusName: "Closed",
      },
    ],
    count: 2,
  },
};
export const listTrainingPlanUsersExamplePayload: {
  data: TrainingUserVoResultRep;
} = {
  data: {
    results: [
      {
        guid: "USR456DEF789GHI012JKL345",
        fullName: "Marco Alvarez",
        email: "marco.alvarez@example.com",
        status: "COMPLETED",
        statusName: "Completed",
        assignmentDateTime: "2026-05-12T14:30:00Z",
        completionDateTime: "2026-05-28T16:45:00Z",
        dueDateTime: "2026-06-11T14:30:00Z",
      },
      {
        guid: "USR789GHI012JKL345MNO678",
        fullName: "Elena Sokolova",
        email: "elena.sokolova@example.com",
        status: "ASSIGNED",
        statusName: "Assigned",
        assignmentDateTime: "2026-05-12T14:30:00Z",
        dueDateTime: "2026-06-11T14:30:00Z",
      },
    ],
    count: 2,
  },
};
export const removeFileFromTrainingPlanExamplePayload = {
  data: {
    success: true,
    message: "File removed from training plan successfully",
  },
};
export const removeItemFromTrainingPlanExamplePayload = {
  data: {
    success: true,
    message: "Item removed from training plan successfully",
  },
};
export const removeQualityFromTrainingPlanExamplePayload = {
  data: {
    success: true,
    message: "Quality process removed from training plan successfully",
  },
};
export const updateTrainingPlanExamplePayload: {
  data: TrainingShortVo;
} = {
  data: {
    ...sampleTrainingPlan,
    name: "Assembly Line Safety Training (Revised)",
    description: "Updated mandatory safety training for assembly operators.",
    daysToComplete: 45,
  },
};
