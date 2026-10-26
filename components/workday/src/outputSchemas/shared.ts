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
export const eventAttachmentsViewSchema = {
  type: "object" as const,
  properties: {
    uploadDate: {
      type: "string",
      format: "date",
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
      },
    },
    descriptor: {
      type: "string",
    },
    id: {
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
  },
};
export const additionalJobsSchema = {
  type: "object" as const,
  properties: {
    location: locationSchema,
    jobProfile: idDescriptorReferenceSchema,
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
      },
    },
    supervisoryOrganization: idDescriptorReferenceSchema,
    descriptor: {
      type: "string",
    },
    id: {
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
