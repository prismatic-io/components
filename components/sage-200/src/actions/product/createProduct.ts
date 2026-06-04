import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { connection, site, company } from "../../inputs/general";
import createProductInputs from "../../inputs/product/createProductInputs";
import { createProductPayload } from "../../examplePayloads";

export const createProduct = action({
  display: {
    label: "Create Product",
    description: "Create a new product",
  },
  perform: async (
    context,
    {
      connection,
      code,
      name,
      productGroupId,
      site,
      company,
      description,
      useDescriptionOnDocuments,
      barcode,
      allowSalesOrder,
      taxCodeId,
      productStatusType,
      fulfilmentMethodType,
      fulfilmentSequenceType,
      inactivationDate,
      manufacturer,
      partNumber,
      labelPrintingOptionType,
      traceableType,
      saleFromSingleBatch,
      allowDuplicateNumbers,
      usesAlternativeRef,
      usesSellByDate,
      usesUseByDate,
      shelfLife,
      shelfLifeType,
      additionalFields,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const payload = {
      code,
      name,
      product_group_id: productGroupId,
      description,
      use_description_on_documents: useDescriptionOnDocuments,
      barcode,
      allow_sales_order: allowSalesOrder,
      tax_code_id: taxCodeId,
      product_status_type: productStatusType,
      fulfilment_method_type: fulfilmentMethodType,
      fulfilment_sequence_type: fulfilmentSequenceType,
      inactivation_date: inactivationDate,
      manufacturer,
      part_number: partNumber,
      label_printing_option_type: labelPrintingOptionType,
      traceable_type: traceableType,
      sale_from_single_batch: saleFromSingleBatch,
      allow_duplicate_numbers: allowDuplicateNumbers,
      uses_alternative_ref: usesAlternativeRef,
      uses_sell_by_date: usesSellByDate,
      uses_use_by_date: usesUseByDate,
      shelf_life: shelfLife,
      shelf_life_type: shelfLifeType,
      ...(additionalFields || {}),
    };
    const { data } = await client.post("/products", payload);
    return {
      data,
    };
  },
  inputs: {
    connection,
    site,
    company,
    ...createProductInputs,
  },
  examplePayload: createProductPayload,
});
