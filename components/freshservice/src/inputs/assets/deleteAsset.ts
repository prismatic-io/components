import { input } from "@prismatic-io/spectral";
import { connection } from "../common";
import { assetDisplayId } from "./common";

export const deleteAssetInputs = {
  connection,
  assetDisplayId: input({
    ...assetDisplayId,
    comments: "Display ID of the asset to delete.",
  }),
};
