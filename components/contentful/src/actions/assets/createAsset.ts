import { action, outputSchema } from "@prismatic-io/spectral";
import type { Asset, AssetProps, Environment } from "contentful-management";
import { createClient } from "../../client";
import { createAssetExamplePayload } from "../../examplePayloads";
import { createAssetInputs } from "../../inputs";
import { createAssetOutputSchema } from "../../outputSchemas";
import { getEnvironment } from "../../util";
export const createAsset = action({
  display: {
    label: "Create Asset",
    description: "Creates a new asset.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, environmentId, spaceId, title, description, file },
  ) => {
    const client = createClient(connection, context);
    const environment: Environment = await getEnvironment(
      client,
      spaceId,
      environmentId,
    );
    const asset: Asset = await environment.createAsset({
      fields: {
        title: title as AssetProps["fields"]["title"],
        description: description as AssetProps["fields"]["description"],
        file: file as AssetProps["fields"]["file"],
      },
    });
    const data: AssetProps = (
      await asset.processForAllLocales()
    ).toPlainObject();
    return {
      data: data as unknown,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => createAssetExamplePayload,
  inputs: createAssetInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createAssetOutputSchema,
  }),
  examplePayload: createAssetExamplePayload,
});
