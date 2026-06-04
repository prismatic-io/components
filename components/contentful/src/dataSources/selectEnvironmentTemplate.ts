import { dataSource } from "@prismatic-io/spectral";
import { selectEnvironmentTemplateInputs } from "../inputs";



export const selectEnvironmentTemplate = dataSource({
  display: {
    label: "Select Environment Template",
    description: "Select an environment template from a dropdown menu.",
  },
  inputs: selectEnvironmentTemplateInputs,
  perform: async () => {
    return Promise.resolve({ result: [] });
  },
  dataSourceType: "picklist",
});
