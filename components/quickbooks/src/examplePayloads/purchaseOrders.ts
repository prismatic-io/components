




export const listPurchaseOrdersExamplePayload = {
  data: [
    {
      DocNumber: "1007",
      SyncToken: "0",
      domain: "QBO",
      VendorRef: {
        name: "Hicks Hardware",
        value: "41",
      },
      TxnDate: "2015-07-28",
      TotalAmt: 25.0,
      APAccountRef: {
        name: "Accounts Payable (A/P)",
        value: "33",
      },
      sparse: false,
      Line: [
        {
          DetailType: "ItemBasedExpenseLineDetail",
          Amount: 25.0,
          ProjectRef: {
            value: "39298034",
          },
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
      Id: "259",
      MetaData: {
        CreateTime: "2015-07-28T16:06:03-07:00",
        LastUpdatedTime: "2015-07-28T16:06:03-07:00",
      },
    },
  ],
};
