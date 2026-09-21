import { input, util } from "@prismatic-io/spectral";
import { cleanFunctionForXml } from "../util";
import {
  additionalXmlTagsInput,
  connection,
  customerIdInput,
  fieldsInput,
  recordNoInput,
} from "./common";
const paymentDateInput = input({
  label: "Payment Date",
  type: "string",
  comments: "Date the advance payment was made, in the mm/dd/yyyy format.",
  example: "09/12/2021",
  placeholder: "Enter date (MM/DD/YYYY)",
  required: true,
  clean: util.types.toString,
});
const receiptDateInput = input({
  label: "Receipt Date",
  type: "string",
  comments:
    "Receipt date in the mm/dd/yyyy format. If automatic summaries are enabled, this is the date on which the advance will be posted to the General Ledger.",
  example: "09/12/2021",
  placeholder: "Enter date (MM/DD/YYYY)",
  required: true,
  clean: util.types.toString,
});
const paymentMethodInput = input({
  label: "Payment Method",
  type: "string",
  comments: "Payment method used for the advance.",
  model: [
    {
      label: "Printed Check",
      value: "Printed Check",
    },
    {
      label: "Cash",
      value: "Cash",
    },
    {
      label: "EFT",
      value: "EFT",
    },
    {
      label: "Credit Card",
      value: "Credit Card",
    },
  ],
  example: "Cash",
  required: true,
  clean: util.types.toString,
});
const financialEntityInput = input({
  label: "Financial Entity",
  type: "string",
  comments:
    "ID of the checking or savings account to deposit the funds to. A create request must contain FINANCIALENTITY or UNDEPOSITEDACCOUNTNO when automatic summaries are enabled.",
  example: "1020",
  placeholder: "Enter ID",
  required: false,
  clean: util.types.toString,
});
const undepositedAccountNoInput = input({
  label: "Undeposited Account No",
  type: "string",
  comments:
    "Undeposited funds account number. A create request must contain FINANCIALENTITY or UNDEPOSITEDACCOUNTNO when automatic summaries are enabled.",
  example: "1020",
  placeholder: "Enter ID",
  required: false,
  clean: util.types.toString,
});
const arAdvanceItemsInput = input({
  label: "AR Advance Items",
  type: "code",
  language: "xml",
  comments:
    "Advance lines, must have at least 1. Check [Documentation](https://developer.intacct.com/api/accounts-receivable/ar-advances/) for additional tags.",
  required: true,
  example: `<ARADVANCEITEM>
        <ACCOUNTNO>4055</ACCOUNTNO>
        <ACCOUNTLABEL>Misc Sales</ACCOUNTLABEL>
        <TRX_AMOUNT>1000</TRX_AMOUNT>
        <LOCATIONID>CA</LOCATIONID>
      </ARADVANCEITEM>`,
  clean: cleanFunctionForXml,
});
export const updateARAdvanceInputs = {
  connection,
  recordNoInput: {
    ...recordNoInput,
    comments: "AR Advance RECORDNO to update.",
  },
  arAdvanceItemsInput: {
    ...arAdvanceItemsInput,
    required: false,
    comments:
      "AR Advance ARADVANCEITEMS to update. <strong>Note:</strong> To add an advance line, supply all the original lines along with the new one. To delete a line, supply only the lines that you want to keep. To modify a line, supply all the original lines and change the field values you want.",
  },
  paymentDateInput: {
    ...paymentDateInput,
    required: false,
    comments: "AR Advance PAYMENTDATE to update.",
  },
  receiptDateInput: {
    ...receiptDateInput,
    required: false,
    comments: "AR Advance RECEIPTDATE to update.",
  },
  paymentMethodInput: {
    ...paymentMethodInput,
    required: false,
    comments: "AR Advance PAYMENTMETHOD to update.",
  },
  financialEntityInput: {
    ...financialEntityInput,
    comments: "AR Advance FINANCIALENTITY to update.",
  },
  undepositedAccountNoInput: {
    ...undepositedAccountNoInput,
    comments: "AR Advance UNDEPOSITEDACCOUNTNO to update.",
  },
  additionalXmlTagsInput: {
    ...additionalXmlTagsInput,
    example: `<PRBATCH>123456</PRBATCH>
              <PRBATCHKEY>123456</PRBATCHKEY>
              <DOCNUMBER>123456</DOCNUMBER>
              <DESCRIPTION>Advance Description</DESCRIPTION>
              <CURRENCY>USD</CURRENCY>
              <BASECURR>USD</BASECURR>
              <EXCH_RATE_DATE>
                <year>2021</year>
                <month>09</month>
                <day>12</day>
              </EXCH_RATE_DATE>
              <EXCH_RATE>1.23</EXCH_RATE>
              <EXCH_RATE_TYPE_ID>Intacct Daily Rate</EXCH_RATE_TYPE_ID>
              <SUPDOCID>123456</SUPDOCID>              
              `,
  },
};
export const createARAdvanceInputs = {
  connection,
  paymentDateInput,
  receiptDateInput,
  paymentMethodInput,
  arAdvanceItemsInput,
  customerIdInput,
  financialEntityInput,
  undepositedAccountNoInput,
  additionalXmlTagsInput: {
    ...additionalXmlTagsInput,
    example:
      updateARAdvanceInputs.additionalXmlTagsInput.example +
      "<ACTION>Draft</ACTION>",
  },
};
export const getARAdvanceInputs = {
  connection,
  fieldsInput,
  recordNoInput,
};
