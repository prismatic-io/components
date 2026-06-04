import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { updateProductImageExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  storeHash,
  updateProductImageDescription,
  updateProductImageImageFile,
  updateProductImageImageId,
  updateProductImageIsThumbnail,
  updateProductImageProductId,
  updateProductImageSortOrder,
  updateProductImageUrl,
  updateProductImageUrlStandard,
  updateProductImageUrlThumbnail,
  updateProductImageUrlTiny,
  updateProductImageUrlZoom,
} from "../../inputs";

export const updateProductImageAction = action({
  display: {
    label: "Update Product Image",
    description: "Updates a product image.",
  },
  examplePayload: updateProductImageExamplePayload,
  perform: async (
    context,
    {
      bigCommerceConnection,
      storeHash,
      product_id,
      image_id,
      image_file,
      image_url,
      url_zoom,
      url_standard,
      url_thumbnail,
      url_tiny,
      is_thumbnail,
      sort_order,
      description,
    },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/products/${product_id}/images/${image_id}`;
    const requestBody = {
      product_id,
      image_file,
      image_url,
      url_zoom,
      url_standard,
      url_thumbnail,
      url_tiny,
      is_thumbnail,
      sort_order,
      description,
    };

    try {
      const response = await client.put(endpoint, requestBody);
      return {
        data: response.data,
      };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },

  inputs: {
    bigCommerceConnection,
    storeHash,
    product_id: updateProductImageProductId,
    image_id: updateProductImageImageId,
    image_file: updateProductImageImageFile,
    image_url: updateProductImageUrl,
    url_zoom: updateProductImageUrlZoom,
    url_standard: updateProductImageUrlStandard,
    url_thumbnail: updateProductImageUrlThumbnail,
    url_tiny: updateProductImageUrlTiny,
    is_thumbnail: updateProductImageIsThumbnail,
    sort_order: updateProductImageSortOrder,
    description: updateProductImageDescription,
  },
});
