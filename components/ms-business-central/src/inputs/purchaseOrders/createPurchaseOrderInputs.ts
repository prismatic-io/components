import { input } from "@prismatic-io/spectral";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { additionalProperties, connectionInput } from "../../inputs/general";
import {
  currencyCode,
  shipToAddressLine1,
  shipToName,
} from "../../inputs/salesOrders/createSalesOrderInputs";
import { cleanNumberInput, cleanStringInput } from "../../utils";

const orderDate = input({
  label: "Order Date",
  required: false,
  comments: "The order date.",
  type: "string",
  example: "2022-01-01",
  placeholder: "Enter order date (YYYY-MM-DD)",
  clean: cleanStringInput,
});

const vendorNumber = input({
  label: "Vendor Number",
  required: true,
  comments: "Specifies vendor's number.",
  type: "string",
  example: "10000",
  placeholder: "Enter vendor number",
  clean: cleanStringInput,
});

const payToVendorId = input({
  label: "Pay To Vendor ID",
  required: false,
  comments: "The unique ID of the vendor to pay to.",
  type: "string",
  example: "5d115c9c-44e3-ea11-bb43-000d3a2feca1",
  placeholder: "Enter pay to vendor ID",
  dataSource: "selectVendor",
  clean: cleanStringInput,
});

const payToVendorNumber = input({
  label: "Pay To Vendor Number",
  required: false,
  comments: "Specifies the number of the vendor to pay to.",
  type: "string",
  example: "10000",
  placeholder: "Enter pay to vendor number",
  clean: cleanStringInput,
});

const purchaser = input({
  label: "Purchaser",
  required: false,
  comments: "The purchaser in the purchase order.",
  type: "string",
  example: "John Doe",
  placeholder: "Enter purchaser name",
  clean: cleanStringInput,
});

const discountAmount = input({
  label: "Discount Amount",
  required: false,
  comments: "The discount amount.",
  type: "string",
  example: "0.10",
  placeholder: "Enter discount amount",
  clean: cleanNumberInput,
});

export const createPurchaseOrderInputs = {
  connection: connectionInput,
  companyId,
  vendorNumber,
  shipToAddressLine1,
  shipToName,
  currencyCode,
  orderDate,
  payToVendorId,
  payToVendorNumber,
  purchaser,
  discountAmount,
  additionalProperties: input({
    ...additionalProperties,
    example: JSON.stringify(
      {
        buyFromAddressLine1: "100 Day Drive",
        buyFromAddressLine2: "",
        buyFromCity: "Chicago",
        buyFromCountry: "US",
        buyFromState: "IL",
        buyFromPostCode: "61236",
      },
      null,
      2,
    ),
  }),
};
