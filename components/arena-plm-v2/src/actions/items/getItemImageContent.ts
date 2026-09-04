import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getItemImageContentExamplePayload } from "../../examplePayloads";
import { getItemImageContentInputs } from "../../inputs";
import { getItemImageContentOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getItemImageContent = action({
  display: {
    label: "Get Item Image Content",
    description: "Download the thumbnail image content for an item.",
  },
  inputs: getItemImageContentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getItemImageContentOutputSchema,
  }),
  examplePayload: getItemImageContentExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data, headers } = await client.get(
        `/items/${util.types.toString(params.itemGuid)}/image/content`,
        {
          responseType: "arraybuffer",
        },
      );
      const base64Content = Buffer.from(data).toString("base64");
      return {
        data: {
          content: base64Content,
          contentType: headers["content-type"] || "image/jpeg",
          size: data.byteLength,
        },
      };
    } catch (error) {
      handleArenaError(error, context.logger, "Get Item Image Content");
    }
  },
});
