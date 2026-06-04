import { action } from "@prismatic-io/spectral";
import {
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
  baseCurrencyInput,
  currencyInput,
  exchRateDateInput,
  exchRateTypeInput,
  noglInput,
  attachmentsIdInput,
  customFieldsXmlInput,
} from "../inputs";
import { executeXmlRequest, getDateXmlTags, handleSageError } from "../utils";
import { createInvoicePayload } from "../examplePayloads/createInvoicePayload";

export const createInvoice = action({
  display: {
    label: "Create Invoice",
    description: "Creates an invoice.",
  },
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
      baseCurrencyInput,
      currencyInput,
      exchRateDateInput,
      exchRateTypeInput,
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
    <basecurr>${baseCurrencyInput}</basecurr>
    <currency>${currencyInput}</currency>
    ${
      exchRateDateInput.length > 0
        ? getDateXmlTags(exchRateDateInput, "exchratedate")
        : ""
    }
    <exchratetype>${exchRateTypeInput}</exchratetype>
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
  inputs: {
    connection,
    invoiceLineItemsInput,
    customerIdInput: {
      ...customerIdInput,
      required: true,
      comments: "The customer ID to create the invoice for.",
      example: "C-00269",
    },
    dateCreatedInput,
    datePostedInput,
    dueDateInput: { ...dueDateInput, comments: "The due date of the invoice." },
    termNameInput,
    recordNoInput: {
      ...recordNoInput,
      required: false,
      comments: "A Summary RECORDNO for the invoice.",
    },
    invoiceNumberInput,
    ponumberInput,
    descriptionInput: {
      ...descriptionInput,
      required: false,
      comments: "The description of the invoice.",
      example: "Some description",
    },
    externalIdInput,
    billToContactNameInput: {
      ...billToContactNameInput,
      required: false,
      comments:
        "The name of the contact to bill to. This should be an existing contact in Intacct.",
    },
    shipToContactNameInput: {
      ...shipToContactNameInput,
      required: false,
      comments:
        "The name of the contact to ship to. This should be an existing contact in Intacct.",
    },
    baseCurrencyInput,
    currencyInput: {
      ...currencyInput,
      comments: "The currency of the invoice.",
    },
    exchRateDateInput,
    exchRateTypeInput,
    noglInput,
    attachmentsIdInput,
    customFieldsXmlInput,
  },
  examplePayload: createInvoicePayload,
});
