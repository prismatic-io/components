import { input, util } from "@prismatic-io/spectral";
import { cleanFunctionForXml } from "../util";
import {
  additionalXmlTagsInput,
  connection,
  currencyInput,
  customerIdInput,
  dateCreatedInput,
  datePostedInput,
  descriptionInput,
  exchRateTypeInput,
  fieldsInput,
  invoiceNumberInput,
  keyId,
  recordNoInput,
} from "./common";
const arAdjustmentLineItemsInput = input({
  label: "AR Adjustment Line Items",
  type: "code",
  comments: "XML-formatted line items for the AR adjustment.",
  language: "xml",
  required: true,
  example: `
  <updatelineitem line_num="1">
    <glaccountno>4000</glaccountno>
    <amount>100.25</amount>
    <memo>line 1</memo>
    <locationid>L100</locationid>
    <departmentid>D200</departmentid>
  </updatelineitem>
  <lineitem>
    <glaccountno>4000</glaccountno>
    <amount>20.99</amount>
    <memo>add a new line</memo>
    <locationid>L100</locationid>
    <departmentid>D200</departmentid>
  </lineitem>`,
  clean: cleanFunctionForXml,
});
const adjustmentNoInput = input({
  label: "Adjustment Number",
  type: "string",
  comments: "The reference number assigned to the AR adjustment.",
  required: false,
  clean: util.types.toString,
});
const actionInput = input({
  label: "Action",
  type: "string",
  comments: "Action. Use Draft or Submit. (Default: Submit)",
  model: [
    {
      label: "Draft",
      value: "Draft",
    },
    {
      label: "Submit",
      value: "Submit",
    },
  ],
  required: false,
  clean: util.types.toString,
});
export const updateARAdjustmentInputs = {
  connection,
  keyId: { ...keyId, comments: "AR Adjustment RECORDNO of bill to update." },
  customerIdInput: {
    ...customerIdInput,
    comments: "AR Adjustment CUSTOMERID to update.",
  },
  dateCreatedInput: {
    ...dateCreatedInput,
    comments: "AR Adjustment DATECREATED to update.",
    required: false,
  },
  datePostedInput: {
    ...datePostedInput,
    comments: "AR Adjustment DATEPOSTED to update.",
  },
  descriptionInput: {
    ...descriptionInput,
    comments: "AR Adjustment DESCRIPTION to update.",
  },
  currencyInput: {
    ...currencyInput,
    comments: "AR Adjustment CURRENCY to update.",
  },
  exchRateTypeInput: {
    ...exchRateTypeInput,
    comments: "AR Adjustment EXCHRATETYPE to update.",
  },
  adjustmentNoInput: {
    ...adjustmentNoInput,
    comments: "AR Adjustment ADJUSTMENTNO to update.",
  },
  invoiceNoInput: {
    ...invoiceNumberInput,
    comments: "AR Adjustment INVOICENO to update.",
    required: false,
  },
  arAdjustmentLineItemsInput: {
    ...arAdjustmentLineItemsInput,
    comments:
      "AR Adjustment LINEITEMS to update. Each item must be wrapped in <updatelineitem></updatelineitem> or <lineitem></lineitem> tags.",
    required: false,
  },
  actionInput,
  additionalXmlTagsInput: {
    ...additionalXmlTagsInput,
    example: `<basecurr>USD</basecurr>
              <exchratedate>
                <year>2021</year>
                <month>09</month>
                <day>12</day>
              </exchratedate>
              <exchrate>1.23</exchrate>
    `,
  },
};
export const getARAdjustmentInputs = {
  connection,
  fieldsInput,
  recordNoInput,
};
export const getARAdjustmentLineInputs = {
  connection,
  fieldsInput,
  recordNoInput,
};
