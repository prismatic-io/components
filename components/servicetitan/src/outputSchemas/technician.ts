import { listEnvelope } from "./shared";
const technicianSchema = {
  type: "object" as const,
  properties: {
    id: {
      type: "integer",
      format: "int64",
    },
    userId: {
      type: "integer",
      format: "int64",
    },
    name: {
      type: "string",
    },
    roleIds: {
      type: ["array", "null"],
      items: {
        type: "integer",
        format: "int64",
      },
    },
    businessUnitId: {
      type: ["integer", "null"],
      format: "int64",
    },
    mainZoneId: {
      type: ["integer", "null"],
      format: "int64",
    },
    zoneIds: {
      type: ["array", "null"],
      items: {
        type: "integer",
        format: "int64",
      },
    },
    projectLabelIds: {
      type: ["array", "null"],
      items: {
        type: "integer",
        format: "int64",
      },
    },
    createdOn: {
      type: "string",
      format: "date-time",
    },
    modifiedOn: {
      type: "string",
      format: "date-time",
    },
    email: {
      type: ["string", "null"],
      format: "email",
    },
    phoneNumber: {
      type: ["string", "null"],
      format: "phone",
    },
    loginName: {
      type: ["string", "null"],
    },
    home: {
      type: ["object", "null"],
      properties: {
        street: {
          type: ["string", "null"],
        },
        unit: {
          type: ["string", "null"],
        },
        country: {
          type: ["string", "null"],
        },
        city: {
          type: ["string", "null"],
        },
        state: {
          type: ["string", "null"],
        },
        zip: {
          type: ["string", "null"],
        },
        streetAddress: {
          type: ["string", "null"],
        },
        latitude: {
          type: ["number", "null"],
          format: "double",
        },
        longitude: {
          type: ["number", "null"],
          format: "double",
        },
      },
    },
    dailyGoal: {
      type: "number",
      format: "decimal",
    },
    isManagedTech: {
      type: "boolean",
    },
    licenseType: {
      type: ["string", "null"],
      enum: ["NonManagedTech", "ManagedTech", "ManagedInstaller"],
    },
    customFields: {
      type: ["array", "null"],
      items: {
        type: "object" as const,
        properties: {
          typeId: {
            type: "integer",
            format: "int64",
          },
          name: {
            type: ["string", "null"],
          },
          value: {
            type: ["string", "null"],
          },
        },
        required: ["typeId"],
      },
    },
    active: {
      type: "boolean",
    },
    aadUserId: {
      type: ["string", "null"],
    },
    burdenRate: {
      type: "number",
      format: "decimal",
    },
    team: {
      type: ["string", "null"],
    },
    jobFilter: {
      type: ["string", "null"],
      enum: [
        "AllScheduledDispatchedWorking",
        "NextScheduledDispatchedWorking",
        "DispatchedWorking",
        "NextScheduledDispatchedWorkingToday",
        "AllScheduledDispatchedWorkingToday",
        "AllScheduledDispatchedWorkingFiveDays",
        "NextScheduledDispatchedWorkingTodayTomorrow",
        "AllScheduledDispatchedWorkingTodayTomorrow",
        "Next2ScheduledDispatchedWorkingToday",
      ],
    },
    permissions: {
      type: ["array", "null"],
      items: {
        type: "object" as const,
        properties: {
          id: {
            type: "integer",
            format: "int32",
          },
          value: {
            type: ["string", "null"],
          },
        },
        required: ["id"],
      },
    },
    accountLocked: {
      type: ["boolean", "null"],
    },
    commissionRate: {
      type: "number",
      format: "decimal",
    },
    currentValue: {
      type: ["number", "null"],
      format: "decimal",
    },
    firstName: {
      type: ["string", "null"],
    },
    lastName: {
      type: ["string", "null"],
    },
    hourlyRate: {
      type: "number",
      format: "decimal",
    },
    jobId: {
      type: ["integer", "null"],
      format: "int64",
    },
    mobilePhone: {
      type: ["string", "null"],
    },
    outboundCallerId: {
      type: ["string", "null"],
    },
    payrollId: {
      type: ["string", "null"],
    },
    payrollProfileId: {
      type: ["integer", "null"],
      format: "int64",
    },
    appoitmentId: {
      type: ["integer", "null"],
      format: "int64",
    },
    shiftStart: {
      type: ["string", "null"],
      format: "duration",
    },
    shiftEnd: {
      type: ["string", "null"],
      format: "duration",
    },
    soldByRate: {
      type: "number",
      format: "decimal",
    },
    startDate: {
      type: ["string", "null"],
      format: "date-time",
    },
    status: {
      type: "string",
      enum: ["Idle", "Dispatched", "Working", "Meal"],
    },
    skills: {
      type: ["array", "null"],
      items: {
        type: "object" as const,
        properties: {
          id: {
            type: "integer",
            format: "int64",
          },
          name: {
            type: ["string", "null"],
          },
        },
        required: ["id"],
      },
    },
    positions: {
      type: ["array", "null"],
      items: {
        type: "string",
        enum: [
          "Installer",
          "Service",
          "Sales",
          "Maintenance",
          "Helper",
          "InstallProductionManager",
          "ServiceManager",
          "SalesManager",
          "PartRunner",
          "DummyTech",
        ],
      },
    },
    location: {
      type: ["object", "null"],
      properties: {
        latitude: {
          type: ["number", "null"],
          format: "double",
        },
        longitude: {
          type: ["number", "null"],
          format: "double",
        },
        coordinatesUpdatedOn: {
          type: ["string", "null"],
          format: "date-time",
        },
      },
    },
    bio: {
      type: ["string", "null"],
      format: "html",
    },
    memo: {
      type: ["string", "null"],
      format: "html",
    },
  },
  required: [
    "id",
    "userId",
    "name",
    "createdOn",
    "modifiedOn",
    "dailyGoal",
    "isManagedTech",
    "active",
    "burdenRate",
    "commissionRate",
    "hourlyRate",
    "soldByRate",
    "status",
  ],
};
const technicianIdSchema = {
  type: "object" as const,
  properties: {
    id: {
      type: "integer",
      format: "int64",
    },
  },
  required: ["id"],
};
export const listTechniciansOutputSchema = listEnvelope(technicianSchema);
export const getTechnicianOutputSchema = technicianSchema;
export const createTechnicianOutputSchema = technicianIdSchema;
export const updateTechnicianOutputSchema = technicianIdSchema;
