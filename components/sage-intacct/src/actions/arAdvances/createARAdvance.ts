import { action, outputSchema } from "@prismatic-io/spectral";
import { createARAdvanceInputs } from "../../inputs";
import {
  executeXmlRequest,
  getDateXmlTags,
  getXmlTagOrEmptyString,
  handleSageError,
} from "../../util";
import { createARAdvanceExamplePayload } from "../../examplePayloads";
import { createARAdvanceOutputSchema } from "../../outputSchemas";
export const createARAdvance = action({
  display: {
    label: "Create AR Advance",
    description: "Creates a new AR Advance.",
  },
  performSafety: "notAllowed",
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
  examplePayload: createARAdvanceExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createARAdvanceOutputSchema,
  }),
  examplePerform: async () => ({ data: createARAdvanceExamplePayload.data }),
});
