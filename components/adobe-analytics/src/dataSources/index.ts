import companyDataSources from "./companies";
import dimensionDataSources from "./dimensions";
import metricDataSources from "./metrics";
import reportSuiteDataSources from "./reportSuites";

export default {
  ...companyDataSources,
  ...dimensionDataSources,
  ...metricDataSources,
  ...reportSuiteDataSources,
};
