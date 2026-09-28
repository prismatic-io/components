import { dataSource, type Element } from "@prismatic-io/spectral";
import { selectTemplateInputs } from "../inputs";
import { selectTemplateExamplePayload } from "../examplePayloads";
import { getApi } from "../api";
import { fetchTemplates } from "../util";
import { KlaviyoApi } from "../constants";
export const selectTemplate = dataSource({
  display: {
    label: "Select Template",
    description: "Select a template to use.",
  },
  inputs: selectTemplateInputs,
  dataSourceType: "picklist",
  perform: async (_context, { connection }) => {
    const templatesApi = getApi(connection, KlaviyoApi.Templates);
    const data = await fetchTemplates(templatesApi, ["name"], [], undefined);
    const objects = data.data.map<Element>((response) => ({
      key: response.id,
      label: response.attributes.name,
    }));
    return { result: objects };
  },
  examplePayload: selectTemplateExamplePayload,
});
