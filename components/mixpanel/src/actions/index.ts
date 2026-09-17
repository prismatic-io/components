import dataExport from "./dataExport";
import events from "./events";
import funnels from "./funnels";
import identities from "./identities";
import insights from "./insights";
import misc from "./misc";
import pipelines from "./pipelines";
import profiles from "./profiles";
export default {
  ...dataExport,
  ...events,
  ...funnels,
  ...identities,
  ...insights,
  ...misc,
  ...pipelines,
  ...profiles,
};
