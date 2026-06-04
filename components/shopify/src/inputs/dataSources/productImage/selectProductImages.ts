import { connectionInput, productId } from "../../common";

export const selectProductImagesInputs = {
  shopifyConnection: connectionInput,
  productId: {
    ...productId,
    dataSource: undefined,
  },
};
