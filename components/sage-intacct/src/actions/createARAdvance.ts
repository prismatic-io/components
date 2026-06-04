import { action } from "@prismatic-io/spectral";
import { createARAdvanceInputs } from "../inputs";
import {
  executeXmlRequest,
  getDateXmlTags,
  getXmlTagOrEmptyString,
  handleSageError,
} from "../utils";
import { createARAdvancePayload } from "../examplePayloads/createARAdvancePayload";

export const createARAdvance = action({
  display: {
    label: "Create AR Advance",
    description: "Creates a new AR Advance.",
  },
  perform: async (
    context,
    {
      connection,
      customerIdInput,
      paymentDateInput,
      receiptDateInput,
      paymentMethodInput,
      arAdvanceItemsInput,
      financialEntityInput,
      undepositedAccountNoInput,
      additionalXmlTagsInput,
    },
  ) => {
    const action = `<create>
  <ARADVANCE>
    <CUSTOMERID>${customerIdInput}</CUSTOMERID>
    ${getDateXmlTags(paymentDateInput, "PAYMENTDATE")}
    ${getDateXmlTags(receiptDateInput, "RECEIPTDATE")}
    <PAYMENTMETHOD>${paymentMethodInput}</PAYMENTMETHOD>
    ${getXmlTagOrEmptyString("FINANCIALENTITY", financialEntityInput)}
    ${getXmlTagOrEmptyString("UNDEPOSITEDACCOUNTNO", undepositedAccountNoInput)}
    <ARADVANCEITEMS>
      ${arAdvanceItemsInput}
    </ARADVANCEITEMS>
    ${additionalXmlTagsInput}
  </ARADVANCE>
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
  inputs: createARAdvanceInputs,
  examplePayload: createARAdvancePayload,
});
