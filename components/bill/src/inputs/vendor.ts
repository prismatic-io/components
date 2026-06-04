import { input, util } from "@prismatic-io/spectral";
import { cleanArrayCodeInput } from "../util";
import {
  accountNumber,
  additionalFields,
  connection,
  deviceId,
  filters,
  max,
  mfaId,
  nested,
  routingNumber,
  sort,
  start,
  vendorId,
} from "./shared";

const listVendorComments =
  " See [Bill.com API documentation](https://developer.bill.com/reference/listvendors) for more information.";

const listVendorBankAccountsComments =
  " See [Bill.com API documentation](https://developer.bill.com/v2/reference/ap-vendormgmt-listvendorbankaccount) for more information.";

const vendorAdditionalFields = {
  isActive: "string",
  shortName: "string",
  nameOnCheck: "string",
  accNumber: "string",
  taxId: "string",
  taxIdType: "string",
  track1099: true,
  address1: "string",
  address2: "string",
  address3: "string",
  address4: "string",
  addressCity: "string",
  addressState: "string",
  addressZip: "string",
  addressCountry: "string",
  fax: "string",
  phone: "string",
  paymentEmail: "string",
  paymentPhone: "string",
  description: "string",
  contactFirstName: "string",
  contactLastName: "string",
  accountType: "string",
  paymentTermId: "string",
  sendNotifications: true,
  externalBillPayIn12m: 0,
  since: 0,
  payDaysBefore: 0,
  enabledCombinePayments: true,
  billCurrency: "string",
  billSyncPref: "string",
  prefPmtMethod: "string",
  paymentPurpose: "string",
  bankCountry: "string",
  sendInviteForPrivateVendor: true,
  vendorVCardRemitEmail: "string",
  vendorVCardStatus: "string",
  orgVCardStatus: "string",
  prefRemitEmail: "string",
  remitEmail: "string",
  processorVCardStatus: "string",
  vStatusUpdateSource: "string",
  orgVCardOptOutCustReason: "string",
  enableFundedInvite: true,
  lastPaymentDate: "string",
  numberOfInvitesSent: 0,
  eligibleForEbills: true,
  acknowledgedEbillBanner: true,
  acknowledgedEbillError: true,
  eBillEnablementFailed: true,
  PaymentusMerchantId: "string",
  unmodifiedBillsCount: "string",
  setupAutoPayPrompt: true,
  autoSave: "string",
  creationSource: "string",
  PaymentusPmtType: "string",
  PaymentusAcctToken: "string",
  PaymentusAcctToken2: "string",
  PaymentusAcctToken3: "string",
  stpProcessor: "string",
  eBillEnabledStatus: "string",
};

const vendorBankAccountAdditionalFields = {
  isActive: "string",
  nameOnAcct: "string",
  usersId: "string",
  isSavings: true,
  isPersonalAcct: true,
  intlPaymentType: "string",
  paymentCurrency: "string",
  vendorBankData: "string",
  bankAddSource: "string",
  intlTemplateKey: "string",
  regulatory1: "string",
  regulatory2: "string",
  regulatory3: "string",
  regulatory4: "string",
  regulatory5: "string",
  regulatory6: "string",
  regulatory7: "string",
};

const name = input({
  label: "Vendor Name",
  type: "string",
  example: "Example Vendor",
  placeholder: "Enter vendor name",
  required: true,
  comments: "Unique vendor name.",
  clean: util.types.toString,
});

const companyName = input({
  label: "Company Name",
  type: "string",
  example: "Example Company",
  placeholder: "Enter company name",
  required: true,
  comments: "Vendor organization full name.",
  clean: util.types.toString,
});

const email = input({
  label: "Email",
  type: "string",
  example: "example@email.com",
  placeholder: "Enter email address",
  required: true,
  comments: "Vendor email address.",
  clean: util.types.toString,
});

export const createVendorInputs = {
  connection,
  name,
  companyName,
  email,
  additionalFields: input({
    ...additionalFields,
    example: JSON.stringify(vendorAdditionalFields, null, 2),
    comments: `${additionalFields.comments} See https://developer.bill.com/reference/createvendor for more information.`,
  }),
};

const vendorCreateBulk = input({
  label: "Vendors to Create",
  type: "code",
  language: "json",
  comments:
    "An array of vendor objects to create. See [Bill.com API documentation](https://developer.bill.com/v2/reference/ap-vendormgmt-bulkcreatevendor) for more information.",
  required: true,
  example: JSON.stringify(
    [
      {
        obj: {
          entity: "Vendor",
          isActive: "string",
          name: "string",
          shortName: "string",
          nameOnCheck: "string",
          companyName: "string",
          accNumber: "string",
          taxId: "string",
          taxIdType: "string",
          track1099: true,
          address1: "string",
          address2: "string",
          address3: "string",
          address4: "string",
          addressCity: "string",
          addressState: "string",
          addressZip: "string",
          addressCountry: "string",
          email: "string",
          fax: "string",
          phone: "string",
          paymentEmail: "string",
          paymentPhone: "string",
          description: "string",
          contactFirstName: "string",
          contactLastName: "string",
          accountType: "string",
          paymentTermId: "string",
          sendNotifications: true,
          externalBillPayIn12m: 0,
          since: 0,
          payDaysBefore: 0,
          enabledCombinePayments: true,
          billCurrency: "string",
          billSyncPref: "string",
          prefPmtMethod: "string",
          paymentPurpose: "string",
          bankCountry: "string",
          sendInviteForPrivateVendor: true,
          vendorVCardRemitEmail: "string",
          vendorVCardStatus: "string",
          orgVCardStatus: "string",
          prefRemitEmail: "string",
          remitEmail: "string",
          processorVCardStatus: "string",
          vStatusUpdateSource: "string",
          orgVCardOptOutCustReason: "string",
          enableFundedInvite: true,
          lastPaymentDate: "string",
          numberOfInvitesSent: 0,
          eligibleForEbills: true,
          acknowledgedEbillBanner: true,
          acknowledgedEbillError: true,
          eBillEnablementFailed: true,
          PaymentusMerchantId: "string",
          unmodifiedBillsCount: "string",
          setupAutoPayPrompt: true,
          autoSave: "string",
          creationSource: "string",
          PaymentusPmtType: "string",
          PaymentusAcctToken: "string",
          PaymentusAcctToken2: "string",
          PaymentusAcctToken3: "string",
          stpProcessor: "string",
          eBillEnabledStatus: "string",
        },
      },
    ],
    null,
    2,
  ),
  clean: (value: unknown) => cleanArrayCodeInput(value, "Vendors to Create"),
});

export const bulkCreateVendorInputs = {
  connection,
  vendorCreateBulk,
};

export const getVendorInputs = {
  connection,
  vendorId,
};

export const listVendorsInputs = {
  connection,
  start,
  max,
  sort: input({ ...sort, comments: `${sort.comments}${listVendorComments}` }),
  filters: input({
    ...filters,
    comments: `${filters.comments}${listVendorComments}`,
  }),
  nested,
};

export const updateVendorInputs = {
  connection,
  vendorId,
  name,
  additionalFields: input({
    ...additionalFields,
    example: JSON.stringify(vendorAdditionalFields, null, 2),
    comments: `${additionalFields.comments} See https://developer.bill.com/reference/updatevendor for more information.`,
  }),
};

const vendorUpdateBulk = input({
  label: "Vendors to Update",
  type: "code",
  language: "json",
  comments:
    "An array of vendor objects to update. See [Bill.com API documentation](https://developer.bill.com/v2/reference/ap-vendormgmt-bulkupdatevendor) for more information.",
  required: true,
  example: JSON.stringify(
    [
      {
        obj: {
          id: "009...",
          entity: "Vendor",
          isActive: "string",
          name: "string",
          shortName: "string",
          nameOnCheck: "string",
          companyName: "string",
          accNumber: "string",
          taxId: "string",
          taxIdType: "string",
          track1099: true,
          address1: "string",
          address2: "string",
          address3: "string",
          address4: "string",
          addressCity: "string",
          addressState: "string",
          addressZip: "string",
          addressCountry: "string",
          email: "string",
          fax: "string",
          phone: "string",
          paymentEmail: "string",
          paymentPhone: "string",
          description: "string",
          contactFirstName: "string",
          contactLastName: "string",
          accountType: "string",
          paymentTermId: "string",
          sendNotifications: true,
          externalBillPayIn12m: 0,
          since: 0,
          payDaysBefore: 0,
          enabledCombinePayments: true,
          billCurrency: "string",
          billSyncPref: "string",
          prefPmtMethod: "string",
          paymentPurpose: "string",
          bankCountry: "string",
          sendInviteForPrivateVendor: true,
          vendorVCardRemitEmail: "string",
          vendorVCardStatus: "string",
          orgVCardStatus: "string",
          prefRemitEmail: "string",
          remitEmail: "string",
          processorVCardStatus: "string",
          vStatusUpdateSource: "string",
          orgVCardOptOutCustReason: "string",
          enableFundedInvite: true,
          lastPaymentDate: "string",
          numberOfInvitesSent: 0,
          eligibleForEbills: true,
          acknowledgedEbillBanner: true,
          acknowledgedEbillError: true,
          eBillEnablementFailed: true,
          PaymentusMerchantId: "string",
          unmodifiedBillsCount: "string",
          setupAutoPayPrompt: true,
          autoSave: "string",
          creationSource: "string",
          PaymentusPmtType: "string",
          PaymentusAcctToken: "string",
          PaymentusAcctToken2: "string",
          PaymentusAcctToken3: "string",
          stpProcessor: "string",
          eBillEnabledStatus: "string",
        },
      },
    ],
    null,
    2,
  ),
  clean: (value: unknown) => cleanArrayCodeInput(value, "Vendors to Update"),
});

export const bulkUpdateVendorsInputs = {
  connection,
  vendorUpdateBulk,
};

export const deleteVendorInputs = {
  connection,
  vendorId,
};

export const createVendorBankAccountInputs = {
  connection,
  mfaId,
  deviceId,
  vendorId,
  accountNumber: input({
    ...accountNumber,
    comments: "The vendor bank account number.",
  }),
  routingNumber: input({
    ...routingNumber,
    comments: "The vendor bank routing number.",
  }),
  additionalFields: input({
    ...additionalFields,
    example: JSON.stringify(vendorBankAccountAdditionalFields, null, 2),
    comments: `${additionalFields.comments} See https://developer.bill.com/reference/createvendorbankaccount for more information.`,
  }),
};

const vendorBankAccountCreateBulk = input({
  label: "Vendor Bank Accounts to Create",
  type: "code",
  language: "json",
  comments:
    "An array of vendor bank account objects to create. See [Bill.com API documentation](https://developer.bill.com/v2/reference/ap-vendormgmt-bulkcreatevendorbankaccount) for more information.",
  required: true,
  example: JSON.stringify(
    [
      {
        obj: {
          entity: "VendorBankAccount",
          isActive: "string",
          vendorId: "string",
          nameOnAcct: "string",
          accountNumber: "string",
          routingNumber: "string",
          usersId: "string",
          isSavings: true,
          isPersonalAcct: true,
          intlPaymentType: "string",
          paymentCurrency: "string",
          vendorBankData: "string",
          bankAddSource: "string",
          intlTemplateKey: "string",
          regulatory1: "string",
          regulatory2: "string",
          regulatory3: "string",
          regulatory4: "string",
          regulatory5: "string",
          regulatory6: "string",
          regulatory7: "string",
        },
      },
    ],
    null,
    2,
  ),
  clean: (value: unknown) =>
    cleanArrayCodeInput(value, "Vendor Bank Accounts to Create"),
});

export const bulkCreateVendorBankAccountsInputs = {
  connection,
  mfaId,
  deviceId,
  vendorBankAccountCreateBulk,
};

const vendorBankAccountId = input({
  label: "Vendor Bank Account ID",
  type: "string",
  example: "vba...",
  placeholder: "Enter vendor bank account ID",
  required: true,
  comments: "ID of the vendor bank account.",
  clean: util.types.toString,
});

export const getVendorBankAccountInputs = {
  connection,
  vendorBankAccountId,
};

export const listVendorBankAccountsInputs = {
  connection,
  start,
  max,
  sort: input({
    ...sort,
    comments: `${sort.comments}${listVendorBankAccountsComments}`,
  }),
  filters: input({
    ...filters,
    comments: `${filters.comments}${listVendorBankAccountsComments}`,
  }),
  nested,
};

export const deleteVendorBankAccountInputs = {
  connection,
  mfaId,
  deviceId,
  vendorBankAccountId,
};
