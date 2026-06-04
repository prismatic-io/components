















import type { PayloadData } from "./interfaces/PayloadData";


export const getCustomerExamplePayload: PayloadData = {
  data: {
    entity: "Customer",
    id: "0cu02EAQUAPCBNTDsmzc",
    isActive: "1",
    createdTime: "2024-07-29T20:30:30.000+0000",
    updatedTime: "2024-07-30T19:14:48.000+0000",
    name: "John",
    shortName: null,
    parentCustomerId: "00000000000000000000",
    companyName: "A Company",
    contactFirstName: "John",
    contactLastName: "Doe",
    accNumber: null,
    billAddress1: null,
    billAddress2: null,
    billAddress3: null,
    billAddress4: null,
    billAddressCity: null,
    billAddressState: null,
    billAddressCountry: null,
    billAddressZip: null,
    shipAddress1: null,
    shipAddress2: null,
    shipAddress3: null,
    shipAddress4: null,
    shipAddressCity: null,
    shipAddressState: null,
    shipAddressCountry: null,
    shipAddressZip: null,
    email: null,
    phone: null,
    altPhone: null,
    fax: null,
    description: null,
    invoiceCurrency: null,
    printAs: null,
    mergedIntoId: "00000000000000000000",
    hasAuthorizedToCharge: false,
    accountType: "0",
    paymentTermId: "00000000000000000000",
    balance: 0,
    availCredit: 0,
    taxId: null,
    hasBankAccount: false,
    hasNetBankAccount: false,
    hasBankAccountAutoPay: false,
    hasCreditCard: false,
    hasCreditCardAutoPay: false,
    defaultDeliveryMethod: null,
    isAutoChargeDismissed: false,
    isTaxLiable: false,
    creationSource: "0",
    enabledInvoiceFinancing: false,
    hasCustomerCard: false,
    enabledAutoInvoiceFinancing: false,
  },
};
export const bulkCreateCustomersExamplePayload: PayloadData = {
  data: {
    bulk: [
      {
        response_status: 0,
        response_message: "Success",
        response_data: getCustomerExamplePayload.data,
      },
    ],
  },
};

export const bulkUpdateCustomersExamplePayload =
  bulkCreateCustomersExamplePayload;

export const createVendorExamplePayload: PayloadData = {
  data: {
    entity: "Vendor",
    id: "00902YSABCAKZHY25m0r",
    isActive: "1",
    name: "Acme Vendor",
    shortName: null,
    nameOnCheck: "Acme Vendor",
    companyName: "Acme",
    accNumber: null,
    taxId: null,
    taxIdType: null,
    track1099: false,
    address1: null,
    address2: null,
    address3: null,
    address4: null,
    addressCity: null,
    addressState: null,
    addressZip: null,
    addressCountry: null,
    email: "example@email.com",
    fax: null,
    phone: null,
    payBy: "0",
    paymentEmail: null,
    paymentPhone: null,
    description: null,
    createdTime: "2024-07-30T19:31:00.000+0000",
    updatedTime: "2024-07-30T19:31:00.000+0000",
    contactFirstName: null,
    contactLastName: null,
    mergedIntoId: "00000000000000000000",
    accountType: "0",
    paymentTermId: "00000000000000000000",
    sendNotifications: true,
    balance: 0,
    availCredit: 0,
    lastBalanceUpdate: null,
    externalBillPayIn12m: null,
    since: null,
    payDaysBefore: null,
    enabledCombinePayments: true,
    hasBankAccountAutoPay: false,
    hasRecurringPayments: false,
    billCurrency: "USD",
    billSyncPref: "0",
    paymentCurrency: null,
    prefPmtMethod: "1",
    paymentPurpose: null,
    bankCountry: null,
    vendorBankAccountStatus: -1,
    sendInviteForPrivateVendor: true,
    vendorVCardRemitEmail: null,
    vendorVCardStatus: "-1",
    orgVCardStatus: "1",
    prefRemitEmail: "0",
    remitEmail: null,
    processorVCardStatus: null,
    vStatusUpdateSource: null,
    allowConnectedVendorEditAddress: false,
    informConnectedVendorAddressSyncModified: false,
    intlPaymentType: "0",
    vcardEnrollDate: null,
    vcardDeclineDate: null,
    isAccountNumberRequired: false,
    largeBillerId: "00000000000000000000",
    orgVCardOptOutCustReason: null,
    enableFundedInvite: false,
    lastPaymentDate: null,
    numberOfInvitesSent: 0,
    eligibleForEbills: false,
    acknowledgedEbillBanner: false,
    acknowledgedEbillError: false,
    eBillEnablementFailed: false,
    PaymentusMerchantId: null,
    unmodifiedBillsCount: 0,
    setupAutoPayPrompt: false,
    autoPayConflict: false,
    nameOnCheckRemediation: false,
    autoSave: null,
    autoSaveStatus: null,
    creationSource: "0",
    PaymentusPmtType: null,
    PaymentusAcctToken: null,
    PaymentusAcctToken2: null,
    PaymentusAcctToken3: null,
    stpProcessor: "0",
    eBillEnabledStatus: "0",
    orgVCardOptOutCustOther: null,
    networkStatus: null,
    vcardProcessor: "1",
    isAddressValidated: false,
    isSyncVendorCountryMapped: false,
    optedOutOfVCardByOrg: false,
    invalidCountryCurrencyAtNewVendorSync: false,
    acctBalance: 0,
    lastAcctBalanceUpdate: null,
    paymentEmails: null,
    eBillEligible: false,
    required: [],
  },
};

export const updateVendorExamplePayload = createVendorExamplePayload;

export const getVendorExamplePayload = createVendorExamplePayload;

export const deleteVendorExamplePayload = createVendorExamplePayload;

export const listVendorsExamplePayload = {
  data: [createVendorExamplePayload.data],
};

export const bulkCreateVendorExamplePayload: PayloadData = {
  data: {
    bulk: [
      {
        response_status: 0,
        response_message: "Success",
        response_data: createVendorExamplePayload.data,
      },
    ],
  },
};

export const bulkUpdateVendorsExamplePayload = bulkCreateVendorExamplePayload;

export const getVendorBankAccountExamplePayload: PayloadData = {
  data: {
    entity: "VendorBankAccount",
    id: "vba02BSNHVJVZPN17kxr",
    isActive: "1",
    createdTime: "2024-07-30T20:33:28.000+0000",
    updatedTime: "2024-07-30T20:33:28.000+0000",
    vendorId: "00902JIJYMCGEGI25m2l",
    nameOnAcct: "John Doe",
    accountNumber: "******7890",
    routingNumber: "021000021",
    usersId: "00602ZGNAZQYJBKLdrql",
    status: "1",
    isSavings: false,
    isPersonalAcct: false,
    intlEPaymentAcct: false,
    intlPaymentType: "0",
    paymentCurrency: null,
    bankCountry: null,
    vendorBankData: null,
    bankAddSource: "2",
    intlTemplateKey: null,
    regulatory1: null,
    regulatory2: null,
    regulatory3: null,
    regulatory4: null,
    regulatory5: null,
    regulatory6: null,
    regulatory7: null,
  },
};

export const listVendorBankAccountsExamplePayload = {
  data: [getVendorBankAccountExamplePayload.data],
};

export const createBillExamplePayload: PayloadData = {
  data: {
    entity: "Bill",
    id: "00n02XNWHOPPXWV9ewx0",
    isActive: "1",
    vendorId: "00902YSHZXAKZHY25m0r",
    invoiceNumber: "01",
    approvalStatus: "0",
    invoiceDate: "2024-07-01",
    dueDate: "2024-08-01",
    glPostingDate: "2024-07-01",
    amount: 1,
    localAmount: null,
    exchangeRate: null,
    scheduledAmount: 0,
    paidAmount: null,
    dueAmount: 1,
    creditAmount: 0,
    paymentStatus: "1",
    uiPaymentStatus: "1",
    description: null,
    poNumber: null,
    createdTime: "2024-07-30T23:00:32.000+0000",
    updatedTime: "2024-07-30T23:00:32.000+0000",
    createdBy: "00602ZGNAZQYJBKLdrql",
    payFromBankAccountId: "00000000000000000000",
    payFromChartOfAccountId: "00000000000000000000",
    paymentTermId: "00000000000000000000",
    hasAutoPay: false,
    eBillCreated: false,
    invoiceProductId: "00000000000000000000",
    chartOfAccountId: "00000000000000000000",
    departmentId: "00000000000000000000",
    locationId: "00000000000000000000",
    actgClassId: "00000000000000000000",
    source: "0",
    numApprPolicyEx: 0,
    useBillDesc: false,
    defaultInvoiceNumber: false,
    isAutoSaved: false,
    billTemplateId: "00000000000000000000",
    quickbooksId: null,
    lastPaymentDate: null,
    fullPaymentDate: null,
    hasLinkedPurchaseOrders: false,
    multipleBillLineItems: false,
    item: {
      count: 0,
      totalAmount: 0,
    },
    expense: {
      count: 1,
      totalAmount: 1,
      chartOfAccountGroup: [],
    },
    billLineItems: [
      {
        entity: "BillLineItem",
        id: "bli02VSXIUDVFUQd1e4s",
        billId: "00n02XNWHOPPXWV9ewx0",
        amount: 1,
        chartOfAccountId: "00000000000000000000",
        departmentId: "00000000000000000000",
        locationId: "00000000000000000000",
        jobId: "00000000000000000000",
        customerId: "00000000000000000000",
        jobBillable: false,
        description: null,
        createdTime: "2024-07-30T23:00:32.000+0000",
        updatedTime: "2024-07-30T23:00:32.000+0000",
        lineType: "1",
        itemId: "00000000000000000000",
        quantity: null,
        unitPrice: null,
        employeeId: "00000000000000000000",
        actgClassId: "00000000000000000000",
        purchaseOrderBillLinkId: "00000000000000000000",
        unitOfMeasureId: "00000000000000000000",
        lineOrder: 0,
      },
    ],
  },
};

export const updateBillExamplePayload = createBillExamplePayload;

export const deleteBillExamplePayload = createBillExamplePayload;

export const getBillExamplePayload = createBillExamplePayload;

export const listBillsExamplePayload = {
  data: [createBillExamplePayload.data],
};

export const bulkCreateBillsExamplePayload: PayloadData = {
  data: {
    bulk: [
      {
        response_status: 0,
        response_message: "Success",
        response_data: createBillExamplePayload.data,
      },
    ],
  },
};

export const bulkUpdateBillsExamplePayload = bulkCreateBillsExamplePayload;

export const createCustomerExamplePayload = getCustomerExamplePayload;

export const deleteCustomerExamplePayload = getCustomerExamplePayload;

export const getCustomerBankAccountExamplePayload: PayloadData = {
  data: {
    entity: "CustomerBankAccount",
    id: "cba02ILJVKOLFVLB6gqr",
    isActive: "1",
    createdTime: "2024-07-31T05:10:12.000+0000",
    updatedTime: "2024-07-31T05:17:36.000+0000",
    customerId: "0cu02BLGFCGXROGGsnpx",
    nameOnAccount: "Test",
    nickname: "Test",
    routingNumber: "011401533",
    accountNumber: "******7890",
    isLockedByOrg: false,
    isSavings: false,
    isPersonalAcct: false,
    isWrittenAuth: false,
    isPrivate: false,
    phone: null,
    cpUserId: "00000000000000000000",
    status: "1",
    rndDepExpireDate: "2024-08-13",
  },
};

export const listCustomerBankAccountsExamplePayload = {
  data: [getCustomerBankAccountExamplePayload.data],
};

export const listCustomerExamplePayload = {
  data: [getCustomerExamplePayload.data],
};

export const updateCustomerExamplePayload = getCustomerExamplePayload;

export const getInvoiceExamplePayload: PayloadData = {
  data: {
    entity: "Invoice",
    id: "00e02DTFJUMHHRGKh6zx",
    isActive: "1",
    createdBy: "00602ZGNAZQYJBKLdrql",
    createdTime: "2024-07-31T16:56:53.000+0000",
    updatedTime: "2024-07-31T20:27:48.000+0000",
    customerId: "0cu02BLGFCGXROGGsnpx",
    invoiceNumber: "001",
    invoiceDate: "2024-07-22",
    dueDate: "2024-09-08",
    glPostingDate: "2024-07-22",
    amount: 2199,
    localAmount: null,
    exchangeRate: null,
    amountDue: 2199,
    paymentStatus: "1",
    description: null,
    poNumber: null,
    isToBePrinted: false,
    isToBeEmailed: false,
    lastSentTime: null,
    itemSalesTax: "0ii02JKMRQWBGLFLadj8",
    salesTaxPercentage: 6,
    salesTaxTotal: 0,
    terms: "Due upon receipt",
    salesRep: null,
    FOB: null,
    shipDate: null,
    shipMethod: null,
    departmentId: "00000000000000000000",
    locationId: "00000000000000000000",
    actgClassId: "00000000000000000000",
    jobId: "00000000000000000000",
    payToBankAccountId: "00000000000000000000",
    payToChartOfAccountId: "00000000000000000000",
    invoiceTemplateId: "itm02EJBDDIGUVGSc8w1",
    hasAutoPay: false,
    source: "0",
    emailDeliveryOption: "1",
    mailDeliveryOption: "0",
    creditAmount: 0,
    quickbooksId: null,
    recInvoiceTemplateId: "00000000000000000000",
    financingStatus: "0",
    netBillId: "00000000000000000000",
    netOrgId: "00000000000000000000",
    scheduledAmount: 0,
    stylingId: null,
    stylingRevision: null,
    financingModelStatus: null,
    financingErrorType: "0",
    invoiceLineItems: [
      {
        entity: "InvoiceLineItem",
        id: "00f02QSSEGYTPEZDeik8",
        createdTime: "2024-07-31T20:27:48.000+0000",
        updatedTime: "2024-07-31T20:27:48.000+0000",
        invoiceId: "00e02DTFJUMHHRGKh6zx",
        itemId: "0ii02CTRVHZJQMRWad60",
        quantity: 1,
        amount: 12,
        price: 12,
        serviceDate: null,
        ratePercent: null,
        chartOfAccountId: "00000000000000000000",
        departmentId: "00000000000000000000",
        locationId: "00000000000000000000",
        actgClassId: "00000000000000000000",
        jobId: "00000000000000000000",
        description: null,
        taxable: false,
        taxCode: "Non",
        lineOrder: 0,
      },
    ],
    invoiceAdjustments: [],
    invoiceCustomFields: [],
  },
};

export const updateInvoiceExamplePayload = getInvoiceExamplePayload;

export const createInvoiceExamplePayload = getInvoiceExamplePayload;

export const deleteInvoiceExamplePayload = getInvoiceExamplePayload;

export const listInvoicesExamplePayload = {
  data: [getInvoiceExamplePayload.data],
};

export const bulkCreateInvoicesExamplePayload: PayloadData = {
  data: {
    bulk: [
      {
        response_status: 0,
        response_message: "Success",
        response_data: getInvoiceExamplePayload.data,
      },
    ],
  },
};

export const bulkUpdateInvoicesExamplePayload =
  bulkCreateInvoicesExamplePayload;

export const generateMfaChallengeIdExamplePayload: PayloadData = {
  data: {
    challengeId: "!b-KXe8pBDp1vFgjczl...",
    sessionId: "!b2XqzA2v6u5T49jY5...",
  },
};

export const mfaAuthenticateExamplePayload: PayloadData = {
  data: {
    machineName: "Acme Instance",
    mfaId: "!b_EJCd_jPIsZYT5bxk9QG2oXP2TvQwGjeSzWFeZt-wy9gi03A2U8Uvj_cZDhCDBde",
    deviceId: "Acme-BillMFA",
  },
};

export const createVendorBankAccountExamplePayload: PayloadData = {
  data: {
    entity: "VendorBankAccount",
    id: "vba02JBPYKSEAMI17lre",
    isActive: "1",
    createdTime: "2024-07-31T23:32:48.000+0000",
    updatedTime: "2024-07-31T23:32:49.000+0000",
    vendorId: "00902GLBJSUATNY25m0s",
    nameOnAcct: null,
    accountNumber: "******7890",
    routingNumber: "021000021",
    usersId: "00602ZGNAZQYJBKLdrql",
    status: "1",
    isSavings: false,
    isPersonalAcct: false,
    intlEPaymentAcct: false,
    intlPaymentType: "0",
    paymentCurrency: null,
    bankCountry: null,
    vendorBankData: null,
    bankAddSource: "1",
    intlTemplateKey: null,
    regulatory1: null,
    regulatory2: null,
    regulatory3: null,
    regulatory4: null,
    regulatory5: null,
    regulatory6: null,
    regulatory7: null,
  },
};

export const deleteVendorBankAccountExamplePayload =
  createVendorBankAccountExamplePayload;

export const bulkCreateVendorBankAccountsExamplePayload: PayloadData = {
  data: {
    bulk: [
      {
        response_status: 0,
        response_message: "Success",
        response_data: getVendorBankAccountExamplePayload.data,
      },
    ],
  },
};

export const createCustomerBankAccountExamplePayload =
  getCustomerBankAccountExamplePayload;
