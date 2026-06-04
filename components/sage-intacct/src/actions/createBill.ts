import { action } from "@prismatic-io/spectral";
import { executeXmlRequest, handleSageError } from "../utils";
import {
  connection,
  billTransactionDateInput,
  billTransactionGlPostingDateInput,
  vendorIdInput,
  billNumberInput,
  docNumberInput,
  descriptionInput,
  termNameInput,
  recPaymentDateInput,
  attachmentsIdInput,
  dueDateInput,
  paymentPriorityInput,
  onHoldInput,
  currencyInput,
  baseCurrencyInput,
  apBillItemsInput,
} from "../inputs";
import { createBillPayload } from "../examplePayloads/createBillPayload";

export const createBill = action({
  display: {
    label: "Create Bill",
    description: "Create a new bill.",
  },
  perform: async (
    context,
    {
      connection,
      billTransactionDateInput,
      billTransactionGlPostingDateInput,
      vendorIdInput,
      billNumberInput,
      docNumberInput,
      descriptionInput,
      termNameInput,
      recPaymentDateInput,
      attachmentsIdInput,
      dueDateInput,
      paymentPriorityInput,
      onHoldInput,
      currencyInput,
      baseCurrencyInput,
      apBillItemsInput,
    },
  ) => {
    const action = `<create>
        <APBILL>
            <WHENCREATED>${billTransactionDateInput}</WHENCREATED>
            <WHENPOSTED>${billTransactionGlPostingDateInput}</WHENPOSTED>
            <VENDORID>${vendorIdInput}</VENDORID>
            <RECORDID>${billNumberInput}</RECORDID>
            <DOCNUMBER>${docNumberInput}</DOCNUMBER>
            <DESCRIPTION>${descriptionInput}</DESCRIPTION>
            <TERMNAME>${termNameInput}</TERMNAME>
            <RECPAYMENTDATE>${recPaymentDateInput}</RECPAYMENTDATE>
            <SUPDOCID>${attachmentsIdInput}</SUPDOCID>
            <WHENDUE>${dueDateInput}</WHENDUE>
            <PAYMENTPRIORITY>${paymentPriorityInput}</PAYMENTPRIORITY>
            ${onHoldInput === "" ? "" : `<ONHOLD>${onHoldInput}</ONHOLD>`}
            <CURRENCY>${currencyInput}</CURRENCY>
            <BASECURR>${baseCurrencyInput}</BASECURR>
            <APBILLITEMS>
                ${apBillItemsInput}
            </APBILLITEMS>
        </APBILL>
    </create>`;

    const responseFromSage = await executeXmlRequest(
      connection,
      action,
      context.debug.enabled,
    );

    handleSageError(responseFromSage);

    return {
      data: responseFromSage,
    };
  },
  inputs: {
    connection,
    billTransactionDateInput,
    billTransactionGlPostingDateInput,
    vendorIdInput: {
      ...vendorIdInput,
      required: true,
      comments: "The vendor ID.",
      example: "V-01879",
    },
    billNumberInput,
    docNumberInput,
    descriptionInput,
    termNameInput,
    recPaymentDateInput,
    attachmentsIdInput,
    dueDateInput,
    paymentPriorityInput: {
      ...paymentPriorityInput,
      model: [
        { label: "urgent", value: "urgent" },
        { label: "high", value: "high" },
        { label: "normal", value: "normal" },
        { label: "low", value: "low" },
      ],
    },
    onHoldInput: { ...onHoldInput, comments: "Place this bill on hold" },
    currencyInput,
    baseCurrencyInput,
    apBillItemsInput,
  },
  examplePayload: createBillPayload,
});
