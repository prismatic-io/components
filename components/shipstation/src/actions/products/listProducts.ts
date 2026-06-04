import { action } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { listProductsExamplePayload } from "../../examplePayloads";
import { listProductsInputs } from "../../inputs";

export const listProducts = action({
  display: {
    label: "List Products",
    description:
      "Retrieves a list of products that match the specified criteria.",
  },
  perform: async (
    context,
    {
      connectionInput,
      sku,
      productName,
      productCategoryId,
      productTypeId,
      tagId,
      startDate,
      endDate,
      sortBy,
      sortDir,
      page,
      pageSize,
      showInactive,
    },
  ) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );

    const params = {
      sku,
      name: productName,
      productCategoryId,
      productTypeId,
      tagId,
      startDate,
      endDate,
      sortBy,
      sortDir,
      page,
      pageSize,
      showInactive,
    };

    const { data } = await client.get("/products", { params });
    return { data };
  },
  inputs: listProductsInputs,
  examplePayload: listProductsExamplePayload,
});
