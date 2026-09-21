import { action, outputSchema } from "@prismatic-io/spectral";
import { executeXmlRequest, handleSageError } from "../../util";
import { createBillExamplePayload } from "../../examplePayloads";
import { createBillInputs } from "../../inputs";
import { createBillOutputSchema } from "../../outputSchemas";
export const createBill = action({
  display: {
    label: "Create Bill",
    description: "Creates a new bill.",
  },
  performSafety: "notAllowed",
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
  inputs: createBillInputs,
  examplePayload: createBillExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createBillOutputSchema,
  }),
  examplePerform: async () => ({ data: createBillExamplePayload.data }),
});
