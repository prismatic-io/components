export const instanceReferenceSchema = {
  type: "object" as const,
  properties: {
    id: {
      type: "string",
    },
    descriptor: {
      type: "string",
    },
    href: {
      type: "string",
    },
  },
  required: ["id"],
};

export const currencyAmountSchema = {
  type: "object" as const,
  properties: {
    value: {
      type: "string",
    },
    currency: {
      type: "string",
    },
  },
};

export const eventAttachmentsViewSchema = {
  type: "object" as const,
  properties: {
    uploadDate: {
      type: "string",
      format: "date-time",
    },
    fileLength: {
      type: "integer",
    },
    fileName: {
      type: "string",
    },
    uploadedBy: instanceReferenceSchema,
    category: instanceReferenceSchema,
    description: {
      type: "string",
    },
    file: {
      type: "string",
      format: "binary",
    },
    contentType: instanceReferenceSchema,
    id: {
      type: "string",
    },
    File_ID: {
      type: "string",
    },
  },
};

export const idDescriptorReferenceSchema = {
  type: "object" as const,
  properties: {
    descriptor: {
      type: "string",
    },
    id: {
      type: "string",
    },
  },
};

export const locationSchema = {
  type: "object" as const,
  properties: {
    country: {
      type: "object" as const,
      properties: {
        descriptor: {
          type: "string",
        },
        "ISO_3166-1_Alpha-3_Code": {
          type: "string",
        },
      },
    },
    descriptor: {
      type: "string",
    },
    id: {
      type: "string",
    },
    Location_ID: {
      type: "string",
    },
  },
};

export const workSpaceSchema = {
  type: "object" as const,
  properties: {
    locationChain: {
      type: "string",
    },
    descriptor: {
      type: "string",
    },
    id: {
      type: "string",
    },
    Location_ID: {
      type: "string",
    },
  },
};

export const additionalJobsSchema = {
  type: "object" as const,
  properties: {
    location: locationSchema,
    jobProfile: {
      type: "object" as const,
      properties: {
        descriptor: {
          type: "string",
        },
        id: {
          type: "string",
        },
        Job_Profile_ID: {
          type: "string",
        },
      },
    },
    workSpace: workSpaceSchema,
    businessTitle: {
      type: "string",
    },
    jobType: {
      type: "object" as const,
      properties: {
        descriptor: {
          type: "string",
        },
        Job_Type_Name_ID: {
          type: "string",
        },
      },
    },
    supervisoryOrganization: {
      type: "object" as const,
      properties: {
        descriptor: {
          type: "string",
        },
        id: {
          type: "string",
        },
        Organization_Reference_ID: {
          type: "string",
        },
      },
    },
    descriptor: {
      type: "string",
    },
    id: {
      type: "string",
    },
    Position_ID: {
      type: "string",
    },
  },
};

export const personSchema = {
  type: "object" as const,
  properties: {
    phone: {
      type: "string",
    },
    email: {
      type: "string",
    },
    id: {
      type: "string",
    },
  },
};

export const workerDataSchema = {
  type: "object" as const,
  properties: {
    workerType: instanceReferenceSchema,
    additionalJobs: {
      type: "array",
      items: additionalJobsSchema,
    },
    prehireId: {
      type: "string",
    },
    primaryJob: additionalJobsSchema,
    person: personSchema,
    workerId: {
      type: "string",
    },
    descriptor: {
      type: "string",
    },
    id: {
      type: "string",
    },
  },
};

export const instanceSummaryReferenceSchema = {
  type: "object" as const,
  properties: {
    descriptor: {
      type: "string",
    },
    href: {
      type: "string",
    },
    id: {
      type: "string",
    },
  },
};
