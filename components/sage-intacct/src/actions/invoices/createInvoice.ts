import { action, outputSchema } from "@prismatic-io/spectral";
import { executeXmlRequest, getDateXmlTags, handleSageError } from "../../util";
import { createInvoiceExamplePayload } from "../../examplePayloads";
import { createInvoiceInputs } from "../../inputs";
import { createInvoiceOutputSchema } from "../../outputSchemas";
export const createInvoice = action({
  display: {
    label: "Create Invoice",
    description: "Creates an invoice.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      invoiceLineItemsInput,
      customerIdInput,
      dateCreatedInput,
      datePostedInput,
      dueDateInput,
      termNameInput,
      recordNoInput,
      invoiceNumberInput,
      ponumberInput,
      descriptionInput,
      externalIdInput,
      billToContactNameInput,
      shipToContactNameInput,
      currencyAndExchangeRate,
      noglInput,
      attachmentsIdInput,
      customFieldsXmlInput,
    },
  ) => {
    const action = `<create_invoice>
    <customerid>${customerIdInput}</customerid>
    ${getDateXmlTags(dateCreatedInput, "datecreated")}
    ${
      datePostedInput.length > 0
        ? getDateXmlTags(datePostedInput, "dateposted")
        : ""
    }
    ${getDateXmlTags(dueDateInput, "datedue")}
    <termname>${termNameInput}</termname>
    <batchkey>${recordNoInput}</batchkey>
    <action>Submit</action>
    <invoiceno>${invoiceNumberInput}</invoiceno>
    <ponumber>${ponumberInput}</ponumber>
    <description>${descriptionInput}</description>
    <externalid>${externalIdInput}</externalid>
    <billto>
        <contactname>${billToContactNameInput}</contactname>
    </billto>
    <shipto>
        <contactname>${shipToContactNameInput}</contactname>
    </shipto>
    <basecurr>${currencyAndExchangeRate.baseCurrencyInput}</basecurr>
    <currency>${currencyAndExchangeRate.currencyInput}</currency>
    ${
      currencyAndExchangeRate.exchRateDateInput.length > 0
        ? getDateXmlTags(
            currencyAndExchangeRate.exchRateDateInput,
            "exchratedate",
          )
        : ""
    }
    <exchratetype>${currencyAndExchangeRate.exchRateTypeInput}</exchratetype>
    ${noglInput === "" ? "" : `<nogl>${noglInput}</nogl>`}
    <supdocid>${attachmentsIdInput}</supdocid>
    <customfields>
       ${customFieldsXmlInput}
    </customfields>
    <invoiceitems>
        ${invoiceLineItemsInput}
    </invoiceitems>
</create_invoice>`;
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
  inputs: createInvoiceInputs,
  examplePayload: createInvoiceExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createInvoiceOutputSchema,
  }),
  examplePerform: async () => ({ data: createInvoiceExamplePayload.data }),
});
