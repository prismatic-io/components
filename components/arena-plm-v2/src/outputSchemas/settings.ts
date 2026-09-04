export const apiUseageSchema = {
  type: "object" as const,
  properties: {
    date: { type: "string" },
    method: { type: "string" },
    resource: { type: "string" },
    endpoint: { type: "string" },
    count: { type: "integer", format: "int64" },
    user: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
  },
};
export const exportSchema = {
  type: "object" as const,
  properties: {
    configuration: { type: "string" },
    dateTime: { type: "string" },
    numberOfResources: { type: "integer", format: "int32" },
    type: { type: "string" },
    user: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
  },
};
export const fileAccessSchema = {
  type: "object" as const,
  properties: {
    activity: { type: "string" },
    comments: { type: "string" },
    dateTime: { type: "string" },
    file: {
      type: "object",
      properties: {
        edition: { type: "string" },
        guid: { type: "string" },
        markup: {
          type: "object",
          properties: {
            title: { type: "string" },
            name: { type: "string" },
            guid: { type: "string" },
          },
        },
        name: { type: "string" },
        storageMethod: { type: "integer", format: "int32" },
        storageMethodName: { type: "string" },
        title: { type: "string" },
      },
    },
    user: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
  },
};
export const listApiUsagesOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: apiUseageSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const listRecentActivityExportsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: exportSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const listRecentActivityFileAccessesOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: fileAccessSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const reportRunSchema = {
  type: "object" as const,
  properties: {
    dateTime: { type: "string" },
    description: { type: "string" },
    numberOfObjects: { type: "integer", format: "int32" },
    report: {
      type: "object",
      properties: {
        guid: { type: "string" },
        title: { type: "string" },
        type: { type: "string" },
        visibility: { type: "string" },
      },
    },
    user: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
  },
};
export const listRecentActivityReportRunsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: reportRunSchema },
    count: { type: "integer", format: "int32" },
  },
};
export const userAccessSchema = {
  type: "object" as const,
  properties: {
    loginDateTime: { type: "string" },
    logoutDateTime: { type: "string" },
    duration: { type: "integer", format: "int64" },
    connectedThrough: { type: "string" },
    originatingIp: { type: "string" },
    domain: { type: "string" },
    user: {
      type: "object",
      properties: {
        email: { type: "string" },
        fullName: { type: "string" },
        guid: { type: "string" },
      },
    },
  },
};
export const listRecentActivityUserAccessesOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: userAccessSchema },
    count: { type: "integer", format: "int32" },
  },
};
