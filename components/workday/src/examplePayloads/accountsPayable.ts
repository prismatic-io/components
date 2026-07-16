export const listSupplierInvoiceRequestsExamplePayload = {
  data: {
    data: [
      {
        invoiceDate: "2024-06-08T07:00:00.000Z",
        statutoryInvoiceType: {
          id: "3aa5550b7fe348b98d7b5741afc65534",
          descriptor: "Standard Invoice",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/statutoryInvoiceTypes/3aa5550b7fe348b98d7b5741afc65534",
        },
        referenceNumber: "REF-0001",
        taxAmount: "112.50",
        handlingCode: {
          id: "0e44c92412d34b01ace61e80a47aaf6d",
          descriptor: "Standard Handling",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/handlingCodes/0e44c92412d34b01ace61e80a47aaf6d",
        },
        status: {
          id: "cc67c47133894e099a5f1c0aa88efc47",
          descriptor: "Approved",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/statuses/cc67c47133894e099a5f1c0aa88efc47",
        },
        dueDate: "2024-06-08T07:00:00.000Z",
        remitToConnection: {
          id: "51c4a636bcbc4331b921a1e37b18f6f0",
          descriptor: "Acme Supplies Remit To",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/remitToConnections/51c4a636bcbc4331b921a1e37b18f6f0",
        },
        paymentTerms: {
          id: "9541750bc8964e529feb5c6d7bb3d0e4",
          descriptor: "Net 30",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/paymentTerms/9541750bc8964e529feb5c6d7bb3d0e4",
        },
        controlTotalAmount: "1250.00",
        memo: "Monthly office supplies",
        currency: {
          currencyID: "USD",
          descriptor: "USD",
        },
        suppliersInvoiceNumber: "INV-0001234",
        freightAmount: "45.00",
        shipToAddress: {
          id: "1f2e3d4c5b6a7988990a1b2c3d4e5f60",
          descriptor: "1150 Bayhill Drive, San Bruno, CA 94066",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/addresses/1f2e3d4c5b6a7988990a1b2c3d4e5f60",
        },
        referenceType: {
          id: "a1b2c3d4e5f60718293a4b5c6d7e8f90",
          descriptor: "Supplier Invoice",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/referenceTypes/a1b2c3d4e5f60718293a4b5c6d7e8f90",
        },
        requestNumber: "REF-0001",
        invoiceReceivedDate: "2024-06-08T07:00:00.000Z",
        requester: {
          id: "7c6b5a4938271605f4e3d2c1b0a99887",
          descriptor: "Logan McNeil",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/workers/7c6b5a4938271605f4e3d2c1b0a99887",
        },
        supplier: {
          id: "b2c3d4e5f6071829a3b4c5d6e7f80912",
          descriptor: "Acme Supplies, Inc.",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/suppliers/b2c3d4e5f6071829a3b4c5d6e7f80912",
        },
        company: {
          id: "c3d4e5f6071829a3b4c5d6e7f8091223",
          descriptor: "Global Modern Services, Inc. (USA)",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/companies/c3d4e5f6071829a3b4c5d6e7f8091223",
        },
        descriptor: "Supplier Invoice Request INV-0001234",
        id: "d4e5f6071829a3b4c5d6e7f809122334",
      },
    ],
    total: 1,
  },
};
export const postSupplierInvoiceRequestsExamplePayload = {
  data: {
    currency: {
      id: "e5f6071829a3b4c5d6e7f80912233445",
      descriptor: "USD",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/currencies/e5f6071829a3b4c5d6e7f80912233445",
    },
    company: {
      id: "f6071829a3b4c5d6e7f809122334455f",
      descriptor: "Global Modern Services, Inc. (USA)",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/companies/f6071829a3b4c5d6e7f809122334455f",
    },
    taxAmount: "112.50",
    requester: {
      id: "071829a3b4c5d6e7f809122334455f60",
      descriptor: "Betty Liu",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/workers/071829a3b4c5d6e7f809122334455f60",
    },
    controlTotalAmount: "1250.00",
    paymentTerms: {
      id: "1829a3b4c5d6e7f809122334455f6071",
      descriptor: "Net 30",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/paymentTerms/1829a3b4c5d6e7f809122334455f6071",
    },
    referenceType: {
      id: "29a3b4c5d6e7f809122334455f607182",
      descriptor: "Supplier Invoice",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/referenceTypes/29a3b4c5d6e7f809122334455f607182",
    },
    lines: [
      {
        unitCost: "125.00",
        internalMemo: "Monthly office supplies",
        worktags: [
          {
            id: "a3b4c5d6e7f809122334455f60718293",
            descriptor: "Cost Center: Field Sales",
          },
        ],
        itemDescription: "Office paper, case of 10 reams",
        splits: [
          {
            percent: "100",
            billable: true,
            memo: "Monthly office supplies",
            quantity: "8",
            amount: "1000.00",
            worktags: [
              {
                id: "b4c5d6e7f809122334455f6071829304",
                descriptor: "Cost Center: Field Sales",
              },
            ],
            id: "c5d6e7f809122334455f607182930415",
            descriptor: "Split 1",
          },
        ],
        order: "Office supplies order",
        billable: true,
        splitBy: {
          id: "d6e7f809122334455f60718293041526",
          descriptor: "Quantity",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/splitBys/d6e7f809122334455f60718293041526",
        },
        quantity: "8",
        extendedAmount: "1000.00",
        spendCategory: {
          id: "e7f809122334455f6071829304152637",
          descriptor: "Office Supplies",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/spendCategories/e7f809122334455f6071829304152637",
        },
        unitOfMeasure: {
          id: "f809122334455f607182930415263748",
          descriptor: "Each",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/unitsOfMeasure/f809122334455f607182930415263748",
        },
        memo: "Monthly office supplies",
        serviceLine: true,
        item: {
          id: "09122334455f60718293041526374859",
          descriptor: "Office Paper",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/items/09122334455f60718293041526374859",
        },
        id: "122334455f6071829304152637485960",
        descriptor: "Line 1",
      },
    ],
    statutoryInvoiceType: {
      id: "2334455f607182930415263748596071",
      descriptor: "Standard Invoice",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/statutoryInvoiceTypes/2334455f607182930415263748596071",
    },
    suppliersInvoiceNumber: "INV-0001234",
    referenceNumber: "REF-0001",
    invoiceReceivedDate: "2024-06-08T07:00:00.000Z",
    freightAmount: "45.00",
    supplier: {
      id: "34455f6071829304152637485960718293",
      descriptor: "Acme Supplies, Inc.",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/suppliers/34455f6071829304152637485960718293",
    },
    handlingCode: {
      id: "455f607182930415263748596071829a",
      descriptor: "Standard Handling",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/handlingCodes/455f607182930415263748596071829a",
    },
    shipToAddress: {
      id: "55f607182930415263748596071829ab",
      descriptor: "1150 Bayhill Drive, San Bruno, CA 94066",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/addresses/55f607182930415263748596071829ab",
    },
    invoiceDate: "2024-06-08T07:00:00.000Z",
    memo: "Monthly office supplies",
    remitToConnection: {
      id: "5f607182930415263748596071829abc",
      descriptor: "Acme Supplies Remit To",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/remitToConnections/5f607182930415263748596071829abc",
    },
    id: "f607182930415263748596071829abcd",
    descriptor: "Supplier Invoice Request INV-0001234",
  },
};
export const getSupplierInvoiceRequestsByIdExamplePayload = {
  data: {
    invoiceDate: "2024-06-08T07:00:00.000Z",
    statutoryInvoiceType: {
      id: "607182930415263748596071829abcde",
      descriptor: "Standard Invoice",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/statutoryInvoiceTypes/607182930415263748596071829abcde",
    },
    referenceNumber: "REF-0001",
    taxAmount: "112.50",
    handlingCode: {
      id: "07182930415263748596071829abcdef",
      descriptor: "Standard Handling",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/handlingCodes/07182930415263748596071829abcdef",
    },
    status: {
      id: "7182930415263748596071829abcdef0",
      descriptor: "In Progress",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/statuses/7182930415263748596071829abcdef0",
    },
    dueDate: "2024-06-08T07:00:00.000Z",
    remitToConnection: {
      id: "182930415263748596071829abcdef01",
      descriptor: "Acme Supplies Remit To",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/remitToConnections/182930415263748596071829abcdef01",
    },
    paymentTerms: {
      id: "82930415263748596071829abcdef012",
      descriptor: "Net 30",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/paymentTerms/82930415263748596071829abcdef012",
    },
    controlTotalAmount: "1250.00",
    memo: "Monthly office supplies",
    currency: {
      currencyID: "USD",
      descriptor: "USD",
    },
    suppliersInvoiceNumber: "INV-0001234",
    freightAmount: "45.00",
    shipToAddress: {
      id: "2930415263748596071829abcdef0123",
      descriptor: "1150 Bayhill Drive, San Bruno, CA 94066",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/addresses/2930415263748596071829abcdef0123",
    },
    referenceType: {
      id: "930415263748596071829abcdef01234",
      descriptor: "Supplier Invoice",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/referenceTypes/930415263748596071829abcdef01234",
    },
    requestNumber: "REF-0001",
    invoiceReceivedDate: "2024-06-08T07:00:00.000Z",
    requester: {
      id: "30415263748596071829abcdef012345",
      descriptor: "Steve Morgan",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/workers/30415263748596071829abcdef012345",
    },
    supplier: {
      id: "0415263748596071829abcdef0123456",
      descriptor: "Acme Supplies, Inc.",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/suppliers/0415263748596071829abcdef0123456",
    },
    company: {
      id: "415263748596071829abcdef01234567",
      descriptor: "Global Modern Services, Inc. (USA)",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/companies/415263748596071829abcdef01234567",
    },
    descriptor: "Supplier Invoice Request INV-0001234",
    id: "15263748596071829abcdef012345678",
  },
};
export const getSupplierInvoiceRequestAttachmentsExamplePayload = {
  data: {
    data: [
      {
        fileExtension: "pdf",
        fileLength: "20480",
        fileName: "invoice-2024-06.pdf",
        id: "5263748596071829abcdef0123456789",
        descriptor: "invoice-2024-06.pdf",
      },
    ],
    total: 1,
  },
};
export const postSupplierInvoiceRequestsAttachmentsExamplePayload = {
  data: {
    fileLength: "20480",
    contentType: {
      id: "263748596071829abcdef0123456789a",
      descriptor: "application/pdf",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/contentTypes/263748596071829abcdef0123456789a",
    },
    fileName: "invoice-2024-06.pdf",
    descriptor: "invoice-2024-06.pdf",
    id: "63748596071829abcdef0123456789ab",
  },
};
export const submitSupplierInvoiceRequestExamplePayload = {
  data: {
    id: "3748596071829abcdef0123456789abc",
    descriptor: "Supplier Invoice Request INV-0001234",
  },
};
