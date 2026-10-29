import { connection, dataSourceReturn, environmentId, spaceId } from "./common";

export const selectAssetInputs = {
  connection,
  spaceId: {
    ...spaceId,
    dataSource: undefined,
  },
  environmentId: {
    ...environmentId,
    dataSource: undefined,
  },
};

export const selectContentTypeInputs = {
  connection,
  spaceId: {
    ...spaceId,
    dataSource: undefined,
  },
  environmentId: {
    ...environmentId,
    dataSource: undefined,
  },
  dataSourceReturn,
};

export const selectEntryInputs = {
  connection,
  spaceId: {
    ...spaceId,
    dataSource: undefined,
  },
  environmentId: {
    ...environmentId,
    dataSource: undefined,
  },
};

export const selectEnvironmentInputs = {
  connection,
  spaceId: {
    ...spaceId,
    dataSource: undefined,
  },
  dataSourceReturn,
};

export const selectEnvironmentTemplateInputs = {
  connection,
};

export const selectOrganizationInputs = {
  connection,
  dataSourceReturn,
};

export const selectSpaceInputs = {
  connection,
  dataSourceReturn,
};

export const selectWebhookInputs = {
  connection,
  spaceId: {
    ...spaceId,
    dataSource: undefined,
  },
};
