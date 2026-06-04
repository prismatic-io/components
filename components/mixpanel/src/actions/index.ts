import { customJQLQuery } from "./customJQLQuery";
import { downloadData } from "./downloadData";
import { queryInsightsSavedReports } from "./queryInsightSavedReports";
import events from "./events";
import funnels from "./funnels";
import identities from "./identities";
import pipelines from "./pipelines";
import profiles from "./profiles";
import rawRequest from "./rawRequest";

export default {
  ...events,
  ...funnels,
  ...identities,
  ...identities,
  ...pipelines,
  ...profiles,
  customJQLQuery,
  downloadData,
  queryInsightsSavedReports,
  rawRequest,
};
