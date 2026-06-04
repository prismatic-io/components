import { connection } from "../common";
import { customTableId } from "./common";

export const getCustomTableMetadataInputs = {
  connection,
  customTableId: {
    ...customTableId,
    comments: "The ID of the custom table to retrieve metadata for.",
  },
};
