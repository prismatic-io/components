import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { saveAsNewAssetResponse } from "../../examplePayloads";
import {
  bodyData,
  connection,
  copyright,
  description,
  id,
  name,
} from "../../inputs";

export const saveAsNewAsset = action({
  display: {
    label: "Save a New Asset",
    description: "Save a completed upload as a new asset.",
  },
  inputs: {
    importId: {
      ...id,
      label: "Import ID",
      comments: "Import id of a finalized and processed upload to be saved.",
    },
    brandId: {
      ...id,
      label: "Brand ID",
      comments: "Brand id to save the asset to.",
      dataSource: "selectBrand",
    },
    name: {
      ...name,
      label: "Asset Name",
      comments: "Name of the new asset.",
      example: "Logo",
      placeholder: "Logo",
    },
    description,
    copyright,
    bodyData: {
      ...bodyData,
      comments: "Data of the new asset.",
      example: JSON.stringify(
        {
          isPublic: true,
          audit: false,
          publicationDate: "05-31-2010",
          tags: "scenery,grassland,Holland",
          watermarkDate: "2014-12-25T10:30:00Z",
        },
        null,
        2,
      ),
    },
    connection,
  },
  perform: async (
    context,
    { connection, importId, bodyData, brandId, copyright, description, name },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`media/save/${importId}`, {
      brandId,
      name,
      copyright,
      description,
      ...bodyData,
    });
    return { data };
  },
  examplePayload: {
    data: saveAsNewAssetResponse,
  },
});
