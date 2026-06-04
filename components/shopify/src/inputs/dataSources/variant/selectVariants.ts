import { connectionInput, productId } from "../../common";

export const selectVariantsInputs = {
  shopifyConnection: connectionInput,
  productId: {
    ...productId,
    dataSource: undefined,
  },
};
