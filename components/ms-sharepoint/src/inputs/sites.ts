import { connection, fetchAll, pagination, siteId } from "./common";

export const listFollowedSitesInputs = {
  connection,
  fetchAll,
  pagination,
};

export const listSitesInputs = {
  connection,
  fetchAll,
  pagination,
};

export const getRootSiteInputs = {
  connection,
};

export const getSiteInputs = {
  connection,
  siteId,
};
