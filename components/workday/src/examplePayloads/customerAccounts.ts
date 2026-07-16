export const listInvoicesExamplePayload = {
  data: {
    data: [
      {
        invoiceDate: "2024-06-08T07:00:00.000Z",
        transactionType: "Invoice",
        withholdingAmount: "0.00",
        company: {
          id: "3aa5550b7fe348b98d7b5741afc65534",
          descriptor: "Global Modern Services, Inc. (USA)",
        },
        billToCustomer: {
          id: "0e44c92412d34b01ace61e80a47aaf6d",
          descriptor: "Acme Corporation",
        },
        inCollection: true,
        netAmount: "1250.00",
        disputeAmount: "0.00",
        dueAmount: "1250.00",
        invoiceType: {
          descriptor: "Invoice",
        },
        poNumber: "PO-0005678",
        relatedAdjustments: [
          {
            id: "cc67c47133894e099a5f1c0aa88efc47",
            href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/adjustments/cc67c47133894e099a5f1c0aa88efc47",
            descriptor: "Invoice Adjustment",
          },
        ],
        taxAmount: "112.50",
        adjustmentReason: {
          descriptor: "Personal",
        },
        disputeDate: "2024-06-08T07:00:00.000Z",
        paymentStatus: {
          id: "51c4a636bcbc4331b921a1e37b18f6f0",
          descriptor: "Approved",
        },
        relatedInvoice: {
          id: "9541750bc8964e529feb5c6d7bb3d0e4",
          descriptor: "Customer Invoice",
          href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/invoices/9541750bc8964e529feb5c6d7bb3d0e4",
        },
        currency: {
          descriptor: "USD",
        },
        dueDate: "2024-06-08T07:00:00.000Z",
        memo: "Monthly office supplies",
        inDispute: true,
        billToCustomerAddress: {
          regionSubdivision1: "CA",
          countryRegion: {
            descriptor: "United States of America",
          },
          addressLine3: "Building A",
          citySubdivision1: "San Bruno",
          addressLine1: "1150 Bayhill Drive",
          addressLine4: "Floor 3",
          city: "San Bruno",
          citySubdivision2: "San Mateo County",
          country: {
            descriptor: "United States of America",
          },
          addressLine2: "Suite 100",
          regionSubdivision2: "CA",
          postalCode: "94066",
          id: "1f2e3d4c5b6a7988990a1b2c3d4e5f60",
          descriptor: "1150 Bayhill Drive, San Bruno, CA 94066",
        },
        disputeReasons: [
          {
            descriptor: "Personal",
          },
        ],
        invoiceStatus: {
          descriptor: "Approved",
          id: "a1b2c3d4e5f60718293a4b5c6d7e8f90",
        },
        retentionAmount: "0.00",
        totalAmount: "1362.50",
        invoiceNumber: "INV-0001234",
        descriptor: "Customer Invoice INV-0001234",
        id: "7c6b5a4938271605f4e3d2c1b0a99887",
        href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/invoices/7c6b5a4938271605f4e3d2c1b0a99887",
      },
    ],
    total: 1,
  },
};
export const getInvoiceByIdExamplePayload = {
  data: {
    invoiceDate: "2024-06-08T07:00:00.000Z",
    transactionType: "Invoice",
    withholdingAmount: "0.00",
    company: {
      id: "3aa5550b7fe348b98d7b5741afc65599",
      descriptor: "Global Modern Services, Inc. (USA)",
    },
    billToCustomer: {
      id: "0e44c92412d34b01ace61e80a47aaf6e",
      descriptor: "Acme Corporation",
    },
    inCollection: true,
    netAmount: "1250.00",
    disputeAmount: "0.00",
    dueAmount: "1250.00",
    invoiceType: {
      descriptor: "Invoice",
    },
    poNumber: "PO-0005678",
    relatedAdjustments: [
      {
        id: "cc67c47133894e099a5f1c0aa88efc48",
        href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/adjustments/cc67c47133894e099a5f1c0aa88efc48",
        descriptor: "Invoice Adjustment",
      },
    ],
    taxAmount: "112.50",
    adjustmentReason: {
      descriptor: "Personal",
    },
    disputeDate: "2024-06-08T07:00:00.000Z",
    paymentStatus: {
      id: "51c4a636bcbc4331b921a1e37b18f6f1",
      descriptor: "Approved",
    },
    relatedInvoice: {
      id: "9541750bc8964e529feb5c6d7bb3d0e5",
      descriptor: "Customer Invoice",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/invoices/9541750bc8964e529feb5c6d7bb3d0e5",
    },
    currency: {
      descriptor: "USD",
    },
    dueDate: "2024-06-08T07:00:00.000Z",
    memo: "Monthly office supplies",
    inDispute: true,
    billToCustomerAddress: {
      regionSubdivision1: "CA",
      countryRegion: {
        descriptor: "United States of America",
      },
      addressLine3: "Building A",
      citySubdivision1: "San Bruno",
      addressLine1: "1150 Bayhill Drive",
      addressLine4: "Floor 3",
      city: "San Bruno",
      citySubdivision2: "San Mateo County",
      country: {
        descriptor: "United States of America",
      },
      addressLine2: "Suite 100",
      regionSubdivision2: "CA",
      postalCode: "94066",
      id: "1f2e3d4c5b6a7988990a1b2c3d4e5f61",
      descriptor: "1150 Bayhill Drive, San Bruno, CA 94066",
    },
    disputeReasons: [
      {
        descriptor: "Personal",
      },
    ],
    invoiceStatus: {
      descriptor: "Approved",
      id: "a1b2c3d4e5f60718293a4b5c6d7e8f91",
    },
    retentionAmount: "0.00",
    totalAmount: "1362.50",
    invoiceNumber: "INV-0001234",
    descriptor: "Customer Invoice INV-0001234",
    id: "7c6b5a4938271605f4e3d2c1b0a99888",
    href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/invoices/7c6b5a4938271605f4e3d2c1b0a99888",
  },
};
export const getInvoicePdfExamplePayload = { data: "PDF DATA" };
export const postPaymentExamplePayload = {
  data: {
    memo: "Monthly office supplies",
    remitFromCustomer: {
      id: "b2c3d4e5f6a708192a3b4c5d6e7f8091",
      descriptor: "Acme Corporation",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/customers/b2c3d4e5f6a708192a3b4c5d6e7f8091",
    },
    readyToAutoApply: true,
    transactionNumber: "REF-0001",
    reference: "REF-0001",
    amount: "1250.00",
    type: {
      id: "c3d4e5f6a708192a3b4c5d6e7f809112",
      descriptor: "Payment",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/types/c3d4e5f6a708192a3b4c5d6e7f809112",
    },
    date: "2024-06-08T07:00:00.000Z",
    company: {
      id: "d4e5f6a708192a3b4c5d6e7f80911223",
      descriptor: "Global Modern Services, Inc. (USA)",
      href: "https://wd2-impl-services1.workday.com/ccx/api/v1/gms/companies/d4e5f6a708192a3b4c5d6e7f80911223",
    },
    descriptor: "Customer Payment",
    id: "e5f6a708192a3b4c5d6e7f8091122334",
  },
};
export const getPaymentByIdExamplePayload = {
  data: {
    descriptor: "Customer Payment",
    id: "f6a708192a3b4c5d6e7f809112233445",
  },
};
