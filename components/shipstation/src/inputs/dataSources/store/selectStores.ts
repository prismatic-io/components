import { util } from "@prismatic-io/spectral";
import { connectionInput, marketplaceId, showInactive } from "../../common";

export const selectStoresInputs = {
  showInactive,
  marketplaceId: {
    ...marketplaceId,
    clean: util.types.toNumber,
  },
  connectionInput,
};
