




export const batchRequestPayload = {
  data: {
    BatchItemResponse: [
      {
        Fault: {
          type: "ValidationFault",
          Error: [
            {
              Message: "Stale Object Error",
              code: "5010",
              Detail:
                "Stale Object Error : You and root were working on this at the same time. root finished before you did, so your work was not saved.",
              element: "",
            },
          ],
        },
        bId: "bid1",
      },
      {
        bId: "bid2",
        QueryResponse: {
          SalesReceipt: [
            {
              TxnDate: "2015-08-25",
              domain: "QBO",
              CurrencyRef: {
                name: "United States Dollar",
                value: "USD",
              },
              PrintStatus: "NotSet",
              PaymentRefNum: "10264",
              TotalAmt: 337.5,
              Line: [
                {
                  Description: "Custom Design",
                  DetailType: "SalesItemLineDetail",
                  SalesItemLineDetail: {
                    TaxCodeRef: {
                      value: "NON",
                    },
                    Qty: 4.5,
                    UnitPrice: 75,
                    ItemRef: {
                      name: "Design",
                      value: "4",
                    },
                  },
                  LineNum: 1,
                  Amount: 337.5,
                  Id: "1",
                },
                {
                  DetailType: "SubTotalLineDetail",
                  Amount: 337.5,
                  SubTotalLineDetail: {},
                },
              ],
              ApplyTaxAfterDiscount: false,
              DocNumber: "1003",
              PrivateNote: "A private note.",
              sparse: false,
              DepositToAccountRef: {
                name: "Checking",
                value: "35",
              },
              CustomerMemo: {
                value: "Thank you for your business and have a great day!",
              },
              Balance: 0,
              CustomerRef: {
                name: "Dylan Sollfrank",
                value: "6",
              },
              TxnTaxDetail: {
                TotalTax: 0,
              },
              SyncToken: "1",
              PaymentMethodRef: {
                name: "Check",
                value: "2",
              },
              EmailStatus: "NotSet",
              BillAddr: {
                Lat: "INVALID",
                Long: "INVALID",
                Id: "49",
                Line1: "Dylan Sollfrank",
              },
              MetaData: {
                CreateTime: "2015-08-27T14:59:48-07:00",
                LastUpdatedTime: "2016-04-15T09:01:10-07:00",
              },
              CustomField: [
                {
                  DefinitionId: "1",
                  Type: "StringType",
                  Name: "Crew #",
                },
              ],
              Id: "11",
            },
          ],
          startPosition: 1,
          maxResults: 1,
        },
      },
    ],
    time: "2016-04-15T09:01:18.141-07:00",
  },
};






export const getCompanyInfoPayload = {
  data: {
    CompanyName: "Example Corp",
    Id: "1234",
    SyncToken: "0",
    CompanyAddr: {
      City: "Mountain View",
      Country: "USA",
      CountrySubDviisionCode: "CA",
      Line1: "2500 Garcia Ave",
      PostalCode: "94043",
    },
  },
};






export const getCustomerByDisplayNamePayload = {
  data: {
    Id: "1",
    SyncToken: "0",
    MetaData: {},
    EmailMessagesPrefs: {},
    ProductAndServicesPrefs: {},
    ReportPrefs: {},
  },
};

export const getCustomerByIdPayload = getCustomerByDisplayNamePayload;






export const createPurchaseOrderPayload = {
  data: {
    PurchaseOrder: {
      DocNumber: "1005",
      SyncToken: "0",
      POEmail: {
        Address: "send_email@intuit.com",
      },
      APAccountRef: {
        name: "Accounts Payable (A/P)",
        value: "33",
      },
      CurrencyRef: {
        name: "United States Dollar",
        value: "USD",
      },
      TxnDate: "2015-07-28",
      TotalAmt: 25.0,
      ShipAddr: {
        Line4: "Half Moon Bay, CA  94213",
        Line3: "65 Ocean Dr.",
        Id: "121",
        Line1: "Grace Pariente",
        Line2: "Cool Cars",
      },
      domain: "QBO",
      Id: "257",
      POStatus: "Open",
      sparse: false,
      EmailStatus: "NotSet",
      VendorRef: {
        name: "Hicks Hardware",
        value: "41",
      },
      Line: [
        {
          DetailType: "ItemBasedExpenseLineDetail",
          Amount: 25.0,
          Id: "1",
          ItemBasedExpenseLineDetail: {
            ItemRef: {
              name: "Garden Supplies",
              value: "38",
            },
            CustomerRef: {
              name: "Cool Cars",
              value: "3",
            },
            Qty: 1,
            TaxCodeRef: {
              value: "NON",
            },
            BillableStatus: "NotBillable",
            UnitPrice: 25,
          },
        },
      ],
      CustomField: [
        {
          DefinitionId: "1",
          Type: "StringType",
          Name: "Crew #",
        },
        {
          DefinitionId: "2",
          Type: "StringType",
          Name: "Sales Rep",
        },
      ],
      VendorAddr: {
        Line4: "Middlefield, CA  94303",
        Line3: "42 Main St.",
        Id: "120",
        Line1: "Geoff Hicks",
        Line2: "Hicks Hardware",
      },
      MetaData: {
        CreateTime: "2015-07-28T16:01:47-07:00",
        LastUpdatedTime: "2015-07-28T16:01:47-07:00",
      },
    },
    time: "2015-07-28T16:04:49.874-07:00",
  },
};






export const updatePurchaseOrderPayload = {
  data: {
    PurchaseOrder: {
      DocNumber: "1005",
      SyncToken: "0",
      POEmail: {
        Address: "send_email@intuit.com",
      },
      APAccountRef: {
        name: "Accounts Payable (A/P)",
        value: "33",
      },
      CurrencyRef: {
        name: "United States Dollar",
        value: "USD",
      },
      TxnDate: "2015-07-28",
      TotalAmt: 25.0,
      ShipAddr: {
        Line4: "Half Moon Bay, CA  94213",
        Line3: "65 Ocean Dr.",
        Id: "121",
        Line1: "Grace Pariente",
        Line2: "Cool Cars",
      },
      domain: "QBO",
      Id: "257",
      POStatus: "Open",
      sparse: false,
      EmailStatus: "NotSet",
      VendorRef: {
        name: "Hicks Hardware",
        value: "41",
      },
      Line: [
        {
          DetailType: "ItemBasedExpenseLineDetail",
          Amount: 25.0,
          Id: "1",
          ItemBasedExpenseLineDetail: {
            ItemRef: {
              name: "Garden Supplies",
              value: "38",
            },
            CustomerRef: {
              name: "Cool Cars",
              value: "3",
            },
            Qty: 1,
            TaxCodeRef: {
              value: "NON",
            },
            BillableStatus: "NotBillable",
            UnitPrice: 25,
          },
        },
      ],
      CustomField: [
        {
          DefinitionId: "1",
          Type: "StringType",
          Name: "Crew #",
        },
        {
          DefinitionId: "2",
          Type: "StringType",
          Name: "Sales Rep",
        },
      ],
      VendorAddr: {
        Line4: "Middlefield, CA  94303",
        Line3: "42 Main St.",
        Id: "120",
        Line1: "Geoff Hicks",
        Line2: "Hicks Hardware",
      },
      MetaData: {
        CreateTime: "2015-07-28T16:01:47-07:00",
        LastUpdatedTime: "2015-07-28T16:01:47-07:00",
      },
    },
    time: "2015-07-28T16:04:49.874-07:00",
  },
};






export const deletePurchaseOrderPayload = {
  data: {
    PurchaseOrder: {
      status: "Deleted",
      domain: "QBO",
      Id: "125",
    },
    time: "2015-05-26T14:08:39.858-07:00",
  },
};





export const selectCustomerExamplePayload = {
  result: [
    {
      key: "1",
      label: "John Doe",
    },
  ],
};





export const selectAccountExamplePayload = {
  result: [
    {
      key: "1",
      label: "Checking",
    },
  ],
};





export const selectPurchaseOrderExamplePayload = {
  result: [
    {
      key: "1",
      label: "1005",
    },
  ],
};

export const selectInvoiceExamplePayload = selectPurchaseOrderExamplePayload;

export const selectRefundReceiptExamplePayload =
  selectPurchaseOrderExamplePayload;





export const selectTermExamplePayload = {
  result: [
    {
      key: "3",
      label: "Net 30",
    },
  ],
};

export { createInvoiceV2ExamplePayload } from "./invoices";
