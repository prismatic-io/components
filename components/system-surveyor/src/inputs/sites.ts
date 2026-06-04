import {
  connectionInput,
  fetchAll,
  modifiedAfter,
  pageNumber,
  pageSize,
  siteId,
  surveyIds,
} from "./common";

export const getSitesInputs = {
  ssvConnection: connectionInput,
  fetchAll,
  pageNumber,
  pageSize,
  modifiedAfter,
};

export const getSitesAndFoldersInputs = {
  ssvConnection: connectionInput,
  fetchAll,
  pageNumber,
  pageSize,
  modifiedAfter,
};

export const getSiteInfoInputs = {
  ssvConnection: connectionInput,
  siteId,
};

export const getSiteContactsInputs = {
  ssvConnection: connectionInput,
  siteId,
};

export const getBillOfMaterialsDataInputs = {
  ssvConnection: connectionInput,
  siteId,
  surveyIds: {
    ...surveyIds,
    required: false,
  },
};

export const listSiteSurveysInputs = {
  ssvConnection: connectionInput,
  siteId,
  fetchAll,
  pageNumber,
  pageSize,
};

export const listDeletedSitesInputs = {
  ssvConnection: connectionInput,
  fetchAll,
  pageNumber,
  pageSize,
};
