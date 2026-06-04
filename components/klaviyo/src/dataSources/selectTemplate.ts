import { dataSource, type Element } from "@prismatic-io/spectral";
import { connection } from "../inputs/shared";
import { getApi } from "../api";
import { fetchTemplates } from "../utils";
import { KlaviyoApi } from "../enums/KlaviyoApi";

export const selectTemplate = dataSource({
  display: {
    label: "Select Template",
    description: "Select a template to use.",
  },
  inputs: { connection },
  dataSourceType: "picklist",
  perform: async (context, { connection }) => {
    const templatesApi = getApi(connection, KlaviyoApi.Templates);

    const data = await fetchTemplates(templatesApi, ["name"], [], undefined);
    const objects = data.data.map<Element>((response) => ({
      key: response.id,
      label: response.attributes.name,
    }));

    return { result: objects };
  },
});
