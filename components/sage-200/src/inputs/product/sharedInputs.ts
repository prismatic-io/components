import { input, util } from "@prismatic-io/spectral";
import { cleanCodeInput, cleanNumberInput, cleanStringInput } from "../../util";

const description = input({
  label: "Product Description",
  comments: "Product description.",
  type: "string",
  required: false,
  placeholder: "32mb PCI Video Card",
  example: "32mb PCI Video Card",
  clean: cleanStringInput,
});

const useDescriptionOnDocuments = input({
  label: "Use Description On Documents",
  comments: "Whether to use the product description on order and invoice documents.",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

const barcode = input({
  label: "Product Barcode",
  comments: "Product bar code.",
  type: "string",
  required: false,
  placeholder: "1234567890123",
  example: "1234567890123",
  clean: cleanStringInput,
});

const allowSalesOrder = input({
  label: "Allow Sales Order",
  comments: "Indicates whether the product is allowed on sales orders and invoicing.",
  type: "boolean",
  required: false,
  default: "true",
  clean: util.types.toBool,
});

const taxCodeId = input({
  label: "Tax Code ID",
  comments:
    "Tax code record Id. See [Sage 200 API documentation](https://developer.sage.com/200/reference/tax_codes) for more information.",
  type: "string",
  required: false,
  placeholder: "1729",
  example: "1729",
  dataSource: "selectTaxCode",
  clean: cleanNumberInput,
});

const productStatusType = input({
  label: "Product Status Type",
  comments:
    "The product status type. See [Sage 200 API documentation](https://developer.sage.com/200/reference/product_status_types) for more information.",
  type: "string",
  required: false,
  placeholder: "EnumStockItemStatusTypeActive",
  example: "EnumStockItemStatusTypeActive",
  clean: cleanStringInput,
});

const fulfilmentMethodType = input({
  label: "Fulfilment Method Type",
  comments:
    "The fulfilment method type of the product. See [Sage 200 API documentation](https://developer.sage.com/200/reference/fulfilment_method_types) for more information.",
  type: "string",
  required: false,
  placeholder: "EnumFulfilmentFromStock",
  example: "EnumFulfilmentFromStock",
  clean: cleanStringInput,
});

const fulfilmentSequenceType = input({
  label: "Fulfilment Sequence Type",
  comments:
    "The fulfilment sequence type of the product. See [Sage 200 API documentation](https://developer.sage.com/200/reference/fulfilment_sequence_types) for more information.",
  type: "string",
  required: false,
  placeholder: "EnumBinPriority",
  example: "EnumBinPriority",
  clean: cleanStringInput,
});

const inactivationDate = input({
  label: "Inactivation Date",
  comments: "If the product was made inactive, the date on which the product was made inactive.",
  type: "string",
  required: false,
  placeholder: "2024-02-28T14:06:51.697Z",
  example: "2024-02-28T14:06:51.697Z",
  clean: cleanStringInput,
});

const manufacturer = input({
  label: "Manufacturer",
  comments: "The product manufacturer.",
  type: "string",
  required: false,
  placeholder: "Nvidia",
  example: "Nvidia",
  clean: cleanStringInput,
});

const partNumber = input({
  label: "Part Number",
  comments: "The product part number.",
  type: "string",
  required: false,
  placeholder: "VI6874",
  example: "VI6874",
  clean: cleanStringInput,
});

const labelPrintingOptionType = input({
  label: "Label Printing Option Type",
  comments:
    "The label printing option type. (Sage 200 Professional only). See [Sage 200 API documentation](https://developer.sage.com/200/reference/label_printing_option_types) for more information.",
  type: "string",
  required: false,
  placeholder: "EnumNotRequired",
  example: "EnumNotRequired",
  clean: cleanStringInput,
});

const traceableType = input({
  label: "Traceable Type",
  comments:
    "The traceable type of the product. (Sage 200 Professional only). See [Sage 200 API documentation](https://developer.sage.com/200/reference/traceable_types) for more information.",
  type: "string",
  required: false,
  placeholder: "EnumTraceableTypeNone",
  example: "EnumTraceableTypeNone",
  clean: cleanStringInput,
});

const saleFromSingleBatch = input({
  label: "Sale From Single Batch",
  comments:
    "Indicates whether the product is sold from a single batch. (Sage 200 Professional only).",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

const allowDuplicateNumbers = input({
  label: "Allow Duplicate Numbers",
  comments: "Indicates whether the product allows duplicate numbers. (Sage 200 Professional only).",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

const usesAlternativeRef = input({
  label: "Uses Alternative Reference",
  comments:
    "Indicates whether the product uses alternative references. (Sage 200 Professional only).",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

const usesSellByDate = input({
  label: "Uses Sell By Date",
  comments: "Indicates whether the product uses sell by dates. (Sage 200 Professional only).",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

const usesUseByDate = input({
  label: "Uses Use By Date",
  comments: "Indicates whether the product uses use by dates. (Sage 200 Professional only).",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

const shelfLife = input({
  label: "Shelf Life",
  comments: "The shelf life of the product. (Sage 200 Professional only).",
  type: "string",
  required: false,
  placeholder: "",
  example: "",
  clean: cleanNumberInput,
});

const shelfLifeType = input({
  label: "Shelf Life Type",
  comments:
    "The shelf life type of the product. (Sage 200 Professional only). See [Sage 200 API documentation](https://developer.sage.com/200/reference/time_unit_types) for more information.",
  type: "string",
  required: false,
  placeholder: "EnumTimeUnitDay",
  example: "EnumTimeUnitDay",
  clean: cleanStringInput,
});

const additionalFields = input({
  label: "Additional Fields",
  type: "code",
  language: "json",
  comments:
    "Additional fields that are not covered by the standard inputs. See [Sage 200 API documentation](https://developer.sage.com/200/reference/products) for more information.",
  required: false,
  example: JSON.stringify(
    {
      warehouse_holdings: [
        {
          warehouse_id: "34627",
          reorder_level: "1",
          minimum_level: "1",
          maximum_level: "1",
          quantity_in_stock: 0,
          is_default_manufacturing_warehouse: true,
          id: 0,
          bin_holdings: [{ name: "Unspecified", allocation_priority: 9, id: 0 }],
        },
      ],
    },
    null,
    2,
  ),
  clean: cleanCodeInput,
});

export default {
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
};
