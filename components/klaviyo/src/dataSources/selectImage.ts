import { dataSource, type Element } from "@prismatic-io/spectral";
import { connection } from "../inputs/shared";
import { getApi } from "../api";
import { fetchImages } from "../utils";
import { KlaviyoApi } from "../enums/KlaviyoApi";

export const selectImage = dataSource({
  display: {
    label: "Select Image",
    description: "Select an image from your Klaviyo account.",
  },
  inputs: { connection },
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
  examplePayload: {
    result: [{ label: "Example Image", key: "155463624" }],
  },
});
