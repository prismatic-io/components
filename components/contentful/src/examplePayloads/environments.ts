import type { EnvironmentProps } from "contentful-management";
export const getEnvironmentExamplePayload: {
  data: EnvironmentProps;
} = {
  data: {
    name: "master",
    sys: {
      type: "Environment",
      id: "master",
      version: 1,
      space: {
        sys: {
          type: "Link",
          linkType: "Space",
          id: "fm17kie1n0p4",
        },
      },
      status: {
        sys: {
          type: "Link",
          linkType: "Status",
          id: "ready",
        },
      },
      createdBy: {
        sys: {
          type: "Link",
          linkType: "User",
          id: "5QvxuP1Kp8mVrw3PVcOp4t",
        },
      },
      createdAt: "2024-01-29T18:33:02Z",
      updatedBy: {
        sys: {
          type: "Link",
          linkType: "User",
          id: "5QvxuP1Kp8mVrw3PVcOp4t",
        },
      },
      updatedAt: "2024-01-29T18:33:02Z",
    },
  },
};
export const listEnvironmentsExamplePayload = {
  data: [getEnvironmentExamplePayload.data],
};
export const createEnvironmentExamplePayload = {
  data: getEnvironmentExamplePayload.data,
};
export const updateEnvironmentExamplePayload = {
  data: getEnvironmentExamplePayload.data,
};
export const deleteEnvironmentExamplePayload = { data: {} };
