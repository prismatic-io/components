import { dataSource, type Element } from "@prismatic-io/spectral";
import { selectImageInputs } from "../inputs";
import { selectImageExamplePayload } from "../examplePayloads";
import { getApi } from "../api";
import { fetchImages } from "../util";
import { KlaviyoApi } from "../constants";
export const selectImage = dataSource({
  display: {
    label: "Select Image",
    description: "Select an image from a Klaviyo account.",
  },
  inputs: selectImageInputs,
  dataSourceType: "picklist",
  perform: async (_context, { connection }) => {
    const imagesApi = getApi(connection, KlaviyoApi.Images);
    const data = await fetchImages(imagesApi, ["name"], [], undefined);
    const result = data.data
      .map<Element>((response) => ({
        key: response.id,
        label: response.attributes.name ?? response.id,
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));
    return { result };
  },
  examplePayload: selectImageExamplePayload,
});
