import { action } from "@prismatic-io/spectral";
import { createApiClient } from "../../client";
import {
  connection,
  focuspoint,
  format,
  id,
  io,
  name,
  quality,
} from "../../inputs";

export const generateDynamicTransformation = action({
  display: {
    label: "Generate Dynamic Asset Transformation",
    description:
      "Generate a derivative on the fly with a transformation (such as cropping, scaling, filling) applied to it",
  },
  inputs: {
    id: {
      ...id,
      dataSource: "selectAsset",
    },
    name,
    io,
    focuspoint,
    format,
    quality,
    connection,
  },
  perform: async (
    context,
    { connection, id, focuspoint, format, io, name, quality },
  ) => {
    const client = createApiClient(connection, context.debug.enabled);
    const { data } = await client.get(`/transform/${id}/${name}`, {
      params: { focuspoint, format, io, quality },
    });
    return { data };
  },
  examplePayload: {
    data: {},
  },
});
